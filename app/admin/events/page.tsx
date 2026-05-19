export const dynamic = 'force-dynamic'

import { EventsSchema } from "@/data/schedule/EventSchema"
import EventsAdmin from "./EventsAdmin"
import DatabaseError from "@/app/lib/fillers/DatabaseError"
import { getAllEvents } from "@/app/lib/scripts/EventPostgres"

export default async function EventsPanel() {
    const db_result = await getAllEvents()
    
    const events = await EventsSchema.safeParseAsync(db_result)

    return (
        <main className="flex flex-col bg-sidebar w-full min-h-fit ml-3 md:ml-5 mr-4 my-8 rounded-2xl py-8 px-5 sm:px-15">
            {
                events.success == false ? 
                    <DatabaseError/> 
                :
                    events.data.length === 0 ? 
                        <></>
                    : 
                        <EventsAdmin events={events.data}/>
            }
        </main>
    )
}