export const revalidate = 60;

import { getEventById } from "@/app/lib/scripts/EventPostgres"
import { redirect, RedirectType } from "next/navigation"
import EventPreview from "./EventPreview"

 
export default async function IDEvent({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await (params)
    
    const [result] = await Promise.all([
        getEventById(id),
    ])
    
    if (result == null) {
        redirect(`/admin/events/`, RedirectType.replace)
    }

    return (
        <EventPreview event={result}/>
    )
}