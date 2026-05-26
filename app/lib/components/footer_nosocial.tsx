"use client"

import Image from "next/image"

import { FaRegCopyright } from "react-icons/fa6";

import { redirect, RedirectType } from "next/navigation";

export default function FooterNoSocial() {
    return (
        <>
            <nav className="w-full bg-navbar px-[clamp(20px,5vw,60px)] py-5">
                <footer className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-4 sm:gap-5">
                    <Image
                        src="/UMAnime.svg"
                        alt="UM Anime Club Logo"
                        width={0}
                        height={0}
                        style={{ width: '110', height: '110' }}
                        loading="eager"
                        className="w-30 sm:w-24 md:w-28 cursor-pointer"
                        onClick={() => redirect('/', RedirectType.replace)}
                    />

                    <div className="flex items-center justify-center gap-1 text-xs text-foreground/70 sm:text-sm">
                        <FaRegCopyright className="text-xs sm:text-sm" />
                        <span className="leading-none">
                            {new Date().getFullYear()} UM Anime Club. All rights reserved.
                        </span>
                    </div>
                </footer>
            </nav>
        </>
    )
}