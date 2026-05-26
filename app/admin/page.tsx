"use server"

import { EventsSchema } from "@/data/schedule/EventSchema"
import { getAllEvents } from "@/app/lib/scripts/EventPostgres"

import AdminDashboard from "./AdminDashboard"
import { GalleriesSchema } from "@/data/gallery/GallerySchema"
import { getAllGalleries } from "@/app/lib/scripts/GalleryPostgres"

import DatabaseError_Filler from "@/app/lib/fillers/DatabaseError"
import { getActiveSessionCount } from "@/app/lib/scripts/MiscPostgres"


export default async function AdminPanel() {
    
    const db_result = await getAllEvents()
    const events = await EventsSchema.safeParseAsync(db_result)

    const gallery_result = await getAllGalleries()
    const gallery_obj = await GalleriesSchema.safeParseAsync(gallery_result)

    const sessionCount = await getActiveSessionCount()
 
    if (!gallery_obj.success || !events.success || !sessionCount) {
        return (
            <DatabaseError_Filler/>
        )
    }
    
    return (
        <AdminDashboard galleries={gallery_obj.data} events={events.data} sessionCount={sessionCount}/>
    )
}