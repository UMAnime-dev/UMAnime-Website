"use client"

import Image from "next/image"

import Link from "next/link"
import { redirect, RedirectType } from "next/navigation"
import { useState } from "react"

import { Menu, ChevronDown } from 'lucide-react';
import { redirects } from "@/config/redirects"

export default function Navbar() {

    // PC
    const [aboutDropdown, setAboutDropdown] = useState(false)
    const [eventsDropdown, setEventsDropdown] = useState(false)

    // Mobile
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [mobileAboutDropdown, setMobileAboutDropdown] = useState(false)
    const [mobileEventsDropdown, setMobileEventsDropdown] = useState(false)

    return (
        <>
            <nav className={`w-full z-900 bg-navbar min-h-20 flex-col items-center px-[clamp(20px,5vw,60px)] ${mobileMenuOpen ? 'pb-4' : ''}`}>
                <header className="w-full min-h-20 flex items-center">
                    <Image src='/UMAnime.svg' alt="UM Anime Club Logo" width={110} height={110} style={{ width: '110', height: '110' }} className="object-cover cursor-pointer" onClick={() => {redirect('/', RedirectType.push)}}/>

                    {/* PC Version */}
                    <main className="navbar:flex! hidden flex-row ml-auto">

                        {/* Click to view club info (including yukari), staff team*/}
                        <div className="relative"
                            onMouseEnter={() => {
                                setAboutDropdown(true)
                            }}
                            onMouseLeave={() => {
                                setAboutDropdown(false)
                            }}
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
                                            redirect(redirects.club, RedirectType.push)
                                        }}
                                    >
                                        UMAnime
                                    </button>
                                    <button
                                        className="flex hover:underline text-foreground font-semibold font-outfit py-2 px-4 mx-1.75 rounded-lg cursor-pointer whitespace-nowrap"
                                        onClick={() => {
                                            redirect(redirects.yukari, RedirectType.push)
                                        }}
                                    >
                                        Yukari
                                    </button>

                                    <button
                                        className="flex hover:underline text-foreground font-semibold font-outfit py-2 px-4 mx-1.75 rounded-lg cursor-pointer whitespace-nowrap"
                                        onClick={() => {
                                            redirect(redirects.staff, RedirectType.push)
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
                                            redirect(redirects.events, RedirectType.push)
                                        }}
                                    >
                                        Schedule View
                                    </button>

                                    <button
                                        className="flex hover:underline text-foreground font-semibold font-outfit py-2 px-4 mx-1.75 rounded-lg cursor-pointer whitespace-nowrap"
                                        onClick={() => {
                                            redirect(redirects.gallery, RedirectType.push)
                                        }}
                                    >
                                        Gallery
                                    </button>
                                </div>
                            )}
                        </div>

                        <button className="flex items-center justify-center bg-navbar hover:bg-navbar-hover hover:underline text-foreground font-semibold font-outfit py-2 px-4 rounded-lg cursor-pointer"
                            onClick={() => {
                                redirect(redirects.sponsors, RedirectType.push)
                            }}
                        >
                            Sponsors
                        </button>

                        <button className="flex items-center justify-center bg-navbar hover:bg-navbar-hover hover:underline text-foreground font-semibold font-outfit py-2 px-4 rounded-lg cursor-pointer"
                            onClick={() => {
                                redirect(redirects.contact, RedirectType.push)
                            }}
                        >
                            Contact Us
                        </button>

                        <button className="flex items-center justify-center bg-navbar-join hover:bg-navbar-join-hover hover:underline text-black font-bold font-outfit py-2 px-5 mx-7 rounded-lg cursor-pointer"
                            onClick={() => {
                                redirect(redirects.onboarding, RedirectType.push)
                            }}
                        >   
                            Join us!
                        </button>
                    </main>

                    {/* Mobile Version */}
                    <div className="navbar:hidden! ml-auto">
                        <button className="flex items-center justify-center cursor-pointer p-3">
                            <Menu onClick={() => setMobileMenuOpen(!mobileMenuOpen)}/>
                        </button>
                    </div>
                    
                </header>

                {mobileMenuOpen && (
                    <div className="navbar:hidden! flex flex-col w-full min-h-20 bg-navbar-dropdown rounded-xl p-3">
                        <button className="flex flex-row items-center text-left text-foreground font-semibold font-outfit px-3 py-2" onClick={() => setMobileAboutDropdown(!mobileAboutDropdown)}>
                            About
                            <ChevronDown className={`ml-auto transition-transform ${mobileAboutDropdown ? 'rotate-180' : ''}`}/>
                        </button>
                        {mobileAboutDropdown && (
                            <div className={`flex flex-col ml-4`}>
                                <button className="text-left text-[13px] text-foreground font-semibold font-outfit px-3 py-2" onClick={() => redirect(redirects.club, RedirectType.push)}>
                                    UMAnime
                                </button>
                                <button className="text-left text-[13px] text-foreground font-semibold font-outfit px-3 py-2" onClick={() => redirect(redirects.yukari, RedirectType.push)}>
                                    Yukari
                                </button>
                                <button className="text-left text-[13px] text-foreground font-semibold font-outfit px-3 py-2" onClick={() => redirect(redirects.staff, RedirectType.push)}>
                                    Staff Team
                                </button>
                            </div>
                        )}

                        <button className="flex flex-row items-center text-left text-foreground font-semibold font-outfit px-3 py-2" onClick={() => redirect(redirects.membership, RedirectType.push)}>
                            Membership
                        </button>

                        <button className="flex flex-row items-center text-left text-foreground font-semibold font-outfit px-3 py-2" onClick={() => setMobileEventsDropdown(!mobileEventsDropdown)}>
                            Events
                            <ChevronDown className={`ml-auto transition-transform ${mobileEventsDropdown ? 'rotate-180' : ''}`}/>
                        </button>
                        {mobileEventsDropdown && (
                            <div className={`flex flex-col ml-4`}>
                                <button className="text-left text-[13px] text-foreground font-semibold font-outfit px-3 py-2" onClick={() => redirect(redirects.events, RedirectType.push)}>
                                    Schedule View
                                </button>
                                <button className="text-left text-[13px] text-foreground font-semibold font-outfit px-3 py-2" onClick={() => redirect(redirects.gallery, RedirectType.push)}>
                                    Gallery
                                </button>
                            </div>
                        )}

                        <button className="flex flex-row items-center text-left text-foreground font-semibold font-outfit px-3 py-2" onClick={() => redirect(redirects.sponsors, RedirectType.push)}>
                            Sponsors
                        </button>

                        <button className="flex flex-row items-center text-left text-foreground font-semibold font-outfit px-3 py-2" onClick={() => redirect(redirects.contact, RedirectType.push)}>
                            Contact Us
                        </button>

                        <button className="flex flex-row items-center text-left bg-navbar-join text-black font-bold font-outfit px-3 py-2 mt-3 rounded-xl" onClick={() => redirect(redirects.onboarding, RedirectType.push)}>
                            Join us!
                        </button>
                    </div>
                )}
            </nav>
            
        </>
    )
}