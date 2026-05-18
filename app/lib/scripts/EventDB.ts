import { EventsSchema, Event } from "@/data/schedule/EventSchema"
import { prisma } from "@/lib/prisma"

export async function getEvents() {
    return await prisma.events.findMany({
        orderBy: {
            startdate: "desc"
        }
    })
}

export async function getEventById(id : string) : Promise<null | Event> {
    const db_result = await getEvents()
    const events = await EventsSchema.safeParseAsync(db_result)

    if (!events.success) {
        return null
    }

    const selected = events.data.find((object) => 
        object.id === id
    )

    if (selected == undefined) {
        return null
    }

    return selected
}