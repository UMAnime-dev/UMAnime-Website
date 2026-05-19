"use client"

import { Event } from "@/data/schedule/EventSchema";
import { Ban, BookUser, Clock, IdCard, MapPin, SquareArrowOutUpRight } from "lucide-react";
import { redirect, RedirectType } from "next/navigation";

export default function AdminEventListCard({eventData}: {eventData: Event}) {
    
    const configLoc = `/admin/events/${eventData.id}`

    return (
        <main
            className="cursor-pointer relative gap-2 w-full lg:max-w-none max-w-120 overflow-x-hidden bg-eventCard rounded-xl flex lg:flex-row flex-col items-center py-5 lg:py-2.5 shadow-black shadow-2xl transition hover:scale-[1.02] hover:shadow-2xl/100 hover:shadow-foreground/25"
            onClick={() => {redirect(configLoc, RedirectType.push)}}
        >
            <SquareArrowOutUpRight className="absolute top-2.5 right-2.5 scale-80 text-foreground"/>

            {/* Date Section */}
            <section
                className="min-w-50 xl:min-w-65 relative flex flex-col items-center justify-center gap-2"
            >
                <span className="font-outfit">
                    {eventData.startdate.toLocaleString("en-US", { weekday: "long" })}
                </span>

                <h1
                    className="font-outfit font-bold text-5xl"
                >
                    {eventData.startdate.getDate()}
                </h1>
            </section>

            <h1
                className="lg:hidden! py-2 mx-7 font-roboto font-semibold tracking-wide text-[clamp(14px,2.35vw,24px)]"
            >
                {eventData.name}
            </h1>

            {/* Event Details Section */}
            <section
                className="relative w-full lg:w-100 2xl:w-140 px-5 lg:px-0 lg:flex lg:flex-col items-start justify-center gap-3 lg:py-3 grid grid-cols-1"
            >
                <div
                    className="flex flex-row justify-center items-center gap-2"
                >
                    <Clock />

                    <span
                        className="font-outfit tracking-wider text-[clamp(12px,2.35vw,14px)] lg:text-base"
                    >
                        {
                            eventData.startdate.toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit"
                            }) + " - " +
                            eventData.enddate.toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit"
                            })
                        }
                    </span>
                </div>

                <h1
                    className="hidden lg:block! mx-7 font-roboto font-semibold tracking-wide text-[clamp(14px,2.35vw,24px)] lg:text-3xl"
                >
                    {eventData.name}
                </h1>

                <div
                    className="flex flex-row justify-center items-center gap-2"
                >
                    <MapPin />

                    <span
                        className="font-outfit tracking-wider text-[clamp(12px,1.5vw,14px)] lg:text-base"
                    >
                        {eventData.location}
                    </span>
                </div>
            </section>

            {/* RSVP */}
            <section
                className="w-full lg:w-90 flex flex-col items-center justify-end gap-3 lg:my-5 lg:ml-auto lg:mt-auto"
            >
                <div
                    className="w-full flex flex-row items-center justify-center gap-2"
                >
                    <IdCard />

                    <span
                        className="font-outfit tracking-wider"
                    >
                        Membership {eventData.membership ? "Required" : "Not Required"}
                    </span>
                </div>

                <button
                    className={`flex flex-row items-center justify-center w-25 h-8 gap-1 rounded-lg bg-navbar-join text-black font-outfit font-bold tracking-wide ${!eventData.rsvp ? "cursor-not-allowed opacity-80" : "cursor-pointer hover:bg-navbar-join-hover"}`}
                    onClick={() => {
                        if (eventData.rsvp) {
                            redirect(eventData.rsvp, RedirectType.push);
                        }
                    }}
                >
                    {eventData.rsvp ? <BookUser /> : <Ban />}
                    RSVP
                </button>
            </section>
        </main>
    )
}