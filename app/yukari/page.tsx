import Footer from "../lib/components/footer";
import Navbar from "../lib/components/navbar";

import Image from "next/image";
import Yukari from "@/public/YukariProfile.png"

export default function AboutYukari() {
    return (
        <main className="relative w-full min-h-screen overflow-x-hidden bg-background">
            <Navbar/>
            
            <section className="flex flex-col mx-10 sm:mx-20 xl:mx-40">
                <div className="flex mt-20 w-full justify-center md:justify-start border-b-2 border-foreground">
                    <h2 className="font-outfit text-2xl md:text-3xl font-semibold text-foreground w-fit px-2 pb-2">
                        Meet the face of UMAnime !
                    </h2>
                </div>
                <section className="flex lg:flex-row flex-col my-20 gap-10 lg:gap-40 lg:justify-center">
                    <div className="flex flex-col items-center justify-center lg:w-150 w-full">
                        <Image 
                            src={Yukari} 
                            alt="UMAnime" 
                            width={380}
                            priority={true}
                            loading="eager"
                            unoptimized={true} 
                        />
                        <p className="font-outfit text-[clamp(13px,1.1vw,18px)] text-muted-foreground text-foreground">
                            Artist(s): Prothoma, Melissa, Melinda, Arya
                        </p>
                    </div>
                    
                    <div className="w-full flex flex-col items-start gap-1 text-start">
                        <h1 className="text-foreground font-mono text-center tracking-tight font-bold text-[clamp(30px,2vw,48px)] lg:text-5xl">
                            YUKARI HARUNO
                        </h1>
                        <p className="mt-3 font-outfit text-[clamp(13px,1.1vw,18px)] text-muted-foreground text-foreground italic">
                            Japanese Name: ゆかり はるの
                        </p>
                        <p className="mt-5 font-outfit text-[clamp(13px,1.1vw,18px)] text-muted-foreground text-foreground">
                            Age: 19
                        </p>
                        <p className="font-outfit text-[clamp(13px,1.1vw,18px)] text-muted-foreground text-foreground">
                            Sex: Female
                        </p>
                        <p className="font-outfit text-[clamp(13px,1.1vw,18px)] text-muted-foreground text-foreground">
                            Birthday: February 28 (Pisces)
                        </p>
                        <p className="font-outfit text-[clamp(13px,1.1vw,18px)] text-muted-foreground text-foreground">
                            Blood type: O+
                        </p>
                        <p className="font-outfit text-[clamp(13px,1.1vw,18px)] text-muted-foreground text-foreground">
                            Appearance: Average height and build with pale warm-toned skin, she has an aloofness feel about her. She has round sparking, blue eyes, thin lips and a flat button nose. She has long, straight, silky baby blue hair, cut in the hime style.
                        </p>

                        <p className="mt-5 font-outfit text-[clamp(13px,1.1vw,18px)] text-muted-foreground text-foreground">
                            Education: Undergraduate. Majoring in Labor Studies and has a minor in Sociology.
                        </p>
                        <p className="font-outfit text-[clamp(13px,1.1vw,18px)] text-muted-foreground text-foreground">
                            Marital Status: Single
                        </p>
                        <p className="mt-5 font-outfit text-[clamp(13px,1.1vw,18px)] text-muted-foreground text-foreground">
                            Favorite Food: Cheesecake
                        </p>
                        <p className="mt-5 font-outfit text-[clamp(13px,1.1vw,18px)] text-muted-foreground text-navbar-join">
                            She hopes to make all UMAnime members and all happy with her charming presence!
                        </p>
                    </div>
                </section>
            </section>
            

            <Footer/>
        </main>
    )
}