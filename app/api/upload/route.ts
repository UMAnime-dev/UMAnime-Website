import { NextResponse } from "next/server";
import path from "path";
import sharp from "sharp";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const fileName = formData.get('name') as string;
        const file = formData.get('image') as File | null;
        const purpose = formData.get('purpose') as string | null;

        if (!file) {
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

        
        if (purpose === 'event') {
            if (file.size > MAX_FILE_SIZE) {
                return NextResponse.json(
                    { error : "Image is too large! Size: " + file.size },
                    { status: 400 }
                ); 
            }

            const allowedTypes = [
                "image/png",
                "image/jpeg",
                "image/webp",
            ];

            if (!allowedTypes.includes(file.type)) {
                return NextResponse.json(
                    { error: "Invalid file type! Must be .png / .jpeg / .webp" },
                    { status: 400 }
                );
            }

            const fileBytes = await file.arrayBuffer()
            const buffer = Buffer.from(fileBytes)

            const uploadDir = process.env.IMAGE_UPLOAD_DIRECTORY!;
            const uploadPath = path.join(uploadDir, fileName)

            await sharp(buffer)
            .rotate()
            .resize({
                width: 1600,
                withoutEnlargement: true,
                fit: "inside"
            }).webp({
                quality: 75,
                effort: 4
            }).toFile(uploadPath)
            
            return NextResponse.json({
                success: true,
                photoUrl: `/${fileName}.webp`
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