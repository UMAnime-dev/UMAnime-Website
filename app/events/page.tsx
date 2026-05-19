"use server"

import Footer from "@/app/lib/components/footer"
import Navbar from "@/app/lib/components/navbar"

import EventsView from "./EventsView"
import GalleryPort from "./GalleryPort"

import { getAllEvents } from "@/app/lib/scripts/EventPostgres"
import { EventsSchema } from "@/data/schedule/EventSchema"

import EmptyEvents from "@/app/lib/fillers/EmptyEvents"
import DatabaseError from "@/app/lib/fillers/DatabaseError"

export default async function EventPage() {

    const db_result = await getAllEvents()

    const events = await EventsSchema.safeParseAsync(db_result)

    return (
        <>
            <main className="relative w-full min-h-screen overflow-x-hidden bg-background">
                <Navbar/>
                    {
                        events.success == false ? 
                            <DatabaseError/> 
                        :
                            events.data.length === 0 ? 
                                <EmptyEvents/>
                            : 
                                <EventsView events={events.data}/>
                    }
                    
                    <GalleryPort/>
                <Footer/>
            </main>
        </>
    )
}