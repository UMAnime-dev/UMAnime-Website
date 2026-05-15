import Footer from "../lib/components/footer"
import Navbar from "../lib/components/navbar"

import { events } from "@/data/schedule/EventData"
import { groupEventsByMonth } from "@/data/schedule/ScheduleFunctions"
import EventListCard from "../lib/components/EventListCard"

export default function EventPage() {

    const groupedEvents = groupEventsByMonth(events)

    return (
        <>
            <main className="relative w-full min-h-screen overflow-x-hidden bg-background">
                <Navbar/>
                    <div className="flex flex-col text-center mb-15 mt-17 px-6 sm:px-10 md:px-15 lg:px-[clamp(60px,9.25vw,130px)] xl:px-35 2xl:px-50">
                        <h2 className="font-outfit text-[clamp(16px,2.5vw,28px)] font-semibold text-foreground border-l-4 border-header-border w-fit px-2">
                            Upcoming Events!
                        </h2>
                    </div>
                    <div className="w-full px-7 sm:px-20 md:px-15 lg:px-[clamp(60px,9.25vw,130px)] xl:px-35 2xl:px-50 mb-20">
                        {
                            Object.entries(groupedEvents).map(([month, events]) => (
                                <section key={month} className="mb-9">
                                    <h2 className="font-outfit font-semibold tracking-wide text-foreground text-[clamp(18px,1.3vw,25px)] w-full border-b-4 border-foreground pl-3 pb-2 mb-6">
                                        {month}
                                    </h2>
                                    <div className="flex flex-col gap-5 items-center">
                                        {events.map((eventObj) => (
                                            <EventListCard key={eventObj.id} eventData={eventObj}/>
                                        ))}
                                    </div>

                                </section>
                            ))
                        }
                    </div>
                <Footer/>
            </main>
        </>
    )
}