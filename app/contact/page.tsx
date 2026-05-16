import Footer from "../lib/components/footer"
import Navbar from "../lib/components/navbar"

import Image from "next/image"

export default function ContactPage() {
    return (
        <>
            <main className="flex flex-col w-full min-h-screen overflow-x-hidden bg-background">
                <Navbar/>
                    <section className="flex-1">
                        <div className="flex flex-col text-center mb-5 mt-17 items-center">
                            <h2 className="font-outfit text-4xl md:text-5xl font-semibold text-foreground w-fit px-2">
                                Contact Us
                            </h2>
                        </div>
                        <div className="flex flex-col items-center w-full px-10 md:px-60 min-h-full text-center mb-17 md:mb-14">

                            <p className="mt-10 font-outfit font-medium">
                                {"If you have any general inquires or concerns regarding the club, please send an email to us at "}
                                <a href="mailto:umanimeclub@gmail.com" className="hover:underline text-navbar-join-hover">umanimeclub@gmail.com</a>
                            </p>

                            <p className="mt-10 font-outfit font-medium">
                                {"If you have any social media inquires or concerns regarding the club's social accounts, please send us a message at our "}
                                <a href="https://www.instagram.com/umanimeclub/" className="hover:underline text-navbar-join-hover">Instagram account</a>
                            </p>

                            <p className="mt-10 font-outfit font-medium">
                                {"If you wish to personally connect with a staff, you may also do so in our official "}
                                <a href="https://discord.gg/G52Wn6a" className="hover:underline text-navbar-join-hover">Discord Server</a>
                            </p>

                            <p className="flex flex-row items-center justify-center gap-3 md:gap-5 mt-20 font-outfit font-bold text-xl md:text-3xl">
                                {"2026 UM Anime Club. All rights reserved."}
                            </p>

                            <Image src={'/YukariProfile.png'} alt="YUKARI" width={300} height={300} loading="eager" className="mt-10"/>
                        </div>
                    </section>
                <Footer/>
            </main>
        </>
    )
}