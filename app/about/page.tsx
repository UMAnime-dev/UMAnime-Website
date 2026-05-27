import Footer from "../lib/components/footer";
import Navbar from "../lib/components/navbar";

import Image from "next/image";

export default function ClubPage() {
 
    return (
        <main className="relative w-full min-h-screen overflow-x-hidden bg-background flex flex-col">
            <Navbar/>

            <section className="flex flex-col mx-10 sm:mx-20 xl:mx-40">
                <div className="flex flex-col mt-20 w-full items-center md:items-start border-b-2 border-foreground">
                    <h2 className="font-outfit text-2xl md:text-3xl font-semibold text-foreground w-fit px-2 pb-2">
                        What is the UMAnime Club?
                    </h2>
                </div>
                <section className="flex lg:flex-row flex-col my-10 sm:my-8 lg:gap-30 justify-center">
                    <div className="flex items-center justify-center lg:w-150 w-full px-10">
                        <Image src={'/UMAnime.svg'} alt="UMAnime" width={400} height={400}/>
                    </div>
                    
                    <div className="w-full flex flex-col pt-8">
                        <h1 className="text-foreground font-mono text-center tracking-wide font-bold text-3xl">
                            UMAnime Club
                        </h1>
                        <p className="text-foreground font-mono text-center tracking-tight font-normal text-lg italic">
                            (2001-Present)
                        </p>
                        <ul className="list-disc">
                            <li className="mt-3 font-outfit text-[clamp(13px,1.1vw,18px)] text-muted-foreground text-foreground">
                                The UMAnime Club was first established in the year 2001 making the club at least 25 years old!
                            </li>
                            <li className="mt-3 font-outfit text-[clamp(13px,1.1vw,18px)] text-muted-foreground text-foreground">
                                Club was founded by past club executives Kristjanna Thorarinson, Riki Lecotey, Kwan Fu Sit, Tong Lin, Cathleen Ma, Tim Groner, Geoff Wright, and Jeff Agapito.
                            </li>
                            <li className="mt-3 font-outfit text-[clamp(13px,1.1vw,18px)] text-muted-foreground text-foreground">
                                The club focus is still the same as ever to foster a welcoming space for students who share a passion for anime, manga, and Japanese pop culture.
                            </li>
                            <li className="mt-3 font-outfit text-[clamp(13px,1.1vw,18px)] text-muted-foreground text-foreground">
                            The club goal is to create a welcoming space where fans can connect, discover new series, and enjoy their favorite shows together. We believe anime is best enjoyed together, and UMAnime is here to make that experience fun, inclusive, and memorable for everyone.
                            </li>
                        </ul>
                    </div>
                </section>

                <section className="flex lg:flex-row flex-col mt-0 mb-15 sm:mb-10 sm:mt-8 lg:gap-30 lg:justify-center">
                    <div className="flex items-center justify-center lg:w-150 w-full px-10">
                        <Image src={'/Logo.png'} alt="UMAnime" width={400} height={400}/>
                    </div>
                    
                    <div className="w-full flex flex-col px-[clamp(30px,4.5vw,55px)] lg:px-0">
                        <h1 className="text-foreground font-mono text-center font-bold text-3xl">
                            Club Origins
                        </h1>
                        <ul className="list-disc">
                            <li className="mt-3 font-outfit text-[clamp(13px,1.1vw,18px)] text-muted-foreground text-foreground">
                                The UMAnime Club was first established in the year 2001 making the club at least 25 years old!
                            </li>
                            <li className="mt-3 font-outfit text-[clamp(13px,1.1vw,18px)] text-muted-foreground text-foreground">
                                The club was founded by its first executives Kristjanna Thorarinson, Riki Lecotey, Kwan Fu Sit, Tong Lin, Cathleen Ma, Tim Groner, Geoff Wright, and Jeff Agapito.
                            </li>
                            <li className="mt-3 font-outfit text-[clamp(13px,1.1vw,18px)] text-muted-foreground text-foreground">
                                They were also the first to create a local anime convention for a bigger scale which was and currently known as &quot;Ai-Kon&quot; and was first ever held in July 2001 at the University of Manitoba holding around 500 attendees.
                                <ul className="list-disc pl-5 mt-2">
                                    <li className="mt-3 font-outfit text-[clamp(13px,1.1vw,18px)] text-muted-foreground text-foreground">
                                        Now it is the biggest anime convention in Winnipeg, Manitoba with over 10,000 attendees!
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </section>
            </section>
            <Footer/>
        </main>
    )
}