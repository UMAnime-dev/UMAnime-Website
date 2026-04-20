"use client"

import Image from "next/image"
import { FaInstagram, FaDiscord } from "react-icons/fa";
import { TbBrandLinktree } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { FaRegCopyright } from "react-icons/fa6";

import { redirects } from "@/config/redirects"
import { redirect, RedirectType } from "next/navigation";

export default function Footer() {
    return (
        <>
            <nav className="w-full bg-navbar px-[clamp(20px,5vw,60px)] py-5">
                <footer className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-4 sm:gap-5">
                    <Image
                    src="/UMAnime.svg"
                    alt="UM Anime Club Logo"
                    width={110}
                    height={110}
                    style={{ height: 'auto' }}
                    className="w-30 sm:w-[95px] md:w-[110px]"
                    />

                    <section className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-6">
                        <button className="flex items-center justify-center gap-1.5 text-sm font-outfit leading-none text-foreground sm:text-base cursor-pointer hover:underline"
                            onClick={() => {redirect(redirects.instagram, RedirectType.push)}}>
                            <FaInstagram className="shrink-0 text-lg sm:text-xl" />
                            <span className="leading-none">Instagram</span>
                        </button>

                        <button className="flex items-center justify-center gap-1.5 text-sm font-outfit leading-none text-foreground sm:text-base cursor-pointer hover:underline"
                            onClick={() => {redirect(redirects.discord, RedirectType.push)}}>
                            <FaDiscord className="shrink-0 text-lg sm:text-xl" />
                            <span className="leading-none">Discord</span>
                        </button>

                        <button className="flex items-center justify-center gap-1.5 text-sm font-outfit leading-none text-foreground sm:text-base cursor-pointer hover:underline"
                            onClick={() => {redirect(redirects.linktree, RedirectType.push)}}>
                            <TbBrandLinktree className="shrink-0 text-lg sm:text-xl" />
                            <span className="leading-none">Linktree</span>
                        </button>

                        <button className="flex min-w-0 items-center justify-center gap-1.5 text-sm font-outfit leading-none text-foreground sm:text-base cursor-pointer hover:underline"
                            onClick={() => {redirect(redirects.email, RedirectType.push)}}>
                            <MdEmail className="shrink-0 text-lg sm:text-xl" />
                            <span className="break-all leading-none sm:break-normal">
                            umanimeclub@gmail.com
                            </span>
                        </button>
                    </section>

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