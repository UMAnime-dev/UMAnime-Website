export const revalidate = 60;

import { redirect, RedirectType } from "next/navigation"
import GalleryPreview from "./GalleryPreview"
import { getGalleryByID } from "@/app/lib/scripts/GalleryAPI"
import { GalleriesSchema } from "@/data/gallery/GallerySchema"
import { getAllGalleries } from "@/app/lib/scripts/GalleryPostgres"

 
export default async function IDGallery({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await (params)

    const [galleries] = await Promise.all([
        getAllGalleries()
    ])

    const [galleries_obj] = await Promise.all([
        GalleriesSchema.safeParseAsync(galleries)
    ])

    const [files] = await Promise.all([
        getGalleryByID(id)
    ])

    if (!galleries_obj.success || !files) {
        redirect(`/admin/gallery/`, RedirectType.replace)
    }

    const gallery = galleries_obj.data.find(cursor => cursor.id === id)

    if (!gallery) {
        redirect('/admin/gallery', RedirectType.replace)
    }

    return (
        <GalleryPreview gallery={gallery} images={files}/>
    )
}