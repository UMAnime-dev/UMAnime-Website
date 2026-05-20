"use client"

import { ArrowLeft, ChevronRight, CircleCheck, CircleX, FileUp, FolderTree, GalleryVerticalEnd, Settings, ShieldAlert, Trash2 } from "lucide-react"
import { redirect, RedirectType } from "next/navigation"

import Image from "next/image";

import Form from 'next/form'
import { useEffect, useRef, useState } from "react";
import { Gallery } from "@/data/gallery/GallerySchema";

export default function GalleryModify({ gallery, images } : { gallery : Gallery, images: string[] }) {

    // Links
    const manager = '/admin/gallery'
    const specific = `/admin/gallery/${gallery.id}`
    const current = `/admin/gallery/${gallery.id}/edit`

    // UI
    const [coverHover, setCoverHover] = useState<string>('')
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [confirm, setConfirm] = useState<boolean>(false)

    const triggerConfirmation = () => {
        setConfirm(true)
    }

    const validate = async () => {
        
    }

    // const uploadHandler = async () => {

    //     if (uploadImage == null) {
    //         return
    //     }
        
    //     const formData = new FormData();
    //     const fileName = String(Date.now()) + ".webp"
    //     formData.append("name", fileName)
    //     formData.append("image", uploadImage);
    //     formData.append("purpose", "event")

    //     const response = await fetch("/api/upload", {
    //         method: "POST",
    //         body: formData,
    //     });

    //     await response.json();

    //     return fileName
    // }

    useEffect(() => {
        const handleBeforeUnload = (e : BeforeUnloadEvent) => {
        e.preventDefault() 
        e.returnValue = true 
        }

        window.addEventListener('beforeunload', handleBeforeUnload)
        return () => window.removeEventListener('beforeunload', handleBeforeUnload)
    }, [])

    return (
        <main className="flex flex-col bg-sidebar flex-1 min-w-0 min-h-fit ml-4 md:ml-6 mr-4 my-8 rounded-2xl px-3 md:px-7 py-7 gap-10">

            {/* Breadcrumbs section */}
            <div
                className={`flex flex-row items-center gap-1 lg:gap-1.5 font-outfit font-medium py-3 px-5 rounded-2xl bg-sidebar-hover min-w-0 max-w-full overflow-hidden`}
            >
                <div className="flex border-r-2 border-[#6e6e6e] pr-3">
                    <ArrowLeft
                        className="cursor-pointer" 
                        onClick={() => redirect(manager, RedirectType.push)}
                    />
                </div>
                <button 
                    className="flex gap-2 text-foreground ml-1 p-1.25 rounded-xl cursor-pointer hover:bg-crumbs-hover max-w-10 md:max-w-none"
                    onClick={() => redirect(manager, RedirectType.push)}
                >
                    <FolderTree className="md:block hidden" />
                    <span className="truncate flex-1 min-w-0">
                        Gallery Manager
                    </span>
                </button>

                <ChevronRight className="shrink-0" />

                <button 
                    className="flex gap-2 text-foreground ml-1 p-1.25 rounded-xl cursor-pointer hover:bg-crumbs-hover max-w-10 md:max-w-none"
                    onClick={() => redirect(specific, RedirectType.push)}
                >
                    <GalleryVerticalEnd className="shrink-0" />

                    <span className="truncate min-w-0">
                        {gallery.name}
                    </span>
                </button>
                <ChevronRight className="shrink-0" />
                <button 
                    className="flex gap-2 text-foreground p-1.25 rounded-xl cursor-pointer hover:bg-crumbs-hover"
                    onClick={() => redirect(current, RedirectType.push)}
                >
                    <Settings />
                    <span className="truncate flex-1 min-w-0">
                        Edit Gallery
                    </span>
                </button>
            </div>

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
                        Do you want to update this event?
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-5 mt-1.5">
                        <button 
                            className="flex gap-1.5 text-foreground ml-1 py-1.25 px-2 rounded-xl cursor-pointer bg-crumbs-hover w-30 md:max-w-none hover:outline-2 hover:outline-solid outline-white"
                            onClick={() => {
                                validate()
                            }}
                        >
                            <CircleCheck />
                            <span className="truncate flex-1 min-w-0">
                                Confirm
                            </span>
                        </button>
                        <button 
                            className="flex gap-1.5 text-foreground ml-1 py-1.25 px-2 rounded-xl cursor-pointer bg-crumbs-hover w-30 md:max-w-none hover:outline-2 hover:outline-solid outline-white"
                            onClick={() => setConfirm(false)}
                        >
                            <CircleX />
                            <span className="truncate flex-1 min-w-0">
                                Cancel
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            
            <Form action={triggerConfirmation} className="flex flex-col xs:px-4 sm:px-7 pb-7 lg:px-5 xl:px-10 pt-7 gap-10">
                <section className="columns-1 sm:columns-2 lg:columns-3 xl:columns-3 2xl:columns-4 px-3 sm:px-0 pt-5 space-y-6">
                    <div
                        key={'sample'}
                        onClick={() => {
                            fileInputRef.current?.click()
                        }}
                        className="relative rounded-3xl border-4 h-fit overflow-hidden cursor-pointer bg-navbar col-span-1 border-foreground hover:border-gallery-hover hover:scale-103 transition duration-200 ease-in-out max-h-170 md:max-h-none"
                    >
                        <div className="relative w-full h-full z-10 flex items-center justify-center">
                            <Image
                                src={'/samples/gallery.jpg'}
                                width={1920} height={1080}
                                style={{ width: '1920', height: '1080' }}
                                className={`w-full h-full object-contain blur-sm`}
                                alt={'sample'}
                                preload={true} loading="eager"
                            />

                            <div className={`absolute flex items-center justify-center w-full h-full bg-white/10`}>
                                <input 
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    className="hidden"
                                    max={1}
                                    onChange={async (e) => {
                                        const file = e.currentTarget.files?.[0];
                                        if (!file) return;

                                        // setCoverImage(URL.createObjectURL(file))
                                        // setUploadImage(file)
                                    }}
                                />
                                <div
                                    className={`flex items-center justify-center bg-background hover:bg-navbar w-17 h-17 rounded-full`}
                                >
                                    <FileUp className="scale-110 text-foreground"/>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    {images.map((image) => {
                        
                        const imagePath = `${process.env.NEXT_PUBLIC_GALLERY_DIRECTORY}/${gallery.id}/${image}`
                            
                        return (
                            <div
                                key={image}
                                onMouseEnter={() => {
                                    setCoverHover(image)
                                }}
                                onMouseLeave={() => {
                                    setCoverHover('')
                                }}
                                className="relative rounded-3xl border-4 w-fit h-fit overflow-hidden cursor-pointer bg-navbar col-span-1 border-foreground hover:border-gallery-hover hover:scale-103 transition duration-200 ease-in-out max-h-170 md:max-h-none"
                            >
                                <div className="relative w-full h-full z-10 flex items-center justify-center">
                                    <Image
                                        src={imagePath}
                                        width={1920} height={1080}
                                        style={{ width: '1920', height: '1080' }}
                                        className={`w-full h-full object-contain`}
                                        alt={imagePath}
                                        preload={true} loading="eager"
                                    />
        
                                    <div className={`absolute flex items-center justify-center w-full h-full bg-black/50 ${coverHover === image ? "" : "hidden"}`}>
                                        <input 
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            className="hidden"
                                            max={1}
                                            onChange={async (e) => {
                                                const file = e.currentTarget.files?.[0];
                                                if (!file) return;
        
                                                // setCoverImage(URL.createObjectURL(file))
                                                // setUploadImage(file)
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className={`flex items-center justify-center bg-background hover:bg-navbar w-17 h-17 rounded-full cursor-pointer`}
                                            onClick={() => {
                                                fileInputRef.current?.click()
                                            }}
                                        >
                                            <Trash2 className="scale-110 text-foreground"/>
                                        </button>
                                    </div>
                                </div>
                                
                            </div>
                        )
                    })}
                </section>
            </Form>
        </main>
    )
}