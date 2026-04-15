"use client"

import Image from "next/image"

import Link from "next/link"
import { redirect, RedirectType } from "next/navigation"
import { useState } from "react"

export default function Navbar() {

    const [aboutDropdown, setAboutDropdown] = useState(false)
    const [eventsDropdown, setEventsDropdown] = useState(false)

    return (
        <>
            <header className="w-full z-900 bg-navbar min-h-20 flex items-center px-15">
                <Image src='/UMAnime.svg' alt="UM Anime Club Logo" width={120} height={120} className="object-cover"/>
                <main className="flex flex-row ml-auto">

                    {/* Click to view club info (including yukari), staff team*/}
                    <div className="relative"
                        onMouseEnter={() => {setAboutDropdown(true)}}
                        onMouseLeave={() => {setAboutDropdown(false)}}
                    >
                        <button
                            className="bg-navbar hover:bg-navbar-hover hover:underline text-foreground font-semibold font-outfit py-2 px-4 rounded-lg cursor-pointer"
                            onClick={() => {
                                setAboutDropdown(!aboutDropdown)
                            }}
                        >
                            About
                        </button>
                        
                        {aboutDropdown && (
                            <div
                                className={`absolute top-full ml-1.25 bg-navbar-dropdown rounded-xl z-999 min-w-45 py-1.75`}
                            >   
                                <button
                                    className="flex hover:underline text-foreground font-semibold font-outfit py-2 px-4 mx-1.75 rounded-lg cursor-pointer whitespace-nowrap"
                                    onClick={() => {
                                        redirect('/about', RedirectType.push)
                                    }}
                                >
                                    UMAnime
                                </button>
                                <button
                                    className="flex hover:underline text-foreground font-semibold font-outfit py-2 px-4 mx-1.75 rounded-lg cursor-pointer whitespace-nowrap"
                                    onClick={() => {
                                        redirect('/yukari', RedirectType.push)
                                    }}
                                >
                                    Yukari
                                </button>

                                <button
                                    className="flex hover:underline text-foreground font-semibold font-outfit py-2 px-4 mx-1.75 rounded-lg cursor-pointer whitespace-nowrap"
                                    onClick={() => {
                                        redirect('/staff', RedirectType.push)
                                    }}
                                >
                                    Staff Team
                                </button>
                            </div>
                        )}
                    </div>

                    <Link className="flex items-center justify-center bg-navbar hover:bg-navbar-hover hover:underline text-foreground font-semibold font-outfit py-2 px-4 rounded-lg cursor-pointer"
                        href="/membership">
                        Membership
                    </Link>

                    {/* Dropdown choices: Schedule View & Gallery */}
                    <div className="relative"
                        onMouseEnter={() => {setEventsDropdown(true)}}
                        onMouseLeave={() => {setEventsDropdown(false)}}
                    >
                        <button
                            className="bg-navbar hover:bg-navbar-hover hover:underline text-foreground font-semibold font-outfit py-2 px-4 rounded-lg cursor-pointer"
                            onClick={() => {
                                setEventsDropdown(!eventsDropdown)
                            }}
                        >
                            Events
                        </button>
                        
                        {eventsDropdown && (
                            <div
                                className={`absolute top-full ml-1.25 bg-navbar-dropdown rounded-xl z-999 min-w-45 py-1.75`}
                            >
                                <button
                                    className="flex hover:underline text-foreground font-semibold font-outfit py-2 px-4 mx-1.75 rounded-lg cursor-pointer whitespace-nowrap"
                                    onClick={() => {
                                        redirect('/events', RedirectType.push)
                                    }}
                                >
                                    Schedule View
                                </button>

                                <button
                                    className="flex hover:underline text-foreground font-semibold font-outfit py-2 px-4 mx-1.75 rounded-lg cursor-pointer whitespace-nowrap"
                                    onClick={() => {
                                        redirect('/gallery', RedirectType.push)
                                    }}
                                >
                                    Gallery
                                </button>
                            </div>
                        )}
                    </div>

                    <button className="flex items-center justify-center bg-navbar hover:bg-navbar-hover hover:underline text-foreground font-semibold font-outfit py-2 px-4 rounded-lg cursor-pointer"
                        onClick={() => {
                            redirect('/sponsors', RedirectType.push)
                        }}
                    >
                        Sponsors
                    </button>

                    <button className="flex items-center justify-center bg-navbar hover:bg-navbar-hover hover:underline text-foreground font-semibold font-outfit py-2 px-4 rounded-lg cursor-pointer"
                        onClick={() => {
                            redirect('/contact', RedirectType.push)
                        }}
                    >
                        Contact Us
                    </button>

                    <button className="flex items-center justify-center bg-navbar-join hover:bg-navbar-join-hover hover:underline text-black font-bold font-outfit py-2 px-5 mx-7 rounded-lg cursor-pointer"
                        onClick={() => {
                            redirect('/onboarding', RedirectType.push)
                        }}
                    >   
                        Join us!
                    </button>
                </main>
            </header>
        </>
    )
}