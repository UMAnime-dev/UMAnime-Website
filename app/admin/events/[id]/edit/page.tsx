"use server"

import { getEventById } from "@/app/lib/scripts/EventPostgres"
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

