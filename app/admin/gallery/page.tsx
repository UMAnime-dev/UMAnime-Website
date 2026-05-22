export const revalidate = 60;

import { GalleriesSchema } from "@/data/gallery/GallerySchema"
import DatabaseError from "@/app/lib/fillers/DatabaseError"

import GalleryAdmin from "./GalleryAdmin"
import { getAllGalleries } from "@/app/lib/scripts/GalleryPostgres"

export default async function GalleryPanel() {

    const gallery_result = await getAllGalleries()
    const gallery_obj = await GalleriesSchema.safeParseAsync(gallery_result)
    

    return (
        <main className="flex flex-col bg-sidebar w-full min-h-fit ml-3 md:ml-5 mr-4 my-8 rounded-2xl py-8 px-5 sm:px-15">
            {
                gallery_obj.success == false ? 
                    <DatabaseError/> 
                :
                    gallery_obj.data.length === 0 ? 
                        <></>
                    : 
                        <GalleryAdmin galleries={gallery_obj.data}/>
            }
        </main>
    )
}