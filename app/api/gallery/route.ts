import { NextResponse } from "next/server";
import fs from 'fs';
import path from "path";
import sharp from "sharp";

const GALLERY_ROOT = process.env.IMAGE_GALLERY_DIRECTORY!
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const safePath = (base: string, ...segments: string[]) => {
    const resolved = path.join(base, ...segments);
    if (!resolved.startsWith(base)) {
        throw new Error("Directory traversal attempt was detected. No no no! :) -R.P.");
    }
    return resolved;
};

export async function GET(req: Request) {

    try {
        const galleries = fs.readdirSync(GALLERY_ROOT, { withFileTypes: true })
            .filter(cursor => cursor.isDirectory())
            .map(cursor => cursor.name)

        const { searchParams } = new URL(req.url)
        const targetGallery = searchParams.get('name') as string;

        const folderName = galleries.find(cursor => cursor === targetGallery);

        if (!folderName) {
            return NextResponse.json(
                { error: 'Entry not found!' },
                { status: 404 } 
            )
        }

        const files = fs.readdirSync(path.join(GALLERY_ROOT, folderName))

        return NextResponse.json(files)
        
    } catch (error) {
        console.log(`Error on Gallery API: ${error}`)
        return NextResponse.json(
            { error: 'Failed to read the external gallery folders' }, 
            { status: 500 }
        );
    }
    
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const files = formData.getAll('images') as File[] | null;
        const id = formData.get('id') as string | null;
        const purpose = formData.get('purpose') as string | null;

        const failedUploads = [] as string[]

        if (!files || files.length === 0) {
            return NextResponse.json(
                { error : "No image / wrong format uploaded" },
                { status: 400 }
            );
        }

        if (!purpose) {
            return NextResponse.json(
                { error : "No purpose found" },
                { status: 400 }
            );
        }

        if (purpose === 'gallery' && id) {
            await Promise.all(files.map( async (file) => {
                try {
                    if (file.size > MAX_FILE_SIZE) {
                        return failedUploads.push(file.name)
                    }

                    const allowedTypes = [
                        "image/png",
                        "image/jpeg",
                        "image/webp",
                    ];

                    if (!allowedTypes.includes(file.type)) {
                        return failedUploads.push(file.name)
                    }

                    const fileBytes = await file.arrayBuffer()
                    const buffer = Buffer.from(fileBytes)

                    const uploadDir = process.env.IMAGE_GALLERY_DIRECTORY!;
                    const eventFolder = path.join(uploadDir, id)

                    if (!fs.existsSync(eventFolder)) {
                        fs.mkdirSync(eventFolder)
                    }

                    const filePath = path.join(eventFolder, `${path.parse(file.name).name}.webp`)

                    await sharp(buffer)
                    .rotate()
                    .resize({
                        width: 1600,
                        withoutEnlargement: true,
                        fit: "inside"
                    }).webp({
                        quality: 75,
                        effort: 4
                    }).toFile(filePath)
                } catch (error) {
                    console.log(error)
                    return failedUploads.push(file.name)
                }
            }))
            return NextResponse.json({
                success: true,
                failedUploads: failedUploads
            })
        } else {
            return NextResponse.json(
                { error : "Invalid purpose" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Upload failed" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id') as string | null;
        const image = searchParams.get('img') as string | null;
        const purpose = searchParams.get('rsn') as string | null;

        const uploadDir = process.env.IMAGE_GALLERY_DIRECTORY!;

        // Whole Collection vs Image
        if (purpose == "collection" && id) {

            const folder = safePath(GALLERY_ROOT, path.basename(id));

            if (fs.existsSync(folder)) {
                try {
                    fs.rmSync(folder, { recursive: true })
                } catch (err) {
                    console.error(err);

                    return NextResponse.json(
                        { error: "Delete failed. No directory." },
                        { status: 500 }
                    );
                }

                return NextResponse.json({
                    success: true,
                })
            } else {
                return NextResponse.json(
                    { error: "Delete failed. No directory" },
                    { status: 404 }
                );
            }
        } else if (purpose == "gallery" && id && image) {

            const folderPath = path.join(uploadDir, id)

            if (!fs.existsSync(folderPath)) {
                return NextResponse.json(
                    { error: "Non existent event" },
                    { status: 404 }
                );
            }

            const filePath = path.join(folderPath, image)

            if (fs.existsSync(filePath)) {
                fs.rm(filePath, {recursive: false}, (err) => {
                    console.error(err);

                    return NextResponse.json(
                        { error: "Delete failed" },
                        { status: 500 }
                    );
                })
            } else {
                return NextResponse.json(
                    { error: "Delete failed. Image not found" },
                    { status: 404 }
                );
            }

            return NextResponse.json({
                success: true,
            })
        } else {
            return NextResponse.json(
                { error: "Invalid Parameters" },
                { status: 404 }
            );
        }

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Delete failed" },
            { status: 500 }
        );
    }
}