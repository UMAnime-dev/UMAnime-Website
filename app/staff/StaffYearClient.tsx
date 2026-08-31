"use client"

import { useState } from "react";

import Navbar from "@/app/lib/components/navbar";
import Footer from "../lib/components/footer";
import StaffCard from "../lib/components/StaffCard";
import { Check, ChevronDown } from "lucide-react";
import { useQueryState } from 'nuqs';

import { 
    StaffMember as Members
} from "@/data/staff";

type StaffCategory = "executive" | "events" | "artists" | "media";

export const categories: { key: StaffCategory; label: string }[] = [
    { key: "executive", label: "Executive Team + Lead Moderator" },
    { key: "events", label: "Events Staff" },
    { key: "artists", label: "Artists" },
    { key: "media", label: "Social Media Team" },
];

export default function StaffClient({members}:{members: Members[]}) {
    const [openStaff, setOpenStaff] = useState<string | null>(null);
    const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
    const [year, setYear] = useQueryState('year', { defaultValue: '2026-2027', shallow: false });

    return (
        <>
            <main className="relative w-full min-h-screen overflow-x-hidden bg-background">
                <Navbar/>
                    <div className="relative flex flex-row text-center mb-15 mt-17 justify-center">
                        <h2 className="font-outfit text-xl md:text-3xl font-semibold text-foreground w-fit px-2 pb-2">
                            Meet the UMAnime Team!
                        </h2>
                        <button 
                            className="absolute flex w-45 h-10 border right-15 top-10 rounded-lg justify-between items-center cursor-pointer px-2"
                            onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
                        >
                            {year}
                            <ChevronDown />
                            <div className={`absolute top-full left-0 w-full bg-background border rounded-lg shadow-lg z-10 mt-2 ${yearDropdownOpen ? 'block' : 'hidden'}`}>
                                <ul className="py-2">
                                    <li className="flex px-5 py-2 hover:bg-muted cursor-pointer justify-between hover:underline" 
                                        onClick={() => { setYear('2026-2027'); setYearDropdownOpen(false); }}
                                    >
                                        2026-2027
                                        {year === '2026-2027' && <Check />}
                                    </li>
                                    <li className="flex px-5 py-2 hover:bg-muted cursor-pointer justify-between hover:underline" 
                                        onClick={() => { setYear('2025-2026'); setYearDropdownOpen(false); }}
                                    >
                                        2025-2026
                                        {year === '2025-2026' && <Check />}
                                    </li>
                                </ul>
                            </div>
                        </button>
                    </div>
                    <div className="w-full px-6 sm:px-10 md:px-2 lg:px-[clamp(100px,7.5vw,145px)] mb-20">
                        {
                            categories.map(({key,label}) => {
                                const categoryStaff = members.filter((staff) => staff.category === key)

                                if (categoryStaff.length === 0) return null

                                return (
                                    <section key={key} className="mb-9">
                                        <h2 className="font-outfit text-foreground text-[clamp(18px,1.3vw,25px)] font-bold w-full border-b-2 border-header-border pl-3 pb-2 mb-6">
                                            {label}
                                        </h2>

                                        <div className="grid gap-9 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                            {categoryStaff.map((staff) => (
                                                <StaffCard key={staff.name} staff={staff} openStaff={openStaff} setOpenStaff={setOpenStaff}/>
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