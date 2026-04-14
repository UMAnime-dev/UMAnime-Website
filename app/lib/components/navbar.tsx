"use client"

import Image from "next/image"

export default function Navbar() {
    return (
        <>
            <header className="w-full z-999 bg-navbar min-h-20 flex items-center px-15">
                <Image src='/UMAnime.svg' alt="UM Anime Club Logo" width={140} height={140} className="object-cover"/>
                <main className="flex flex-row ml-auto">

                    {/* Click to view club info (including yukari), staff team*/}
                    <button className="flex items-center justify-center bg-navbar hover:bg-navbar-hover hover:underline text-foreground font-semibold font-outfit py-2 px-4 rounded-lg cursor-pointer">
                        About UMAnime
                    </button>
                    <button className="flex items-center justify-center bg-navbar hover:bg-navbar-hover hover:underline text-foreground font-semibold font-outfit py-2 px-4 rounded-lg cursor-pointer">
                        Membership
                    </button>
                    {/* Dropdown choices: Schedule View & Gallery */}
                    <button className="flex items-center justify-center bg-navbar hover:bg-navbar-hover hover:underline text-foreground font-semibold font-outfit py-2 px-4 rounded-lg cursor-pointer">
                        Events
                    </button>
                    <button className="flex items-center justify-center bg-navbar hover:bg-navbar-hover hover:underline text-foreground font-semibold font-outfit py-2 px-4 rounded-lg cursor-pointer">
                        Sponsors
                    </button>
                    <button className="flex items-center justify-center bg-navbar hover:bg-navbar-hover hover:underline text-foreground font-semibold font-outfit py-2 px-4 rounded-lg cursor-pointer">
                        Contact Us
                    </button>

                    <button className="flex items-center justify-center bg-navbar-join hover:bg-navbar-join-hover hover:underline text-black font-bold font-outfit py-2 px-5 mx-7 rounded-lg cursor-pointer">
                        Join us!
                    </button>
                </main>
            </header>
        </>
    )
}