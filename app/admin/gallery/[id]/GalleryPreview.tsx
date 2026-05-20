"use client"

import { Gallery } from "@/data/gallery/GallerySchema";
import { ArrowLeft, ChevronRight, CircleCheck, CircleX, FolderTree, GalleryVerticalEnd, Settings, ShieldAlert, Trash2 } from "lucide-react";

import Image from "next/image";
import { redirect, RedirectType } from "next/navigation";
import { useState } from "react";

export default function GalleryPreview({ gallery, images } : { gallery : Gallery, images: string[] }) {

    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [confirm, setConfirm] = useState<boolean>(false)

    const manager = '/admin/gallery'
    const current = `/admin/gallery/${gallery.id}`
    const edit = `/admin/gallery/${gallery.id}/edit`

    return (
        <main className="flex flex-col bg-sidebar flex-1 min-w-0 min-h-fit ml-4 md:ml-6 mr-4 my-8 rounded-2xl px-3 md:px-7 py-7 gap-10">

            {/* Confirmation Box */}
            <div className={`fixed top-0 left-0 ${confirm ? "flex" : "hidden"} items-center justify-center min-w-screen min-h-screen bg-black/50 z-999`}>
                <div 
                    className="flex flex-col items-center justify-center gap-2 relative w-70 sm:w-100 md:w-150 h-60 sm:h-70 md:h-80 rounded-4xl bg-sidebar"
                    onMouseLeave={() => setConfirm(false)}
                >
                    <ShieldAlert className="w-10 h-10 sm:w-20 sm:h-20"/>
                    <h1 className="font-outfit text-base sm:text-2xl font-semibold">
                        Are you sure?
                    </h1>
                    <p className="text-sm sm:text-lg">
                        Do you want to delete this gallery?
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-5 mt-1.5">
                        <button 
                            className="flex gap-1.5 text-foreground ml-1 py-1.25 px-2 rounded-xl cursor-pointer bg-crumbs-hover w-30 md:max-w-none hover:outline-2 hover:outline-solid outline-white"
                            onClick={() => {
                                // deleteEvent()
                            }}
                        >
                            <CircleCheck />
                            <span className="truncate flex-1 min-w-0">
                                Confirm
                            </span>
                        </button>
                        <button 
                            className="flex gap-1.5 text-foreground ml-1 py-1.25 px-2 rounded-xl cursor-pointer bg-crumbs-hover w-30 md:max-w-none hover:outline-2 hover:outline-solid outline-white"
                            // onClick={() => setConfirm(false)}
                        >
                            <CircleX />
                            <span className="truncate flex-1 min-w-0">
                                Cancel
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <div
                className="flex items-center gap-1.5 font-outfit font-medium py-3 px-5 rounded-2xl bg-sidebar-hover min-w-0 w-full overflow-hidden z-1"
            >
                <div className="flex border-r-2 border-[#6e6e6e] pr-3 shrink-0">
                    <ArrowLeft className="cursor-pointer"
                        onClick={() => redirect(manager, RedirectType.push)}
                    />
                </div>

                {/* Breadcrumbs section */}
                <div className="flex items-center gap-1.5 min-w-0 flex-1 overflow-hidden">
                    <button className="flex gap-2 text-foreground ml-1 p-1.25 rounded-xl cursor-pointer hover:bg-crumbs-hover shrink-0"
                        onClick={() => redirect(manager, RedirectType.push)}
                    >
                        <FolderTree className="md:block hidden" />
                        <span className="truncate">
                            Gallery Manager
                        </span>
                    </button>

                    <ChevronRight className="shrink-0" />

                    <button className="flex gap-2 text-foreground p-1.25 rounded-xl cursor-pointer hover:bg-crumbs-hover min-w-0 overflow-hidden"
                        onClick={() => redirect(current, RedirectType.push)}
                    >
                        <GalleryVerticalEnd className="shrink-0" />

                        <span className="truncate min-w-0">
                            {gallery.name}
                        </span>
                    </button>
                </div>

                {/* Actions */}
                <div className="fixed bottom-4 left-4 md:static md:ml-3 flex flex-col md:flex-row gap-4 md:gap-3 shrink-0">
                    <button
                        className="md:flex p-1.25 rounded-full cursor-pointer outline-2 outline-solid outline-foreground bg-admin-edit hover:bg-crumbs-hover"
                        onClick={() => redirect(edit, RedirectType.push)}
                    >
                        <Settings />
                    </button>

                    <button
                        className="md:flex p-1.25 rounded-full cursor-pointer outline-2 outline-solid outline-foreground bg-red-500 opacity-80 md:opacity-100 hover:bg-red-800"
                        onClick={() => setConfirm(true)}
                    >
                        <Trash2 />
                    </button>
                </div>
            </div>

            <section className="columns-1 sm:columns-2 lg:columns-3 xl:columns-3 2xl:columns-4 px-3 sm:px-0 pt-5 space-y-6">
                {images.map((image) => {
                    
                    const imagePath = `${process.env.NEXT_PUBLIC_GALLERY_DIRECTORY}/${gallery.id}/${image}`
                        
                    return (
                        <button key={image} className="relative rounded-3xl border-4 w-fit h-fit overflow-hidden cursor-pointer bg-navbar col-span-1 border-foreground hover:border-gallery-hover hover:scale-103 transition duration-200 ease-in-out max-h-170 md:max-h-none" onClick={() => setSelectedImage(imagePath)}>
                            <Image src={imagePath} width={1920} height={1080} style={{ width: '1920', height: '1080' }} className={`w-full h-full object-contain`} alt={imagePath} preload={true} loading="eager"/>
                        </button>
                    )
                })}
            </section>
        </main>
    )
}