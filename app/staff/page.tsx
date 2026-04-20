"use client"

import Footer from "../lib/components/footer";
import Navbar from "../lib/components/navbar";
import Markdown from "react-markdown"

import { current_staff, categories } from "@/data/staff";
import Image from "next/image";
import StaffCard from "../lib/components/staffPage/StaffCard";

export default function Staff() {

    const loadMarkdown = async (file: string) => {
        try {
            const res = await fetch(file);
            const text = await res.text();
            return text;
        } catch (err) {
            console.error("Failed to load markdown:", err);
        }
    };

    return (
        <>
            <main className="relative w-full min-h-screen overflow-x-hidden bg-background">
                <Navbar/>
                    <div className="flex flex-col text-center mb-15 mt-17 items-center">
                        <h2 className="font-outfit text-[clamp(24px,2.5vw,36px)] font-semibold text-foreground border-l-4 border-header-border w-fit px-2">
                            Meet the UMAnime Team!
                        </h2>
                        <p className="mt-3 font-outfit text-[clamp(13px,1.1vw,18px)] text-muted-foreground">
                            Below is our list of staff for the year 2025-2026!
                        </p>
                    </div>
                    <div className="w-full px-6 sm:px-10 md:px-2 lg:px-[clamp(100px,7.5vw,145px)] mb-20">

                        {
                            categories.map(({key,label}) => {
                                const categoryStaff = current_staff.filter((staff) => staff.category === key)

                                if (categoryStaff.length === 0) return null

                                return (
                                    <section key={key} className="mb-9">
                                        <h2 className="font-outfit text-foreground text-[clamp(18px,1.145vw,22px)] font-bold w-full border-b-2 border-header-border pl-3 pb-2 mb-6">
                                            {label}
                                        </h2>

                                        <div className="grid gap-9 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                            {categoryStaff.map((staff, i) => (
                                                StaffCard({staff})
                                            ))}
                                        </div>
                                    </section>
                                )
                            })
                        }
                    </div>
                <Footer/>
            </main>
        </>
    )
}