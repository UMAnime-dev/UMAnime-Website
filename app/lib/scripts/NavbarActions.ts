"use server"

import { EventsSchema } from "@/data/schedule/EventSchema"
import { getAllEvents } from "@/app/lib/scripts/EventPostgres"


export async function getUpcomingEvent() {
    const db_result = await getAllEvents()
    const events = await EventsSchema.safeParseAsync(db_result)

    if (!events.success) return null

    const now = new Date();
  
    const maxDeliveryDate = new Date();
    maxDeliveryDate.setDate(now.getDate() + 1);
    maxDeliveryDate.setHours(23, 59, 59, 999);

    const upcomings = events.data
        .filter(event => {
            const eventStart = new Date(event.startdate);
            return eventStart >= now && eventStart <= maxDeliveryDate;
        })
        .sort((a, b) => new Date(a.startdate).getTime() - new Date(b.startdate).getTime());

    if (upcomings.length == 0) return null

    return upcomings[0]
}