"use client"

import { ArrowLeft, Ban, BookCheck, BookX, CalendarClock, ChevronRight, CircleCheck, CircleDashed, CircleDot, CircleX, FilePlus, GitPullRequestCreateArrow, HardDriveDownload, Link, Pencil, Save, ShieldAlert } from "lucide-react"
import { redirect, RedirectType } from 'next/navigation'

import Image from 'next/image'
import randomstring from 'randomstring';
import { useEffect, useRef, useState } from 'react'
import Form from 'next/form';

import { sendInsert } from "@/app/admin/events/actions";
import { EventSchema } from "@/data/schedule/EventSchema";
import { useRouter } from "next/navigation";

export default function EventCreate() {

    const router = useRouter();

    const scheduler = '/admin/events'
    const current = `/admin/events/create`

    // UI
    const [coverHover, setCoverHover] = useState(false)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [confirm, setConfirm] = useState<boolean>(false)
    
    // Data
    const [coverImage, setCoverImage] = useState<string>('icebreaker.jpg')
    const [uploadImage, setUploadImage] = useState<File | null>(null);

    const [eventID, setID] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const [date, setDate] = useState<string>("")
    const [startTime, setStart] = useState<string>("")
    const [endTime, setEnd] = useState<string>("")
    const [location, setLocation] = useState<string>("")

    const [membership, setMembership] = useState<boolean>(true)
    const [rsvpType, setRSVPType] = useState<"EXTERNAL" | "SYSTEM" | "NONE">("NONE")
    const [rsvpExternal, setRSVPExternal] = useState<string>("")

    const triggerConfirmation = () => {
        setConfirm(true)
    }

    const validate = async () => {
        if (!uploadImage) {
            history.pushState(null, '#cover')
            document.getElementById('cover')?.scrollIntoView({ behavior: 'smooth' })
            return
        }

        if (!date) {
            history.pushState(null, '#cover')
            document.getElementById('logistic')?.scrollIntoView({ behavior: 'smooth' })
            return
        }

        const startDate = new Date(date)
        const endDate = new Date(date)

        const startSplit = startTime.split(':')
        const endSplit = endTime.split(':')

        startDate.setHours(Number(startSplit[0]))
        startDate.setMinutes(Number(startSplit[1]))

        endDate.setHours(Number(endSplit[0]))
        endDate.setMinutes(Number(endSplit[1]))

        const fileName = await uploadHandler()
        
        const object = await EventSchema.safeParseAsync({
            id: eventID,
            name: title,
            photourl: uploadImage != null ? fileName : coverImage,
            photooffset: "0%_0%",
            description: description,
            location: location,
            startdate: startDate,
            enddate: endDate,
            rsvp: rsvpExternal.length > 0 && rsvpType === "EXTERNAL" ? rsvpExternal : null,
            membership: membership,
            created_at: new Date(),
            updated_at: null
        })
        
        if (object.success) {
            const result = await sendInsert(eventID, object.data)

            if (result) {
                router.refresh()
                router.push(scheduler)
            }
        }
    }

    const uploadHandler = async () => {

        if (uploadImage == null) {
            return
        }
        
        const formData = new FormData();
        const fileName = String(Date.now()) + ".webp"
        formData.append("name", fileName)
        formData.append("image", uploadImage);
        formData.append("purpose", "event")

        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        await response.json();

        return fileName
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setID(randomstring.generate(24))
    }, [])

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

            
            <div 
                className={`flex flex-row items-center gap-1.5 font-outfit font-medium py-3 px-5 rounded-2xl bg-sidebar-hover min-w-0 max-w-full overflow-hidden`}
            >
                <div className="flex border-r-2 border-[#6e6e6e] pr-3">
                    <ArrowLeft className="cursor-pointer" onClick={() => redirect(scheduler, RedirectType.push)}/>
                </div>
                <button 
                    className="flex gap-2 text-foreground ml-1 p-1.25 rounded-xl cursor-pointer hover:bg-crumbs-hover max-w-10 md:max-w-none"
                    onClick={() => redirect(scheduler, RedirectType.push)}
                >
                    <CalendarClock className="md:block hidden"/>
                    <span className="truncate flex-1 min-w-0">
                        Event Scheduler
                    </span>
                </button>
                <ChevronRight className="shrink-0"/>
                <button 
                    className="flex gap-2 text-foreground p-1.25 rounded-xl cursor-pointer hover:bg-crumbs-hover"
                    onClick={() => redirect(current, RedirectType.push)}
                >
                    <GitPullRequestCreateArrow />
                    <span className="truncate flex-1 min-w-0">
                        Create an Event
                    </span>
                </button>
            </div>

            <Form action={triggerConfirmation} className="flex flex-col xs:px-4 sm:px-7 pb-7 lg:px-20 xl:px-50 pt-7 gap-10">
                
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
                            if (uploadImage) {
                                setCoverHover(true)
                            }
                        }}
                        onMouseLeave={() => {
                            if (uploadImage) {
                                setCoverHover(false)
                            }
                        }}
                    >
                        <div className={`${uploadImage ? "hidden" : "flex"} items-center justify-center absolute w-full h-full z-999 bg-white/40`}>
                            <input 
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                className="hidden"
                                name='cover'
                                onChange={async (e) => {
                                    const file = e.currentTarget.files?.[0];
                                    if (!file) return;

                                    setCoverImage(URL.createObjectURL(file))
                                    setUploadImage(file)
                                }}
                            />
                            <button
                                type="button"
                                className={`flex flex-col gap-3 px-4 items-center justify-center bg-background hover:bg-navbar w-35 h-35 rounded-xl cursor-pointer font-outfit text-sm`}
                                onClick={() => {
                                    fileInputRef.current?.click()
                                }}
                            >
                                <FilePlus className="scale-130 text-foreground"/>
                                Upload your cover photo
                            </button>
                        </div>
                        <div 
                            className="absolute inset-0 bg-cover bg-center blur-xl z-0" 
                            style={{ backgroundImage: uploadImage ? `url(${coverImage})` : `url(${process.env.NEXT_PUBLIC_EVENT_DIRECTORY}${coverImage})` }}
                        />
                        <div className="relative w-full h-full z-10 flex items-center justify-center">
                            <Image 
                                src={uploadImage ? `${coverImage}` : `${process.env.NEXT_PUBLIC_EVENT_DIRECTORY}${coverImage}` }
                                width={1920} 
                                height={1080} 
                                className={`w-full h-full object-contain`}
                                alt={'new event'}
                            />

                            <div className={`absolute flex items-center justify-center w-full h-full bg-black/50 ${coverHover ? "" : "hidden"}`}>
                                <input 
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    className="hidden"
                                    max={1}
                                    onChange={async (e) => {
                                        const file = e.currentTarget.files?.[0];
                                        if (!file) return;

                                        setCoverImage(URL.createObjectURL(file))
                                        setUploadImage(file)
                                    }}
                                />
                                <button
                                    type="button"
                                    className={`flex items-center justify-center bg-background hover:bg-navbar w-17 h-17 rounded-full cursor-pointer`}
                                    onClick={() => {
                                        fileInputRef.current?.click()
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
                            <p className="font-outfit font-light">
                                Be clear and give it a very cool event name!
                            </p>
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

                        <main className="flex flex-col gap-4">
                            <h2 className="font-outfit font-medium tracking-wide">
                                Description
                            </h2>
                            <p className="font-outfit font-light">
                                What is this event about?? Type out the description of this event to grab the attention of possible audiences!
                            </p>
                            <div className="w-full h-13">
                                <span className="flex flex-row gap-1 absolute -translate-y-2 translate-x-3.5 px-1.5 bg-sidebar text-xs font-medium">
                                    {"Description"}
                                    <p className="text-red-500">
                                        {"*"}
                                    </p>
                                </span>
                                <input
                                    name="description" 
                                    placeholder={"Anime Event Description..."}
                                    value={description}
                                    required={true}
                                    onChange={(e) => {setDescription(e.currentTarget.value)}}
                                    className="w-full h-full border-2 rounded-xl px-3 py-8"
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
                                        {"Date (yyyy-mm-dd)"}
                                        <p className="text-red-500">
                                            {"*"}
                                        </p>
                                    </span>
                                    <input
                                        name="date" 
                                        value={date}
                                        required={true}
                                        type="date"
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full h-full border-2 rounded-xl px-3"
                                    />
                                </div>
                                
                                <div className="flex flex-col xs:flex-row gap-3 xs:gap-1 sm:gap-5">
                                     <div className="min-w-25 w-full max-w-40 h-13">
                                        <span className="flex flex-row gap-1 absolute -translate-y-2 translate-x-3.5 px-1.5 bg-sidebar text-xs font-medium">
                                            {"Start time"}
                                            <p className="text-red-500">
                                                {"*"}
                                            </p>
                                        </span>
                                        <input
                                            name="start_time" 
                                            value={startTime}
                                            required={true}
                                            type="time"
                                            onChange={(e) => setStart(e.currentTarget.value)}
                                            className="w-full h-full border-2 rounded-xl px-3"
                                        />
                                    </div>

                                     <div className="min-w-25 w-full max-w-40 h-13">
                                        <span className="flex flex-row gap-1 absolute -translate-y-2 translate-x-3.5 px-1.5 bg-sidebar text-xs font-medium">
                                            {"End time"}
                                            <p className="text-red-500">
                                                {"*"}
                                            </p>
                                        </span>
                                        <input
                                            name="end_time" 
                                            value={endTime}
                                            required={true}
                                            type="time"
                                            onChange={(e) => setEnd(e.currentTarget.value)}
                                            className="w-full h-full border-2 rounded-xl px-3"
                                        />
                                    </div>
                                </div>
                                
                            </div>
                        </main>

                        <main className="flex flex-col gap-4">
                            <h2 className="font-outfit font-medium tracking-wide">
                                Location
                            </h2>
                            <p className="font-outfit font-light">
                                Where is this going to be??
                            </p>
                            <div className="flex flex-row w-full h-13">
                                <span className="flex flex-row gap-1 absolute -translate-y-2 translate-x-3.5 px-1.5 bg-sidebar text-xs font-medium">
                                    {"Map Location"}
                                    <p className="text-red-500">
                                        {"*"}
                                    </p>
                                </span>
                                <input
                                    name="location" 
                                    placeholder={'University of Manitoba'}
                                    value={location}
                                    required={true}
                                    onChange={(e) => {setLocation(e.currentTarget.value)}}
                                    className="w-full h-full border-2 rounded-xl px-3 py-3"
                                />
                            </div>
                        </main>
                    </section>
                </section>
                
                {/* Admission */}
                <section id="admission" className="flex flex-col gap-6 border-2 rounded-xl px-8 pt-8 pb-13 shadow-2xl shadow-navbar-dropdown hover:shadow-foreground/30 hover:border-navbar-join">
                    <h1 className="w-full md:text-2xl font-bold font-outfit tracking-wider">
                        <span>
                            Admission Details
                        </span>
                    </h1>

                    <section className="flex flex-col gap-7 sm:mx-5">
                        <main className="flex flex-col gap-4">
                            <div className="flex flex-row gap-1">
                                <h2 id="membership" className="font-outfit font-medium tracking-wide">
                                    Membership
                                </h2>
                                <p className="text-red-500">
                                    {"*"}
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-5">
                                <button 
                                    id="btn_member_req"
                                    type="button"
                                    className={`${membership ? "outline-2 outline-solid" : ""} flex flex-col items-center text-xs sm:text-sm lg:text-base lg:flex-row gap-2 font-outfit font-medium p-3 rounded-2xl cursor-pointer bg-sidebar-hover shadow-2xl/30 hover:shadow-foreground`}
                                    onClick={() => setMembership(true)}
                                >
                                    <BookCheck />
                                    Membership Required
                                    {
                                        membership ?
                                            <CircleDot className="lg:ml-5" />
                                        :
                                            <CircleDashed className="lg:ml-5"/>
                                    }
                                </button>
                                <button 
                                    id="btn_member_notreq"
                                    type="button"
                                    className={`${membership ? "" : "outline-2 outline-solid"} flex flex-col items-center text-xs sm:text-sm lg:text-base lg:flex-row gap-2 font-outfit font-medium p-3 rounded-2xl cursor-pointer bg-sidebar-hover shadow-2xl/30 hover:shadow-foreground`}
                                    onClick={() => setMembership(false)}
                                >
                                    <BookX />
                                    No Membership Required
                                    {
                                        membership ?
                                            <CircleDashed className="lg:ml-5"/>
                                        :
                                            <CircleDot className="lg:ml-5" />
                                    }
                                </button>
                           </div>
                        </main>

                        <main className="flex flex-col gap-4">
                            <h2 className="font-outfit font-medium tracking-wide">
                                Reservation (RSVP)
                            </h2>
                            <p className="font-outfit font-light">
                                How do you want others to make reservation??
                            </p>
                            <div className="flex flex-col sm:flex-row gap-5">
                                <button 
                                    id="btn_rsvp_none" 
                                    type="button"
                                    className={`${rsvpType === "NONE" ? "outline-2 outline-solid" : ""} flex flex-col items-center text-xs sm:text-sm lg:text-base lg:flex-row gap-2 font-outfit font-medium p-3 rounded-2xl cursor-pointer bg-sidebar-hover shadow-2xl/30 hover:shadow-foreground`}
                                    onClick={() => setRSVPType('NONE')}
                                >
                                    <Ban />
                                    No Reservations
                                    {
                                        rsvpType === "NONE" ?
                                            <CircleDot className="lg:ml-5" />
                                        :
                                            <CircleDashed className="lg:ml-5"/>
                                    }
                                </button>
                                <button 
                                    id="btn_rsvp_external" 
                                    type="button"
                                    className={`${rsvpType === "EXTERNAL" ? "outline-2 outline-solid" : ""} flex flex-col items-center text-xs sm:text-sm lg:text-base lg:flex-row gap-2 font-outfit font-medium p-3 rounded-2xl cursor-pointer bg-sidebar-hover shadow-2xl/30 hover:shadow-foreground`}
                                    onClick={() => setRSVPType('EXTERNAL')}
                                >
                                    <Link />
                                    External Link System
                                    {
                                        rsvpType === "EXTERNAL" ?
                                            <CircleDot className="lg:ml-5" />
                                        :
                                            <CircleDashed className="lg:ml-5"/>
                                    }
                                </button>
                                <button 
                                    id="btn_rsvp_internal"
                                    type="button"
                                    className={`${rsvpType === "SYSTEM" ? "" : ""} opacity-60 flex flex-col items-center text-xs sm:text-sm lg:text-base lg:flex-row gap-2 font-outfit font-medium p-3 rounded-2xl cursor-not-allowed bg-sidebar-hover shadow-2xl/30 hover:shadow-foreground`}
                                >
                                    <HardDriveDownload />
                                    Internal Reservation System
                                    {
                                        rsvpType ?
                                            <CircleDashed className="lg:ml-5"/>
                                        :
                                            <CircleDot className="lg:ml-5" />
                                    }
                                </button>
                           </div>
                        </main>

                        {
                            rsvpType === "EXTERNAL" ?
                                <main className="flex flex-col gap-3">
                                    <h2 className="font-outfit font-medium tracking-wide">
                                        Reservation Link
                                    </h2>
                                    <div className="w-full h-13">
                                        <span className="flex flex-row gap-1 absolute -translate-y-2 translate-x-3.5 px-1.5 bg-sidebar text-xs font-medium">
                                            {"Enter link here"}
                                            <p className="text-red-500">
                                                {"*"}
                                            </p>
                                        </span>
                                        <input
                                            name="rsvp_link" 
                                            placeholder={rsvpExternal}
                                            value={rsvpExternal}
                                            required={rsvpType === "EXTERNAL" ? true : false}
                                            type="url"
                                            onChange={(e) => {setRSVPExternal(e.currentTarget.value)}}
                                            className="w-full h-full border-2 rounded-xl px-3"
                                        />
                                    </div>
                                </main>
                            :
                                <></>
                        }
                    </section>
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