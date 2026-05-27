"use client"

import Footer from "../lib/components/footer";
import Navbar from "../lib/components/navbar";

import { current_staff, categories } from "@/data/staff";
import StaffCard from "../lib/components/StaffCard";
import { useState } from "react";

export default function Staff() {

    const [openStaff, setOpenStaff] = useState<string | null>(null);


    return (
        <>
            <main className="relative w-full min-h-screen overflow-x-hidden bg-background">
                <Navbar/>
                    <div className="flex flex-col text-center mb-15 mt-17 items-center">
                        <h2 className="font-outfit text-xl md:text-3xl font-semibold text-foreground w-fit px-2 pb-2">
                            Meet the UMAnime Team!
                        </h2>
                    </div>
                    <div className="w-full px-6 sm:px-10 md:px-2 lg:px-[clamp(100px,7.5vw,145px)] mb-20">
                        {
                            categories.map(({key,label}) => {
                                const categoryStaff = current_staff.filter((staff) => staff.category === key)

                                if (categoryStaff.length === 0) return null

                                return (
                                    <section key={key} className="mb-9">
                                        <h2 className="font-outfit text-foreground text-[clamp(18px,1.3vw,25px)] font-bold w-full border-b-2 border-header-border pl-3 pb-2 mb-6">
                                            {label}
                                        </h2>

                                        <div className="grid gap-9 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                            {categoryStaff.map((staff) => (
                                                StaffCard({staff, openStaff, setOpenStaff})
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