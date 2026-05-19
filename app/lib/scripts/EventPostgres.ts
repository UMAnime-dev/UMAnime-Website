import postgres from 'postgres'
import { Event, EventSchema } from "@/data/schedule/EventSchema"

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

export async function insertEvent(id: string, event: Event) {
    const sql_result = await sql`
        insert into public.events (
            id,
            name,
            description,
            photourl,
            photooffset,
            location,
            startdate,
            enddate,
            rsvp,
            membership,
            created_at,
            updated_at
        )
        values (
            ${id},
            ${event.name},
            ${event.description},
            ${event.photourl ?? null},
            ${event.photooffset},
            ${event.location},
            ${event.startdate},
            ${event.enddate},
            ${event.rsvp ?? null},
            ${event.membership ?? false},
            ${event.created_at},
            ${event.updated_at ?? null}
        )
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