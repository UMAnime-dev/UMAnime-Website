"use server"

import FullGallery from "./FullGallery";
import { GalleriesSchema } from "@/data/gallery/GallerySchema";
import { getAllGalleries } from "../lib/scripts/GalleryPostgres";
import { redirect } from "next/navigation";

export default async function GalleryPage() {

    const galleryResult = await getAllGalleries()

    const gallery_obj = await GalleriesSchema.safeParseAsync(galleryResult)

    if (!gallery_obj.success) redirect('/')

    return (
        <FullGallery galleries={gallery_obj.data}/>
    )
}