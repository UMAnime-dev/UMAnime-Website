import Footer from "../lib/components/footer";
import Navbar from "../lib/components/navbar";

import Image from "next/image";

export default function ClubPage() {
 
    return (
        <main className="relative w-full min-h-screen overflow-x-hidden bg-background gap-15 flex flex-col">
            <Navbar/>
            
            <div className="flex flex-col mt-20 md:ml-35 w-full items-center md:items-start">
                <h2 className="font-outfit text-[clamp(24px,2.5vw,36px)] font-semibold text-foreground border-l-4 border-header-border w-fit px-2">
                    What is the UMAnime Club?
                </h2>
            </div>
            <section className="flex lg:flex-row flex-col lg:mx-50 my-5 lg:gap-30 justify-center">
                <div className="flex items-center justify-center lg:w-150 w-full px-10">
                    <Image src={'/UMAnime.svg'} alt="UMAnime" width={400} height={400}/>
                </div>
                
                <div className="w-full flex flex-col px-[clamp(30px,4.5vw,55px)] lg:px-0 pt-5">
                    <h1 className="text-foreground font-mono text-center tracking-tight font-bold text-[clamp(30px,2vw,36px)] lg:text-[clamp(30px,3vw,48px)]">
                        UMAnime Club (2001-Present)
                    </h1>
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

            <section className="flex lg:flex-row flex-col lg:mx-50 my-20 lg:gap-30 lg:justify-center">
                <div className="flex items-center justify-center lg:w-150 w-full px-10">
                    <Image src={'/Logo.png'} alt="UMAnime" width={400} height={400}/>
                </div>
                
                <div className="w-full flex flex-col px-[clamp(30px,4.5vw,55px)] lg:px-0">
                    <h1 className="text-foreground font-mono text-center tracking-tight font-bold text-[clamp(30px,0.5vw,30px)] lg:text-[clamp(30px,3vw,48px)]">
                        Forgotten fact about UMAnime Club
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

            <Footer/>
        </main>
    )
}