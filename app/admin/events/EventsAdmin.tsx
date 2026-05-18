"use client"

import EventGridCard from "@/app/lib/components/admin/events/AdminGridCard"
import EventListCard from "@/app/lib/components/admin/events/AdminListCard"

import { Events } from "@/data/schedule/EventSchema"
import { groupEventsByMonth } from "@/data/schedule/ScheduleFunctions"
import { ChevronUp, LayoutGrid, LayoutList } from "lucide-react"
import { useState } from "react"

export default function EventsAdmin({ events }:{ events : Events }) {
    const groupedEvents = groupEventsByMonth(events)
    const [listType, setListType] = useState<"LIST" | "GRID">("LIST")
    const [collapsedMonths, setCollapsedMonths] = useState<Record<string, boolean>>({})

    const toggleMonth = (month: string) => {
        setCollapsedMonths(prev => ({
            ...prev,
            [month]: !prev[month]
        }))
    }
    

    return (
        <>
            <section className="flex flex-row">
                <h1 className="font-outfit text-[clamp(16px,2.5vw,28px)] font-semibold text-foreground w-fit px-2">
                    Events Scheduler
                </h1>
                <button className={`flex items-center justify-center ${listType === "GRID" ? "gap-1" : "gap-2"} ml-auto bg-eventView hover:bg-eventView-hover w-30 h-10 rounded-lg font-outfit cursor-pointer`}
                    onClick={() => {
                        if (listType === "LIST") {
                            setListType("GRID")
                        } else {
                            setListType("LIST")
                        }
                    }}
                >
                    {
                        listType === "LIST" ? <LayoutList /> : <LayoutGrid />
                    }

                    {listType === "LIST" ? "List View" : "Grid View"}
                </button>
            </section>
            <div className="w-full mt-10">
                {
                    Object.entries(groupedEvents).map(([month, events]) => {
                        const isCollapsed = collapsedMonths[month]

                        return (
                            <section key={month} className={`mb-25 sm:mb-15 ${isCollapsed ? "mb-5!" : ""}`}>
                                <h2 className="flex flex-row font-outfit font-semibold tracking-wide text-foreground text-[clamp(18px,1.3vw,25px)] w-full border-b-4 border-foreground pl-3 pb-2 mb-6">
                                    {month}
                                    <button 
                                        className="ml-auto cursor-pointer"
                                        onClick={() => toggleMonth(month)}
                                    >
                                        <ChevronUp
                                            className={`transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
                                        />
                                    </button>
                                </h2>
                                
                                <div
                                    className={
                                        `
                                        transition-[max-height,opacity] duration-600 ease-in-out ${isCollapsed ? "max-h-0 opacity-0" : "max-h-1250 opacity-100"}
                                        ${listType === "LIST" ? "flex flex-col gap-5 items-center" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(3,380px)] gap-5"}
                                        `
                                    }
                                >
                                    {events.map((eventObj) => {
                                        if (listType === "LIST") {
                                            return <EventListCard key={eventObj.id} eventData={eventObj}/>
                                        } else {
                                            return <EventGridCard key={eventObj.id} eventData={eventObj}/>
                                        }
                                    })}
                                </div>

                            </section>
                        )
                    })
                }
            </div>
        </>
    )
}