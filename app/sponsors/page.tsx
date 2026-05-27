"use client"

import { useState } from "react";
import Footer from "../lib/components/footer";
import Navbar from "../lib/components/navbar";

import SponsorCard from "../lib/components/SponsorshipCard";
import { sponsors } from "@/data/sponsor";

export default function SponsorPage() {

    const [openSponsor, setOpenSponsor] = useState<string | null>(null);
    
    return (
        <>
            <main className="relative w-full min-h-screen overflow-x-hidden bg-background">
                <Navbar/>
                    <div className="flex flex-col text-center mt-17 items-center">
                        <h2 className="font-outfit text-4xl md:text-5xl font-semibold text-foreground w-fit px-2">
                            Club Sponsorships
                        </h2>
                        <section key="desc" className="flex flex-col gap-5 pt-15 mx-10 md:mx-40 lg:mx-50 text-start">
                            <p className="font-outfit md:text-base text-foreground w-full">
                                Here is our list of our sponsors for the year 2025-2026. These sponsors are who have supported our events through the year and truly deserve their recognition.
                                Sponsorship details & discount instructions can be found when you click on a sponsor button.
                                Present your club membership card at these locations before transaction to gain access to the discounts we state here!
                            </p>
                            <p className="font-outfit md:text-base text-foreground w-full">
                                The sponsorship discounts are valid until September 2026.
                            </p>
                        </section>
                        <div className="w-full px-6 sm:px-10 md:px-20 lg:px-[clamp(100px,9.85vw,190px)] my-15">
                            <div className="grid gap-9 sm:grid-cols-2 md:grid-cols-3">
                                {sponsors.map((sponsor) => (
                                    SponsorCard({sponsor, openSponsor, setOpenSponsor})
                                ))}
                            </div>
                        </div>

                        
                    </div>

                    <section key="desc" className="flex flex-col gap-5 pb-15 mx-10 lg:mx-55 text-start">
                        <p className="font-outfit md:text-md font-semibold text-foreground w-full">
                            Interested in become one of our sponsors? We are always looking for more sponsors to support our club and events! If you are interested in becoming a sponsor, please contact us!
                        </p>
                    </section>
                    
                <Footer/>
            </main>
        </>
    )
}