"use client"

import { Event } from "@/data/schedule/EventSchema";
import { Ban, BookUser, Calendar, Clock, IdCard, MapPin, SquareArrowOutUpRight } from "lucide-react";
import { redirect, RedirectType } from "next/navigation";
import Image from "next/image";

export default function AdminEventGridCard({eventData}: {eventData: Event}) {

    const configLoc = `/admin/events/${eventData.id}`

    return (
        <main
            className="cursor-pointer relative gap-2 w-full overflow-x-hidden bg-eventCard rounded-xl flex flex-col items-center pb-7 shadow-black shadow-2xl transition hover:scale-[1.02] hover:shadow-2xl/100 hover:shadow-foreground/25"
            onClick={() => {redirect(configLoc, RedirectType.push)}}
        >

            <SquareArrowOutUpRight className="absolute bottom-2.5 right-2.5 scale-80 text-foreground"/>
            
            {/* Date Section */}
            <section className="w-full h-50">
                <Image src={`${process.env.NEXT_PUBLIC_IMAGE_DIRECTORY}${eventData.photourl}`} width={400} height={300} style={{ width: '400', height: '300' }} className={`w-full h-full object-cover object-[${eventData.photooffset}]`} alt={eventData.id}/>
            </section>
            <h1
                className="py-6 mx-7 font-roboto font-semibold tracking-wide text-xl md:text-2xl text-center"
            >
                {eventData.name}
            </h1>

            {/* Event Details Section */}
            <section
                className="w-full px-5 pb-5 flex flex-col items-start justify-center gap-3"
            >
                <div
                    className="flex flex-row justify-center items-center gap-2"
                >
                    <Calendar />

                    <span
                        className="font-outfit tracking-wider text-base"
                    >
                        {
                            eventData.startdate.toLocaleDateString("en-US", {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                                year: "numeric"
                            })
                        }
                    </span>
                </div>
                <div
                    className="flex flex-row justify-center items-center gap-2"
                >
                    <Clock />

                    <span
                        className="font-outfit tracking-wider text-base"
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

                <div
                    className="flex flex-row justify-center items-center gap-2"
                >
                    <MapPin />

                    <span
                        className="font-outfit tracking-wider text-base"
                    >
                        {eventData.location}
                    </span>
                </div>

                <div
                    className="w-full flex flex-row gap-2"
                >
                    <IdCard />

                    <span
                        className="font-outfit tracking-wider text-base"
                    >
                        Membership {eventData.membership ? "Required" : "Not Required"}
                    </span>
                </div>
            </section>

            {/* RSVP */}
            <section
                className="w-full flex flex-col items-center"
            >
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