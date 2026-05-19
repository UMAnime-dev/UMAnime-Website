import postgres from 'postgres'
import { Event, EventSchema } from "@/data/schedule/EventSchema"
import { unstable_noStore as noStore } from 'next/cache'

const sql = postgres(process.env.POSTGRE_DATABASE_URL!)

export async function getAllEvents() {
    const events = await sql`
        select *
        from public.events
    `
    return events
}

export async function getEventById(id : string) : Promise<null | Event> {
    const sql_result = await sql`
        select *
        from public.events
        where id = ${id}
    `

    if (sql_result.length) {
        const result = await EventSchema.safeParseAsync(sql_result[0])
        
        if (result.success) {
            return result.data
        }
    } 
    return null
}

export async function updateEvent(id : string, event : Event) {
    noStore()
    const sql_result = await sql`
        update public.events
        set 
            name = ${event.name},
            description = ${event.description},
            photourl = ${event.photourl ?? null},
            photooffset = ${event.photooffset},
            location = ${event.location},
            startdate = ${event.startdate},
            enddate = ${event.enddate},
            rsvp = ${event.rsvp ?? null},
            membership = ${event.membership ?? false},
            created_at = ${event.created_at},
            updated_at = ${event.updated_at ?? null}
        where id = ${id}
        returning *
    `
    if (sql_result.length) {
        const result = await EventSchema.safeParseAsync(sql_result[0])
        
        if (result.success) {
            return result.data
        }
    } 
    return null
}