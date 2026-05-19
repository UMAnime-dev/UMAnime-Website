"use client"

import { Event } from "@/data/schedule/EventSchema";
import { ArrowLeft, CalendarClock, ChevronRight, ExternalLink, Settings, SquareChartGantt } from 'lucide-react'
import { redirect, RedirectType } from 'next/navigation'

import Image from "next/image";
import Link from "next/link";

export default function EventPreview({event} : {event : Event}) {

    const scheduler = '/admin/events'
    const current = `/admin/events/${event.id}`
    const edit = `/admin/events/${event.id}/edit`

    return (
        <main className="flex flex-col bg-sidebar flex-1 min-w-0 min-h-fit ml-4 md:ml-6 mr-4 my-8 rounded-2xl px-3 md:px-7 py-7 gap-10">
            <div 
                className={`flex flex-row items-center gap-1.5 font-outfit font-medium py-3 px-5 rounded-2xl bg-sidebar-hover min-w-0 max-w-full overflow-hidden`}
            >
                <div className="flex border-r-2 border-[#6e6e6e] pr-3">
                    <ArrowLeft className="cursor-pointer" onClick={() => redirect(scheduler, RedirectType.push)}/>
                </div>
                <button 
                    className="flex gap-2 text-foreground ml-1 p-1.25 rounded-xl cursor-pointer hover:bg-crumbs-hover max-w-10 md:max-w-none"
                    onClick={() => redirect(scheduler, RedirectType.push)}
                >
                    <CalendarClock className="md:block hidden"/>
                    <span className="truncate flex-1 min-w-0">
                        Event Scheduler
                    </span>
                </button>
                <ChevronRight className="shrink-0"/>
                <button 
                    className="flex gap-2 text-foreground p-1.25 rounded-xl cursor-pointer hover:bg-crumbs-hover"
                    onClick={() => redirect(current, RedirectType.push)}
                >
                    <SquareChartGantt />
                    <span className="truncate flex-1 min-w-0">
                        {event.name}
                    </span>
                </button>
                <button 
                    className="fixed bottom-4 left-4 md:ml-auto md:static md:flex p-1.25 rounded-full cursor-pointer outline-2 outline-solid outline-foreground bg-admin-edit hover:bg-crumbs-hover"
                    onClick={() => redirect(edit, RedirectType.push)}
                >
                    <Settings />
                </button>
            </div>

            <div className="flex flex-col xs:px-4 sm:px-7 pb-7 lg:px-20 xl:px-50 pt-7 gap-2">
                <section className="flex relative w-full h-100 max-h-100 overflow-hidden border-3 border-foreground">
                    <div 
                        className="absolute inset-0 bg-cover bg-center blur-xl z-0" 
                        style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_DIRECTORY}${event.photourl})` }}
                    />
                    <div className="relative w-full h-full z-10 flex items-center justify-center">
                        <Image 
                            src={`${process.env.NEXT_PUBLIC_IMAGE_DIRECTORY}${event.photourl}`} 
                            width={1920} 
                            height={1080} 
                            className={`w-full h-full object-contain`}
                            alt={event.id}
                        />
                    </div>
                </section>

                <span className="w-full mt-8 text-xs text-center font-light italic font-outfit tracking-wider">
                    {`Event ID: ${event.id}`}
                </span>
                <h1 className="w-full md:text-2xl lg:text-4xl text-center font-bold font-outfit tracking-wider">
                    {event.name}
                </h1>
                <h2 className="w-full text-center font-outfit tracking-wider text-sm">
                    Published on {event.created_at.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </h2>
                {
                    event.updated_at ?
                        <h2 className="w-full text-center font-outfit tracking-wider text-xs italic">
                            Updated on {event.updated_at.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </h2>
                    :
                        <></>
                }
                <p className="w-full flex gap-1 justify-center font-outfit tracking-wider mt-4 overflow-hidden">
                    <span className="shrink-0">Description:</span>
                    <span className="min-w-0 truncate font-light">
                        {event.description}
                    </span>
                </p>

                <div className="flex flex-col md:flex-row mt-5 gap-1.5 md:gap-7">
                    <ul className="flex flex-col gap-1.5 md:gap-0.3 items-start list-disc">
                        <li className="w-full font-outfit tracking-wider">
                            {"Location: "}
                            <span className="font-light">
                                {event.location}
                            </span>
                        </li>
                        <li className="w-full font-outfit tracking-wider">
                            {"Membership Required: "}
                            <span className="font-light">
                                {String(event.membership).toUpperCase()}
                            </span>
                        </li>
                        <li className="w-full font-outfit tracking-wider">
                            <div className="flex flex-row gap-2">
                                {"RSVP Link: "}
                                    <span className="font-light">
                                        {
                                            event.rsvp == null ? 
                                                "None" 
                                            : 
                                                <Link 
                                                    href={event.rsvp} 
                                                    className="flex flex-row hover:underline truncate overflow-hidden min-w-0"
                                                >
                                                    {event.rsvp}
                                                    <ExternalLink className="scale-70" />
                                                </Link>
                                        }
                                    </span>
                            </div>
                        </li>
                    </ul>

                    <ul className="md:ml-auto flex flex-col gap-1.5 md:gap-0.3 items-start list-disc">
                        <li className="w-full font-outfit tracking-wider">
                            {"Start Date & Time: "}
                            <span className="font-light">
                                {event.startdate.toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    second: '2-digit',
                                    timeZoneName: 'short'
                                })}
                            </span>
                        </li>
                        <li className="w-full font-outfit tracking-wider">
                            {"End Date & Time: "}
                            <span className="font-light">
                                {event.enddate.toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    second: '2-digit',
                                    timeZoneName: 'short'
                                })}
                            </span>
                        </li>
                    </ul>
                </div>
                
            </div>
        </main>
    )
}