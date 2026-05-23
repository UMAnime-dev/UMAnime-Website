"use client"

import { z } from 'zod';

import { ArrowLeft, CalendarClock, ChevronRight, CircleCheck, CircleX, Eye, FilePlus, FileUp, GitPullRequestCreateArrow, Pencil, Save, ShieldAlert, Trash2, X } from "lucide-react"
import { redirect, RedirectType, useRouter } from 'next/navigation'

import Image from 'next/image'
import randomstring from 'randomstring';
import { useEffect, useRef, useState } from 'react'
import Form from 'next/form';
import { GallerySchema } from '@/data/gallery/GallerySchema';
import { postGallery } from '@/app/admin/gallery/actions';


const ImageSchema = z.object({
    url: z.string(),
    file: z.file()
})

type ImageObject = z.infer<typeof ImageSchema>

export default function GalleryCreate() {

    const router = useRouter();

    const manager = '/admin/gallery'
    const current = `/admin/gallery/create`

    // UI
    const [coverHover, setCoverHover] = useState<boolean>(false)
    const [galleryHover, setGalleryHover] = useState<string>('')
    const [selectedImage, setSelectedImage] = useState<ImageObject | null>(null)
    const [confirm, setConfirm] = useState<boolean>(false)
    
    // Data
    
    const newCoverRef = useRef<HTMLInputElement | null>(null)
    const changeCoverRef = useRef<HTMLInputElement | null>(null)

    const newImageRef = useRef<HTMLInputElement | null>(null)
    
    const [coverImage, setCoverImage] = useState<ImageObject>()

    const [images, setImages] = useState<ImageObject[]>([])

    const [eventID, setID] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    const [date, setDate] = useState<string>("")
    const [location, setLocation] = useState<string | null>("")

    const validate = async () => {
        
        if (coverImage == undefined) {
            history.pushState(null, '#cover')
            document.getElementById('logistic')?.scrollIntoView({ behavior: 'smooth' })
            return
        };

        if (images.length == 0) {
            history.pushState(null, '#files')
            document.getElementById('files')?.scrollIntoView({ behavior: 'smooth' })
            return
        };


        // Database Validate and Input
        const db_input = await GallerySchema.safeParseAsync({
            id: eventID,
            name: title,
            cover_image: `${coverImage.file.name.substring(0, coverImage.file.name.lastIndexOf('.'))}.webp`,
            cover_offset: null,
            date: new Date(date),
            location: location
        })

        if (!db_input.success) return;

        const result = await postGallery(db_input.data)

        if (result) {
            

            const formData = new FormData();
            images.forEach((img) => {
                formData.append("images", img.file)
            })

            
            formData.append("id", eventID)
            
            formData.append("purpose", "gallery")

            const response = await fetch("/api/gallery", {
                method: "POST",
                body: formData,
            });

            await response.json();

            router.refresh()
            router.push(manager)
        }
    }

    const tempUpload = (files: File[]) => {
        const newImages = files
        .filter((file) => {
            return !images.find((cursor) => {
                return cursor.file.name == file.name
            })
        })
        .map((file) => ({
            url: URL.createObjectURL(file),
            file,
        }))

        setImages((prev) => [...prev, ...newImages])
    }

    const deleteFromTemp = (file : ImageObject) => {
        setImages(images.filter(
            (cursor) => {
                return cursor != file
            }
        ))
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setID(randomstring.generate(24))
    }, [])

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
                            File name: {selectedImage.file.name}
                        </h1>
                        
                        <Image
                            src={selectedImage.url}
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
                        Do you want to create this event?
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
            
            {/* Breadcrumbs section */}
            <div 
                className={`flex flex-row items-center gap-1.5 font-outfit font-medium py-3 px-5 rounded-2xl bg-sidebar-hover min-w-0 max-w-full overflow-hidden`}
            >
                <div className="flex border-r-2 border-[#6e6e6e] pr-3">
                    <ArrowLeft className="cursor-pointer" onClick={() => redirect(manager, RedirectType.push)}/>
                </div>
                <button 
                    className="flex gap-2 text-foreground ml-1 p-1.25 rounded-xl cursor-pointer hover:bg-crumbs-hover max-w-10 md:max-w-none"
                    onClick={() => redirect(manager, RedirectType.push)}
                >
                    <CalendarClock className="md:block hidden"/>
                    <span className="truncate flex-1 min-w-0">
                        Gallery Manager
                    </span>
                </button>
                <ChevronRight className="shrink-0"/>
                <button 
                    className="flex gap-2 text-foreground p-1.25 rounded-xl cursor-pointer hover:bg-crumbs-hover"
                    onClick={() => redirect(current, RedirectType.push)}
                >
                    <GitPullRequestCreateArrow />
                    <span className="truncate flex-1 min-w-0">
                        Create Gallery
                    </span>
                </button>
            </div>
            
            <Form action={validate} className="flex flex-col xs:px-4 sm:px-7 pb-7 lg:px-20 xl:px-50 pt-7 gap-10">

                {/* Photo Edit */}
                <section id="cover" className="flex flex-col gap-6 border-2 rounded-xl px-5 sm:px-8 pt-6 pb-10 shadow-2xl shadow-navbar-dropdown hover:shadow-foreground/30 hover:border-navbar-join">
                    <h1 className="w-full md:text-2xl font-bold font-outfit tracking-wider">
                        <span>
                            Cover Image
                        </span>
                        <span className="text-red-500 text-base align-top">
                            {" *"}
                        </span>
                    </h1>
                    <div 
                        className="flex relative w-full h-100 max-h-100 overflow-hidden rounded-2xl"
                        onMouseEnter={() => {
                            if (coverImage) {
                                setCoverHover(true)
                            }
                        }}
                        onMouseLeave={() => {
                            if (coverImage) {
                                setCoverHover(false)
                            }
                        }}
                    >
                        <div className={`${coverImage ? "hidden" : "flex"} items-center justify-center absolute w-full h-full z-999 bg-white/40`}>
                            <input 
                                type="file"
                                accept="image/*"
                                ref={newCoverRef}
                                className="hidden"
                                name='cover'
                                onChange={async (e) => {
                                    const file = e.currentTarget.files?.[0];
                                    if (!file) return;
                                    
                                    setCoverImage(ImageSchema.parse({
                                        url: URL.createObjectURL(file),
                                        file: file
                                    }))
                                }}
                            />
                            <button
                                type="button"
                                className={`flex flex-col gap-3 px-4 items-center justify-center bg-background hover:bg-navbar w-35 h-35 rounded-xl cursor-pointer font-outfit text-sm`}
                                onClick={() => {
                                    newCoverRef.current?.click()
                                }}
                            >
                                <FilePlus className="scale-130 text-foreground"/>
                                Upload your cover photo
                            </button>
                        </div>

                        <div 
                            className="absolute inset-0 bg-cover bg-center blur-xl z-0" 
                            style={{ backgroundImage: coverImage ? `url(${coverImage.url})` : `url(/samples/cover.webp)` }}
                        />
                        <div className="relative w-full h-full z-10 flex items-center justify-center">
                            <Image 
                                src={coverImage ? `${coverImage.url}` : `/samples/cover.webp` }
                                width={1920} 
                                height={1080} 
                                className={`w-full h-full object-contain`}
                                alt={'new event'}
                            />

                            <div className={`absolute flex items-center justify-center w-full h-full bg-black/50 ${coverHover ? "" : "hidden"}`}>
                                <input 
                                    type="file"
                                    accept="image/*"
                                    ref={changeCoverRef}
                                    className="hidden"
                                    max={1}
                                    onChange={async (e) => {
                                        const file = e.currentTarget.files?.[0];
                                        if (!file) return;
                                        if (coverImage) URL.revokeObjectURL(coverImage.url);

                                        setCoverImage(ImageSchema.parse({
                                            url: URL.createObjectURL(file),
                                            file: file
                                        }))
                                    }}
                                />
                                <button
                                    type="button"
                                    className={`flex items-center justify-center bg-background hover:bg-navbar w-17 h-17 rounded-full cursor-pointer`}
                                    onClick={() => {
                                        changeCoverRef.current?.click()
                                    }}
                                >
                                    <Pencil className="scale-110 text-foreground"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Overview */}
                <section id="overview" className="flex flex-col gap-6 border-2 rounded-xl px-8 pt-8 pb-13 shadow-2xl shadow-navbar-dropdown hover:shadow-foreground/30 hover:border-navbar-join">
                    <h1 className="flex flex-col gap-2 sm:flex-row items-center w-full font-outfit tracking-wider">
                        <span className='md:text-2xl font-bold'>
                            Event Overview
                        </span>
                        <span className='sm:ml-auto text-xs italic font-light'>
                            Event ID: {eventID}
                        </span>
                    </h1>
                    

                    <section className="flex flex-col gap-10 sm:mx-5">
                        <main className="flex flex-col gap-4">
                            <h2 className="font-outfit font-medium tracking-wide">
                                Event Title
                            </h2>
                            <div className="w-full h-13">
                                <span className="flex flex-row gap-1 absolute -translate-y-2 translate-x-3.5 px-1.5 bg-sidebar text-xs font-medium">
                                    {"Event Title"}
                                    <p className="text-red-500">
                                        {"*"}
                                    </p>
                                </span>
                                <input
                                    name="title" 
                                    placeholder={"Anime Event Name..."}
                                    value={title}
                                    required={true}
                                    onChange={(e) => {setTitle(e.currentTarget.value)}}
                                    className="w-full h-full border-2 rounded-xl px-3"
                                />
                            </div>
                        </main>
                    </section>       
                </section>

                {/* Date & Location */}
                <section id="logistic" className="flex flex-col gap-6 border-2 rounded-xl px-8 pt-8 pb-13 shadow-2xl shadow-navbar-dropdown hover:shadow-foreground/30 hover:border-navbar-join">
                    <h1 className="w-full md:text-2xl font-bold font-outfit tracking-wider">
                        <span>
                            Date & Location
                        </span>
                    </h1>

                    <section className="flex flex-col gap-10 sm:mx-5">
                        <main className="flex flex-col gap-4">
                            <h2 className="font-outfit font-medium tracking-wide">
                                Date and Time
                            </h2>
                            <div className="flex flex-col lg:flex-row gap-5 min-w-0">
                                <div className="w-full max-w-80 h-13">
                                    <span className="flex flex-row gap-1 absolute -translate-y-2 translate-x-3.5 px-1.5 bg-sidebar text-xs font-medium">
                                        {"Date and Time (yyyy-mm-dd) --:-- --"}
                                        <p className="text-red-500">
                                            {"*"}
                                        </p>
                                    </span>
                                    <input
                                        name="datetime" 
                                        value={date}
                                        required={true}
                                        type="datetime-local"
                                        onChange={(e) => {
                                            setDate(e.target.value)
                                        }}
                                        className="w-full h-full border-2 rounded-xl px-3"
                                    />
                                </div>
                            </div>
                        </main>

                        <main className="flex flex-col gap-4">
                            <h2 className="font-outfit font-medium tracking-wide">
                                Location
                            </h2>
                            <div className="flex flex-row w-full h-13">
                                <span className="flex flex-row gap-1 absolute -translate-y-2 translate-x-3.5 px-1.5 bg-sidebar text-xs font-medium">
                                    {"Map Location"}
                                </span>
                                <input
                                    name="location" 
                                    placeholder={'University of Manitoba'}
                                    value={location ? location : ""}
                                    required={false}
                                    onChange={(e) => {
                                        const value = (e.currentTarget.value.trim() === '' ? null : e.currentTarget.value)
                                        setLocation(value)
                                    }}
                                    className="w-full h-full border-2 rounded-xl px-3 py-3"
                                />
                            </div>
                        </main>
                    </section>
                </section>
                
                <section id="files" className="flex flex-col gap-6 border-2 rounded-xl px-8 pt-8 pb-13 shadow-2xl shadow-navbar-dropdown hover:shadow-foreground/30 hover:border-navbar-join">
                    <h1 className="w-full md:text-2xl font-bold font-outfit tracking-wider">
                        <span>
                            Gallery Files
                        </span>
                        <span className="text-red-500 text-base align-top">
                            {" *"}
                        </span>
                    </h1>
                    
                    <div className="flex flex-col gap-10">
                        <section className="columns-1 sm:columns-2 lg:columns-3 xl:columns-3 2xl:columns-4 px-3 sm:px-0 pt-5 space-y-6">
                            <div
                                key={'sample'}
                                onClick={() => {
                                    newImageRef.current?.click()
                                }}
                                className="relative rounded-3xl border-4 h-fit overflow-hidden cursor-pointer bg-navbar col-span-1 border-foreground hover:border-gallery-hover hover:scale-103 transition duration-200 ease-in-out max-h-170 md:max-h-none"
                            >
                                {/* Upload Images Button */}
                                <div className="relative w-full h-full z-10 flex items-center justify-center">
                                    <Image
                                        src={'/samples/gallery.webp'}
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
                                            ref={newImageRef}
                                            className="hidden"
                                            multiple
                                            onChange={async (e) => {
                                                if (e.currentTarget.files == null) return;
                                                tempUpload(Array.from(e.currentTarget.files))
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
                                
                                const imageName = image.file.name
                                const imageUrl = image.url

                                return (
        
                                    <div
                                        key={imageName}
                                        onMouseEnter={() => {
                                            setGalleryHover(imageName)
                                        }}
                                        onMouseLeave={() => {
                                            setGalleryHover('')
                                        }}
                                        className="relative rounded-3xl border-4 w-fit h-fit overflow-hidden cursor-pointer bg-navbar col-span-1 border-foreground hover:border-gallery-hover hover:scale-103 transition duration-200 ease-in-out max-h-170 md:max-h-none"
                                    >
                                        <div className="relative w-full h-full z-10 flex items-center justify-center">
                                            <Image
                                                src={imageUrl}
                                                width={1920} height={1080}
                                                style={{ width: '1920', height: '1080' }}
                                                className={`w-full h-full object-contain`}
                                                alt={imageName}
                                                preload={true} loading="eager"
                                            />
                
                                            <div className={`absolute flex items-center justify-center gap-5 w-full h-full bg-black/50 ${galleryHover === imageName ? "" : "hidden"}`}>
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
                                                        deleteFromTemp(image)
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

                   
                </section>

                <section className="w-full flex items-center justify-center">
                    <button 
                        type="submit"
                        className={`mt-10 flex flex-row justify-center gap-3 font-outfit font-medium w-100 p-3.5 rounded-2xl cursor-pointer whitespace-nowrap hover:bg-sidebar-hover bg-sidebar-logout`}
                    >   
                        <Save />
                        Save Changes
                    </button>
                </section>
            </Form>
        </main>
    )
}