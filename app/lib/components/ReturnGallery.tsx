"use client"

import { redirect, RedirectType } from "next/navigation"
import { ArrowLeftFromLine } from "lucide-react"

export default function ReturnGallery() {
    return (
        <button 
            className="md:mr-auto mb-4 md:mb-0 flex flex-row gap-2 items-center justify-center w-30 h-10 bg-theme-switch border-2 border-gray-400 rounded-full cursor-pointer font-semibold"
            onClick={() => (redirect('/events#gallery', RedirectType.push))}
        >
            <ArrowLeftFromLine />
            Return
        </button>
    )
}