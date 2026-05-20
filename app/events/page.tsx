export const dynamic = 'force-dynamic'

import Footer from "@/app/lib/components/footer"
import Navbar from "@/app/lib/components/navbar"

import EventsView from "./EventsView"

import { getAllEvents } from "@/app/lib/scripts/EventPostgres"
import { EventsSchema } from "@/data/schedule/EventSchema"


import EmptyEvents from "@/app/lib/fillers/EmptyEvents"
import DatabaseError from "@/app/lib/fillers/DatabaseError"

import { getAllGalleries } from "@/app/lib/scripts/GalleryPostgres"
import { GalleriesSchema } from "@/data/gallery/GallerySchema"
import GalleryPort from "./GalleryPort"

export default async function EventPage() {

    const event_result = await getAllEvents()

    const gallery_result = await getAllGalleries()

    const events_obj = await EventsSchema.safeParseAsync(event_result)

    const gallery_obj = await GalleriesSchema.safeParseAsync(gallery_result)

    return (
        <>
            <main className="relative w-full min-h-screen overflow-x-hidden bg-background">
                <Navbar/>
                    {
                        events_obj.success == false ? 
                            <DatabaseError/> 
                        :
                            events_obj.data.length === 0 ? 
                                <EmptyEvents/>
                            : 
                                <EventsView events={events_obj.data}/>
                    }
                    {
                        gallery_obj.success == false ? 
                            <DatabaseError/> 
                        :
                            gallery_obj.data.length === 0 ? 
                                <EmptyEvents/>
                            : 
                                <GalleryPort galleries={gallery_obj.data}/>
                    }
                <Footer/>
            </main>
        </>
    )
}