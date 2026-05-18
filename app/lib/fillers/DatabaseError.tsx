"use client"

import Image from "next/image"

export default function EmptyEvents() {
    return (
        <section className="mt-20 px-6 sm:px-10 md:px-15 lg:px-[clamp(60px,9.25vw,130px)] xl:px-35 2xl:px-50">
            <h2 className="font-outfit text-[clamp(16px,2.5vw,28px)] font-semibold text-foreground border-l-4 border-header-border w-fit px-2">
                Upcoming Events!
            </h2>

            <div className="flex flex-col text-center mb-5 mt-17 items-center">
                <h2 className="font-outfit text-4xl md:text-5xl font-semibold text-foreground w-fit px-2">
                    🚧 THE HECK-?! 🚧
                </h2>
                <p className="mt-5 font-outfit font-normal">
                    {"Database ERROR?? HOW IS THIS POSSIBLE!! 😤😡🤬"}
                </p>
            </div>
            <div className="flex flex-col items-center w-full px-10 md:px-40 min-h-full text-center">

                <p className="mt-3 font-outfit font-normal">
                    Do not panic! Our engineers have been notified and will work on a fix as soon as possible!
                </p>
                <p className="mt-3 font-outfit font-normal">
                    Im no programmer... So I sadly cannot work on this... I would get in trouble if I do!
                </p>
                <p className="mt-10 font-outfit font-normal">
                    Come back later when our friendly technicians have fixed this error! 💙💙
                </p>
                <p className="mt-10 font-outfit font-normal">
                    - Yukari Haruno
                </p>

                <Image src={'/YukariProfile.png'} alt="YUKARI" width={300} height={300} loading="eager" className="mt-10"/>
            </div>
        </section>
    )
}