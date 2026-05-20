"use client"

import Image from "next/image"
import { redirect, RedirectType } from "next/navigation"

import { groupEventsByRangeYear } from "@/data/gallery/GalleryFunctions"
import { Galleries } from "@/data/gallery/GallerySchema"

export default function GalleryPort({ galleries } : { galleries : Galleries }) {

    const groupedGalleries = groupEventsByRangeYear(galleries)

    return (
        <div className="flex flex-col text-center mb-15 mt-25 px-6 sm:px-10 md:px-15 lg:px-[clamp(60px,9.25vw,130px)] xl:px-35 2xl:px-50">
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
                                                    onClick={() => {redirect(`/events/${gallery.id}`, RedirectType.push)}}
                                                >
                                                    <Image src={`${process.env.NEXT_PUBLIC_GALLERY_DIRECTORY}/${gallery.id}/${gallery.cover_image}`} width={400} height={300} style={{ width: '400', height: '300' }} className={`w-full h-full object-cover object-[${gallery.cover_offset}]`} alt={gallery.id}/>
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
    )
}