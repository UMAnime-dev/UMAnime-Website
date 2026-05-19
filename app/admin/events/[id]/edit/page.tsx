"use server"

import { getEventById, updateEvent } from "@/app/lib/scripts/EventPostgres"
import { Event } from "@/data/schedule/EventSchema"
import EventModify from "./EventModify"
import { redirect, RedirectType } from "next/navigation"

export default async function EditEventPage({
    params,
}: {
  params: Promise<{ id: string }>
}) {

    const { id } = await(params)
    const result = await getEventById(id)

    if (result == undefined) {
        redirect('/admin/events', RedirectType.replace)
    }
    
    return (
        <EventModify event={result}/>
    )
}

export async function sendUpdate(id : string, event : Event) {
    return await updateEvent(id, event)
}