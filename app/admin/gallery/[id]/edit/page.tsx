"use server"

import EventModify from "./GalleryModify"

import { getGalleryByID } from "@/app/lib/scripts/GalleryAPI"
import { GalleriesSchema } from "@/data/gallery/GallerySchema"
import { getAllGalleries } from "@/app/lib/scripts/GalleryPostgres"

import { redirect, RedirectType } from "next/navigation"

export default async function EditEventPage({
    params,
}: {
  params: Promise<{ id: string }>
}) {

    const { id } = await (params)
    const galleries = await getAllGalleries()
    const galleries_obj = await GalleriesSchema.safeParseAsync(galleries)
    const files = await getGalleryByID(id)

    if (!galleries_obj.success || !files) {
        redirect(`/admin/gallery/`, RedirectType.replace)
    }

    const gallery = galleries_obj.data.find(cursor => cursor.id === id)

    if (!gallery) {
        redirect('/admin/gallery', RedirectType.replace)
    }
    
    return (
        <EventModify gallery={gallery} images={files}/>
    )
}

