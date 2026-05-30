"use client"

import Footer from "@/app/lib/components/footer";
import Navbar from "@/app/lib/components/navbar";

import Membership_Banner from "@/public/Membership_Banner.png";
import Yukari from "@/public/YukariProfile.png"

import card_front from '@/public/UMAnime_Membership_Card.png'
import card_back from '@/public/UMAnime_Membership_Card_Back.png'

import card_24 from '@/public/UMAnime_Membership_Card_24.jpg'

import Image from 'next/image';

import { Varela_Round } from "next/font/google";
import { useRouter } from "next/navigation";

import { redirects } from "@/config/redirects";
import { useState } from "react";

const varela = Varela_Round({
    weight: ['400']
});

export default function MembershipInfo() {

    const router = useRouter()
    const [flipped, setFlipped] = useState(false);

    return(
        <main className="relative w-full min-h-screen overflow-x-hidden bg-background">
            <Navbar/>
                <div className="flex flex-col items-center relative w-full pb-10">
                    <Image 
                        src={Membership_Banner} 
                        alt="UM Anime Club Banner" 
                        fill
                        className="absolute inset-0 object-center object-cover opacity-50" 
                        priority 
                        sizes="100vw" 
                    />
                    <div className="flex my-5 md:my-0 flex-col md:flex-row items-center justify-between relative w-full min-h-100 px-4 sm:px-8 lg:px-20 xl:px-40 gap-8 overflow-hidden">
                        <div className="flex flex-col z-10 gap-2.5 text-center md:text-left">
                            <h2 className={`relative font-outfit text-2xl md:text-4xl font-semibold text-foreground w-fit mx-auto md:mx-0`}>
                                University of Manitoba Anime Club
                            </h2>

                            <h2 className={`relative ${varela.className} text-xl md:text-3xl text-foreground w-fit mx-auto md:mx-0`}>
                                Membership
                            </h2>

                            <p className="font-outfit text-sm md:text-lg">
                                Join us! We want your money to personally use! :D
                            </p>

                            <div className="flex flex-row justify-center md:justify-start gap-1">
                                <h2 className="relative text-xl md:text-3xl font-extrabold text-foreground w-fit">
                                    $15.00
                                </h2>
                                <p className="min-h-full text-xs italic font-outfit my-1">
                                    CAD
                                </p>
                            </div>

                            <button className="w-35 h-10 bg-navbar-join text-black font-outfit font-bold rounded-lg cursor-pointer hover:bg-navbar-join-hover mt-2 mx-auto md:mx-0">
                                Register now!
                            </button>
                        </div>

                        <div className="relative w-48 h-64 sm:w-56 sm:h-72 md:w-72 md:h-96">
                            <Image
                                src={Yukari}
                                alt="Yukari Photo"
                                fill
                                className="object-contain object-center"
                                priority
                                sizes="100vw"
                            />
                        </div>
                    </div>
                    <section className="flex flex-col w-[calc(100%-4rem)] md:w-[calc(100%-10rem)] max-w-7xl mx-auto z-2 bg-navbar rounded-xl p-4 sm:p-6 md:p-7 gap-4 outline-2 outline-solid outline-foreground">
                        <div className="flex flex-col">
                            <div className={`w-full font-medium font-outfit text-xl tracking-wider`}>
                                Exclusive discounts at sponsor locations!
                            </div>

                            <p>
                                Enjoy exclusive discounts and special offers from our trusted sponsors. Your membership gives you access to savings on products, services, and experiences selected just for our community.
                            </p>

                            <button className="mt-2 w-fit rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition cursor-pointer hover:opacity-80"
                                onClick={() => router.push('/sponsors')}>
                                Sponsors List
                            </button>
                        </div>
                        <div className="flex flex-col">
                            <div className={`w-full font-medium font-outfit text-xl tracking-wider`}>
                                Access to our membership-exclusive events!
                            </div>
                            <p>
                                Get access to our membership exclusive events to foster our gratefulness towards the community! Moreover, get prioritize entry on non exclusive events including RSVPs!
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <div className={`w-full font-medium font-outfit text-xl tracking-wider`}>
                                Contribute to the future of the club!
                            </div>
                            <p>
                                Every membership is a step towards better quality and frequent events, so register now!
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <div className={`w-full font-medium font-outfit text-xl tracking-wider`}>
                                Friendships along the way!
                            </div>
                            <p>
                                UMAnime is a place to join and get to know other people from different areas!
                            </p>
                        </div>
                    </section>

                    <section className="flex flex-col w-[calc(100%-4rem)] md:w-[calc(100%-10rem)] max-w-7xl mx-auto z-2 bg-navbar rounded-xl px-4 sm:px-6 md:px-7 pt-5 pb-7 gap-4 outline-2 outline-solid outline-foreground mt-6 md:mt-10">
                        <div className="flex flex-col">
                            <h2 className={`relative font-outfit text-xl md:text-3xl font-semibold text-foreground text-center w-full pb-5`}> 
                                Frequently Asked Questions
                            </h2>
                            <div className={`w-full font-medium font-outfit text-xl tracking-wider`}>
                                Q: How long does membership last for?
                            </div>
                            <p>
                                A: Memberships are active from May 1st until April 30th when the membership was bought!
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <div className={`w-full font-medium font-outfit text-xl tracking-wider`}>
                                Q: How can we purchase a membership?
                            </div>
                            <p>
                                A: You can do so online via this website by clicking on the button at the top of the page to register or you can personally buy them in-person during our events.
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <div className={`w-full font-medium font-outfit text-xl tracking-wider`}>
                                Q: Do I have to be a university student to buy a membership?
                            </div>
                            <p>
                                A: Nope! Membership and club is open to all in and outside affiliations of the University of Manitoba.
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <div className={`w-full font-medium font-outfit text-xl tracking-wider`}>
                                Q: Where do I find upcoming events?
                            </div>
                            <p>
                                {`A: You can find upcoming events through the website in the "Schedule View" page or in our Discord.`}
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <div className={`w-full font-medium font-outfit text-sm tracking-wider text-center`}>
                                {`Any questions that was not answered in this FAQ, please check out our 'Contact Us' page`}
                            </div>

                            <div className="flex flex-row items-center justify-center">
                                <button className="mt-2 w-fit rounded-lg bg-foreground px-4 py-2 text-sm font-bold font-outfit text-background transition cursor-pointer hover:opacity-80"
                                    onClick={() => router.push(redirects.contact)}>
                                    Contact Us
                                </button>
                            </div>
                        </div>
                    </section>

                    <section className="flex flex-col w-[calc(100%-4rem)] md:w-[calc(100%-10rem)] max-w-7xl mx-auto z-2 bg-navbar rounded-xl px-4 sm:px-6 md:px-7 pt-5 pb-7 gap-4 outline-2 outline-solid outline-foreground mt-6 md:mt-10">
                        <div className="flex flex-col">
                            <h2 className={`relative font-outfit text-xl md:text-3xl font-semibold text-foreground text-center w-full pb-5`}> 
                               Club Membership Card Designs
                            </h2>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-10">
                            <section className="flex flex-col justify-center items-center gap-2">
                                <div className="w-full font-medium font-outfit text-xl tracking-wider text-center">
                                    Version. 2024 - 2025
                                </div>

                                <div className="relative w-45 h-70 overflow-hidden rounded-lg">
                                    <Image
                                        src={card_24}
                                        alt="25-26 card"
                                        fill
                                        className="object-cover object-center"
                                        priority
                                        sizes="(max-width: 768px) 128px, 160px"
                                    />
                                </div>

                                <p className="font-outfit text-sm">
                                    Artist: Luvi
                                </p>
                            </section>

                            <section className="flex flex-col justify-center items-center gap-2">
                                <div className="font-medium font-outfit text-xl tracking-wider">
                                    Version. 2025 - 2026
                                </div>

                                <div
                                    className="relative w-45 h-70 cursor-pointer perspective-[1000px]"
                                    onClick={() => setFlipped(!flipped)}
                                >
                                    <div
                                        className={`relative w-full h-full duration-700 transform-style-preserve-3d ${flipped ? "rotate-y-180" : ""}`}
                                    >
                                        <div className="absolute inset-0 backface-hidden rounded-lg overflow-hidden">
                                            <Image
                                                src={card_front}
                                                alt="Front Card"
                                                fill
                                                className="object-cover"
                                                priority
                                            />
                                        </div>

                                        <div className="absolute inset-0 rotate-y-180 backface-hidden rounded-lg overflow-hidden">
                                            <Image
                                                src={card_back}
                                                alt="Back Card"
                                                fill
                                                className="object-cover brightness-100"
                                                priority
                                            />
                                        </div>
                                    </div>
                                </div>

                                <p className="font-outfit text-sm">Artist: Arya-Ender</p>
                            </section>
                        </div>
                    </section>
                </div>
            <Footer/>
        </main>
    )
}