"use server"

import { NextResponse } from "next/server";
import fs from 'fs';
import path from "path";

const GALLERY_ROOT = process.env.IMAGE_GALLERY_DIRECTORY!

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