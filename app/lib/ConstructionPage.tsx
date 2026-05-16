import Link from "next/link"
import Footer from "../lib/components/footer"
import Navbar from "../lib/components/navbar"

import Image from "next/image"

export default function ConstructionPage() {
    return (
        <>
            <main className="flex flex-col w-full min-h-screen overflow-x-hidden bg-background">
                <Navbar/>
                    <section className="flex-1 mx-10">
                        <div className="flex flex-col text-center mb-5 mt-17 items-center">
                            <h2 className="font-outfit text-4xl md:text-5xl font-semibold text-foreground w-fit px-2">
                                🚧 Oopsie! 🚧
                            </h2>
                            <p className="mt-5 font-outfit font-normal">
                                {"This page is still being built with love and anime magic ✨"}
                            </p>
                        </div>
                        <div className="flex flex-col items-center w-full px-10 md:px-60 min-h-full text-center mb-17 md:mb-14">

                            <p className="mt-10 font-outfit font-normal">
                                We are working hard behind the scenes to finish it soon.
                            </p>
                            <p className="mt-1 font-outfit font-normal">
                                Thanks for being patient - we cannot wait to show you!
                            </p>
                            <p className="mt-10 font-outfit font-normal">
                                See you again soon 💖
                            </p>
                            <Link href="/" className=" mt-10 hover:underline text-navbar-join-hover font-bold">Click here to head back home!</Link>


                            <Image src={'/YukariProfile.png'} alt="YUKARI" width={300} height={300} loading="eager" className="mt-10"/>
                        </div>
                    </section>
                <Footer/>
            </main>
        </>
    )
}