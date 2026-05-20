"use client"

import { Galleries } from "@/data/gallery/GallerySchema"
import { ImageDown } from "lucide-react"
import { redirect, RedirectType } from "next/navigation"

import GalleryGridCard from "@/app/lib/components/admin/gallery/GalleryGridCard"

export default function GalleryAdmin({ galleries } : { galleries : Galleries }) {
    return (
        <>
            <section className="flex flex-col gap-5 sm:flex-row items-center">
                <h1 className="font-outfit text-2xl font-semibold text-foreground w-fit sm:px-2 text-start">
                    Gallery Manager
                </h1>
                <div className="flex flex-col items-center gap-2 sm:gap-5 sm:flex-row sm:ml-auto">
                    <button
                        className={`flex gap-2 items-center justify-center bg-eventView hover:bg-eventView-hover w-40 h-10 rounded-lg font-outfit cursor-pointer`}
                        onClick={() => redirect('/admin/gallery/create', RedirectType.push)}
                    >
                        <ImageDown />
                        Create Gallery
                    </button>
                </div>
            </section>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10">
                {
                    galleries.map((gallery) => {
                        return <GalleryGridCard key={gallery.id} gallery={gallery}/>
                    })
                }
            </div>
        </>
    )
}