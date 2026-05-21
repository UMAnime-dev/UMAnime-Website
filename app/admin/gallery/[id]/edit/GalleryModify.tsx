"use client"

import { ArrowLeft, ChevronRight, CircleCheck, CircleX, Eye, FileUp, FolderTree, GalleryVerticalEnd, OctagonAlert, RefreshCwOff, Settings, ShieldAlert, Trash2, X } from "lucide-react"
import { redirect, RedirectType } from "next/navigation"

import Image from "next/image";

import { useRef, useState } from "react";
import { Gallery } from "@/data/gallery/GallerySchema";

export default function GalleryModify({ gallery, images } : { gallery : Gallery, images: string[] }) {

    // Links
    const manager = '/admin/gallery'
    const specific = `/admin/gallery/${gallery.id}`
    const current = `/admin/gallery/${gallery.id}/edit`

    // UI
    const [coverHover, setCoverHover] = useState<string>('')
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    
    const [triggerMultiple, setMultiple] = useState<boolean>(false)

    const [confirmDelete, setDelete] = useState<string>('')
    const [errorPopup, setError] = useState<boolean>()

    // Fixes
    const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

    const deleteImage = async (image : string) => {

        if (confirmDelete === '') {
            return
        }

        const params = new URLSearchParams();
        params.append('id', gallery.id)
        params.append('img', image)
        params.append('rsn', "gallery")

        const response = await fetch(`/api/gallery?${params}`, {
            method: "DELETE",
        });

        if (response.ok) {
            window.location.reload()
        } else {
            setDelete('')
            setError(true)
        }

    }

    const uploadHandler = async (filesToUpload : File[]) => {
        
        const formData = new FormData();
        formData.append("id", gallery.id)
        formData.append("purpose", "gallery")

        filesToUpload.forEach((file) => {
            formData.append("images", file)
        })

        console.log(formData)

        const response = await fetch(`/api/gallery`, {
            method: "POST",
            body: formData
        });

        console.log(await response.json())

        return response.ok

    }

    return (
        <main className="flex flex-col bg-sidebar flex-1 min-w-0 min-h-fit ml-4 md:ml-6 mr-4 my-8 rounded-2xl px-3 md:px-7 py-7 gap-10">

            {/* Preview Component */}
            <div className={`fixed w-full h-full top-0 left-0 z-999 bg-black/90 ${selectedImage ? "" : "hidden"}`}>
                <button className="fixed right-8 top-15 md:top-8 cursor-pointer" onClick={() => (setSelectedImage(null))}>
                    <X className="scale-150 text-white"/>
                </button>
                {selectedImage && (
                    <section className="fixed flex flex-col h-full left-1/2 -translate-x-1/2 items-center justify-center gap-20">
                        <h1 className="font-outfit font-semibold text-white">
                            File name: {selectedImage}
                        </h1>
                        
                        <Image
                            src={`${process.env.NEXT_PUBLIC_GALLERY_DIRECTORY}/${gallery.id}/${selectedImage}`}
                            width={1920}
                            height={1080}
                            quality={75}
                            loading="lazy"
                            className="w-auto h-auto md:max-w-[80%] md:max-h-[80%] object-contain z-999"
                            alt="Selected image"
                        />
                    </section>
                )}
            </div>
            
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


            {/* Confirmation Delete Box */}
            <div className={`fixed top-0 left-0 ${confirmDelete ? "flex" : "hidden"} items-center justify-center min-w-screen min-h-screen bg-black/50 z-999`}>
                <div 
                    className="flex flex-col items-center justify-center gap-2 relative w-70 sm:w-100 md:w-150 h-60 sm:h-70 md:h-80 rounded-4xl bg-sidebar"
                >
                    <ShieldAlert className="w-10 h-10 sm:w-20 sm:h-20"/>
                    <h1 className="font-outfit text-base sm:text-2xl font-semibold">
                        Are you sure?
                    </h1>
                    <p className="text-sm sm:text-lg">
                        Do you want to delete this image?
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-5 mt-1.5">
                        <button 
                            className="flex gap-1.5 text-foreground ml-1 py-1.25 px-2 rounded-xl cursor-pointer bg-crumbs-hover w-30 md:max-w-none hover:outline-2 hover:outline-solid outline-white"
                            onClick={() => {
                                deleteImage(confirmDelete)
                            }}
                        >
                            <CircleCheck />
                            <span className="truncate flex-1 min-w-0">
                                Confirm
                            </span>
                        </button>
                        <button 
                            className="flex gap-1.5 text-foreground ml-1 py-1.25 px-2 rounded-xl cursor-pointer bg-crumbs-hover w-30 md:max-w-none hover:outline-2 hover:outline-solid outline-white"
                            onClick={() => setDelete('')}
                        >
                            <CircleX />
                            <span className="truncate flex-1 min-w-0">
                                Cancel
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Error Box */}
            <div className={`fixed top-0 left-0 ${errorPopup ? "flex" : "hidden"} items-center justify-center min-w-screen min-h-screen bg-black/50 z-999`}>
                <div 
                    className="flex flex-col items-center justify-center gap-2 relative w-70 sm:w-100 md:w-150 h-60 sm:h-70 md:h-80 rounded-4xl bg-sidebar"
                >
                    <OctagonAlert className="w-10 h-10 sm:w-20 sm:h-20"/>
                    <h1 className="font-outfit text-base sm:text-2xl font-semibold">
                        ERROR!
                    </h1>
                    <p className="text-sm sm:text-lg">
                        Failed to upload. Try again later.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-5 mt-1.5">
                        <button 
                            className="flex gap-1.5 text-foreground ml-1 py-1.25 px-2 rounded-xl cursor-pointer bg-crumbs-hover w-30 md:max-w-none hover:outline-2 hover:outline-solid outline-white"
                            onClick={() => {
                                setError(false)
                            }}
                        >
                            <CircleCheck />
                            <span className="truncate flex-1 min-w-0">
                                Continue
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Multiple >5 Sent Box */}
            <div className={`fixed top-0 left-0 ${triggerMultiple ? "flex" : "hidden"} items-center justify-center min-w-screen min-h-screen bg-black/50 z-999`}>
                <div 
                    className="flex flex-col items-center justify-center gap-2 relative w-70 sm:w-100 md:w-150 h-60 sm:h-70 md:h-80 rounded-4xl bg-sidebar"
                >
                    <ShieldAlert className="w-10 h-10 sm:w-20 sm:h-20"/>
                    <h1 className="font-outfit text-base sm:text-2xl font-semibold">
                        Uh oh!
                    </h1>
                    <p className="text-sm sm:text-lg text-center">
                        You can only send 5 files maximum per upload.
                    </p>
                    <button 
                        className="flex text-foreground ml-1 py-1.25 px-3 rounded-xl cursor-pointer bg-crumbs-hover w-40 md:max-w-none hover:outline-2 hover:outline-solid outline-white"
                        onClick={() => {
                            setMultiple(false)
                        }}
                    >
                        <RefreshCwOff />
                        <span className="truncate flex-1 min-w-0">
                            Cancel Upload
                        </span>
                    </button>
                </div>
            </div>
            

            <div className="flex flex-col xs:px-4 sm:px-7 pb-7 lg:px-5 xl:px-10 pt-7 gap-10">
                <section className="columns-1 sm:columns-2 lg:columns-3 xl:columns-3 2xl:columns-4 px-3 sm:px-0 pt-5 space-y-6">
                    <div
                        key={'sample'}
                        onClick={() => {
                            fileInputRef.current?.click()
                        }}
                        className="relative rounded-3xl border-4 h-fit overflow-hidden cursor-pointer bg-navbar col-span-1 border-foreground hover:border-gallery-hover hover:scale-103 transition duration-200 ease-in-out max-h-170 md:max-h-none"
                    >
                        {/* Upload Images Button */}
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
                                    multiple
                                    onChange={async (e) => {
                                        if (e.currentTarget.files == null) return;
                                        await uploadHandler(Array.from(e.currentTarget.files))
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
                        
                        if (brokenImages[image]) return;
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
                                        onError={() => {
                                            setBrokenImages((prev) => ({
                                                ...prev,
                                                [image]: true
                                            }));
                                        }}
                                    />
        
                                    <div className={`absolute flex items-center justify-center gap-5 w-full h-full bg-black/50 ${coverHover === image ? "" : "hidden"}`}>
                                        <button
                                            type="button"
                                            className={`flex items-center justify-center bg-background hover:bg-navbar w-17 h-17 rounded-full cursor-pointer`}
                                            onClick={() => {
                                                setSelectedImage(image)
                                            }}
                                        >
                                            <Eye className="scale-110 text-foreground"/>
                                        </button>
                                        <button
                                            type="button"
                                            className={`flex items-center justify-center bg-background hover:bg-navbar w-17 h-17 rounded-full cursor-pointer`}
                                            onClick={() => {
                                                setDelete(image)
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
            </div>
        </main>
    )
}