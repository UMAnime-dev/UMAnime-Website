"use server"

import fs from "fs";
import path from "path"

export async function getImagesFromFolder(folderPath: string) {

    const fullPath = path.join(process.cwd(), '/public', folderPath);

    const images = fs.readdirSync(fullPath).filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif';
    });

    return images;
}
