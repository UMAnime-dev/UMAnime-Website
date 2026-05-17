import Footer from "@/app/lib/components/footer"
import Navbar from "@/app/lib/components/navbar"

import { galleries } from "@/data/gallery/GalleryData"
import { getGalleryByPath } from "@/data/gallery/GalleryFunctions"
import { getImagesFromFolder } from "@/data/gallery/ServerFunctions"
import { redirect, RedirectType } from "next/navigation"

import GalleryView from "./GalleryView"
import ReturnGallery from "@/app/lib/components/ReturnGallery"

export default async function Gallery({
        params
    }: 
    {
        params: Promise<{ path: string[] }>
    }) {
    const { path } = await params
    const fullPath = '/' + path.join('/')

    const gallery = getGalleryByPath(galleries, fullPath)

    if (gallery === undefined) {
        redirect('/events', RedirectType.replace)
    }

    const images = await getImagesFromFolder(gallery.folderPath);

    return (
        <main className="relative w-full min-h-screen overflow-x-hidden bg-background">
            <Navbar/>
                <div className="flex flex-col text-center mb-15 mt-13 mx-5 md:mx-15 items-center">
                    <ReturnGallery/>
                    <h2 className="font-outfit text-[clamp(24px,2.5vw,36px)] font-semibold text-foreground w-fit px-2">
                        {gallery.name}
                    </h2>
                    <span className="font-outfit text-lg text-foreground w-fit px-2 tracking-wide">
                        Date: {gallery.eventDate.toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric"
                        }) + " @ " + gallery.eventDate.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit"
                        })}
                    </span>
                    <span className="font-outfit text-lg text-foreground w-fit px-2 tracking-wide">
                        {gallery.location ? "Location: " + gallery.location : ""}
                    </span>
                    <GalleryView images={images} fullPath={fullPath}/>
                </div>
            <Footer/>
        </main>
    )
}