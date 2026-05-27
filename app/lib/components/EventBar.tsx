import { Event } from "@/data/schedule/EventSchema"
import { Clock } from "lucide-react"
import Link from "next/link";


export default function EventBar({event} : {event : Event | null}) {

  if (event == null) return;

  return (
    <div className={`flex items-center justify-center gap-2 w-full text-foreground text-center bg-event-default px-4 py-2`}>
      <Clock className="scale-80"/>
      <Link href={`/events#${event.id}`} className="font-outfit text-base cursor-pointer hover:underline">{`Upcoming event happening in under 24 hours! '${event.name}'`}</Link>
    </div>
  )
}