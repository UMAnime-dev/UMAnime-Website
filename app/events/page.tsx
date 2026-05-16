"use client"

import Footer from "../lib/components/footer"
import Navbar from "../lib/components/navbar"

import { events } from "@/data/schedule/EventData"
import { groupEventsByMonth } from "@/data/schedule/ScheduleFunctions"
import EventListCard from "../lib/components/EventListCard"
import EventGridCard from "../lib/components/EventGridCard"

import { galleries } from "@/data/gallery/GalleryData"
import { groupEventsByRangeYear } from "@/data/gallery/GalleryFunctions"

import { useState } from "react"
import { ChevronUp, LayoutGrid, LayoutList } from "lucide-react"
import Image from "next/image"
import { redirect, RedirectType } from "next/navigation"

export default function EventPage() {

    const groupedEvents = groupEventsByMonth(events)
    const [listType, setListType] = useState<"LIST" | "GRID">("LIST")
    const [collapsedMonths, setCollapsedMonths] = useState<Record<string, boolean>>({})

    const toggleMonth = (month: string) => {
        setCollapsedMonths(prev => ({
            ...prev,
            [month]: !prev[month]
        }))
    }

    const groupedGalleries = groupEventsByRangeYear(galleries)

    return (
        <>
            <main className="relative w-full min-h-screen overflow-x-hidden bg-background">
                <Navbar/>
                    <div className="flex items-center text-center mb-15 mt-17 px-6 sm:px-10 md:px-15 lg:px-[clamp(60px,9.25vw,130px)] xl:px-35 2xl:px-50">
                        <h2 className="font-outfit text-[clamp(16px,2.5vw,28px)] font-semibold text-foreground border-l-4 border-header-border w-fit px-2">
                            Upcoming Events!
                        </h2>

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
                    </div>
                    <div className="w-full px-7 sm:px-10 md:px-15 lg:px-[clamp(60px,9.25vw,130px)] xl:px-35 2xl:px-50 mb-20">
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

                    <div className="flex flex-col text-center mb-15 mt-40 px-6 sm:px-10 md:px-15 lg:px-[clamp(60px,9.25vw,130px)] xl:px-35 2xl:px-50">
                        <h2 id="gallery" className="font-outfit text-[clamp(16px,2.5vw,28px)] font-semibold text-foreground border-l-4 border-header-border w-fit px-2">
                            UMAnime Club Gallery
                        </h2>

                        <div className="w-full px-3 md:px-10">
                            {
                                Object.entries(groupedGalleries).map(([range, galleries]) => {
                                    return (
                                        <section key={range} className={`mt-10`}>
                                            <h2 className="flex flex-row font-outfit font-semibold tracking-wide text-foreground text-3xl w-full">
                                                {range}
                                            </h2>
                                            <div className="flex flex-col items-center gap-10 pt-10 sm:grid sm:grid-cols-2 sm:gap-15 xl:grid-cols-3 xl:gap-20">
                                                {galleries.map((gallery) => {
                                                    return (
                                                        <div key={gallery.id} className="flex flex-col items-start gap-2">
                                                            <button key={gallery.id} className="relative rounded-3xl border-5 overflow-hidden cursor-pointer max-h-67.5 max-w-112.5 border-foreground hover:border-gallery-hover hover:scale-105 transition duration-200 ease-in-out"
                                                                onClick={() => {redirect(`/events/${gallery.folderPath}`, RedirectType.push)}}
                                                            >
                                                                <Image src={gallery.coverPath} width={400} height={300} style={{ width: '400', height: '300' }} className={`w-full h-full object-cover object-[${gallery.coverOffset}]`} alt={gallery.id}/>
                                                            </button>
                                                            <h1 className={`font-outfit font-bold text-2xl text-foreground`}>
                                                                {gallery.name}
                                                            </h1>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </section>
                                    )
                                })
                            }
                        </div>
                    </div>
                <Footer/>
            </main>
        </>
    )
}