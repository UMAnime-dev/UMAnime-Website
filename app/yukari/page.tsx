import Footer from "../lib/components/footer";
import Navbar from "../lib/components/navbar";

import Image from "next/image";

export default function AboutYukari() {
    return (
        <main className="relative w-full min-h-screen overflow-x-hidden bg-background">
            <Navbar/>
            
            <div className="flex flex-col mt-20 mb-20 md:ml-35 w-full items-center md:items-start">
                <h2 className="font-outfit text-[clamp(24px,2.5vw,36px)] font-semibold text-foreground border-l-4 border-header-border w-fit px-2">
                    Meet the face of UMAnime!
                </h2>
            </div>
            <section className="flex md:flex-row flex-col md:mx-50 my-20 md:gap-30 md:justify-center">
                <div className="flex items-center justify-center md:w-150 w-full">
                    <Image src={'/YukariProfile.png'} alt="YUKARI" width={400} height={400}/>
                </div>
                
                <div className="w-full flex flex-col items-center text-center px-[clamp(15px,4vw,30px)]">
                    <h1 className="text-foreground font-mono text-center tracking-tight font-bold text-[clamp(30px,2vw,48px)] md:text-5xl">
                        YUKARI HARUNO
                    </h1>
                    <p className="mt-3 font-outfit text-[clamp(13px,1.1vw,18px)] text-muted-foreground text-foreground italic">
                        Japanese Name: ゆかり はるの
                    </p>
                    <p className="mt-5 font-outfit text-[clamp(13px,1.1vw,18px)] text-muted-foreground text-foreground">
                        Age: 18
                    </p>
                    <p className="font-outfit text-[clamp(13px,1.1vw,18px)] text-muted-foreground text-foreground">
                        Birthday: September 21
                    </p>
                    <p className="font-outfit text-[clamp(13px,1.1vw,18px)] text-muted-foreground text-foreground">
                        Favorite Food: Cheesecake
                    </p>
                    <p className="mt-5 font-outfit text-[clamp(13px,1.1vw,18px)] text-muted-foreground text-foreground">
                        She hopes to make all UMAnime members and all happy with her charming presence!
                    </p>
                    <p className="mt-10 font-outfit text-[clamp(13px,1.1vw,18px)] text-muted-foreground text-foreground">
                        Artist(s): Prothoma, Melissa, Melinda, Arya
                    </p>
                </div>
            </section>

            <Footer/>
        </main>
    )
}