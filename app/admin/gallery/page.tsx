export const dynamic = 'force-dynamic'

import { GalleriesSchema } from "@/data/gallery/GallerySchema"
import DatabaseError from "@/app/lib/fillers/DatabaseError"
import { getAllEvents } from "@/app/lib/scripts/EventPostgres"

export default async function GalleryPanel() {
    const db_result = await getAllEvents()
    
    const gallery = await GalleriesSchema.safeParseAsync(db_result)

    return (
        <main className="flex flex-col bg-sidebar w-full min-h-fit ml-3 md:ml-5 mr-4 my-8 rounded-2xl py-8 px-5 sm:px-15">
            {
                gallery.success == false ? 
                    <DatabaseError/> 
                :
                    gallery.data.length === 0 ? 
                        <></>
                    : 
                        <></>
            }
        </main>
    )
}