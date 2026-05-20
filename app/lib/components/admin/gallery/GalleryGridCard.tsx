"use client"

import { Gallery } from "@/data/gallery/GallerySchema";
import { SquareArrowOutUpRight } from "lucide-react";
import { redirect, RedirectType } from "next/navigation";
import Image from "next/image";

export default function GalleryGridCard({gallery}: {gallery: Gallery}) {

    const configLoc = `/admin/gallery/${gallery.id}`

    return (
        <main
            className="cursor-pointer relative gap-2 w-full max-h-90 overflow-x-hidden bg-eventCard rounded-xl flex flex-col items-center pb-7 shadow-black shadow-2xl transition hover:scale-[1.02] hover:shadow-2xl/100 hover:shadow-foreground/25"
            onClick={() => {redirect(configLoc, RedirectType.push)}}
        >
            <SquareArrowOutUpRight className="absolute bottom-2.5 right-2.5 scale-80 text-foreground"/>

            <section className="w-full h-40">
                <Image src={`${process.env.NEXT_PUBLIC_GALLERY_DIRECTORY}/${gallery.id}/${gallery.cover_image}`} width={400} height={300} style={{ width: '400', height: '300' }} className={`w-full h-full object-cover object-[${gallery.cover_offset}]`} loading={'eager'} alt={gallery.id}/>
            </section>
            <h1
                className="py-3 mx-7 font-roboto font-semibold tracking-wide text-lg md:text-xl text-center"
            >
                {gallery.name}
            </h1>
            <p
                className="mb-5 mx-7 font-outfit font-light tracking-wide text-xs text-center"
            >
                {`Event ID: ${gallery.id}`}
            </p>

        </main>
    )
}