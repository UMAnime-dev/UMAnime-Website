import Footer from "@/app/lib/components/footer"
import Navbar from "@/app/lib/components/navbar"

import { redirect, RedirectType } from "next/navigation"

import { getGalleryByID } from "@/app/lib/scripts/GalleryAPI"
import ReturnGallery from "@/app/lib/components/ReturnGallery"

import GalleryView from "./GalleryView"
import { getAllGalleries } from "@/app/lib/scripts/GalleryPostgres"
import { GalleriesSchema } from "@/data/gallery/GallerySchema"

export default async function Gallery({
        params
    }: 
    {
        params: Promise<{ id: string }>
    }) {
    const { id } = await params
    
    const gallery_result = await getAllGalleries()
    const gallery_obj = await GalleriesSchema.safeParseAsync(gallery_result)
    
    if (!gallery_obj.success) {
        redirect('/events', RedirectType.replace)
    }
    const event = gallery_obj.data.find(cursor => cursor.id === id)
    const images = await getGalleryByID(id)


    if (images === undefined || !event) {
        redirect('/events', RedirectType.replace)
    }

    return (
        <main className="relative w-full min-h-screen overflow-x-hidden bg-background">
            <Navbar/>
                <div className="flex flex-col text-center mb-15 mt-13 mx-5 md:mx-15 items-center">
                    <ReturnGallery/>
                    <h2 className="font-outfit text-[clamp(24px,2.5vw,36px)] font-semibold text-foreground w-fit px-2">
                        {event.name}
                    </h2>
                    <span className="font-outfit text-lg text-foreground w-fit px-2 tracking-wide">
                        Date: {event.date.toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric"
                        }) + " @ " + event.date.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit"
                        })}
                    </span>
                    <span className="font-outfit text-lg text-foreground w-fit px-2 tracking-wide">
                        {event.location ? "Location: " + event.location : ""}
                    </span>
                    <GalleryView images={images} eventId={event.id}/>
                </div>
            <Footer/>
        </main>
    )
}