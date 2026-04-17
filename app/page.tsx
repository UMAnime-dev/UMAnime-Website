import Navbar from "./lib/components/navbar";
import Image from "next/image"

export default function Home() {

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden bg-background">
      <Navbar/>
      <Image
        src="/UMAnime_banner.svg"
        alt="UM Anime Club Banner"
        width={1920}
        height={1080}
        className="w-full h-auto object-center object-cover"
        priority
      />
      <section className="w-full px-6 py-12 sm:px-10 sm:py-16 lg:px-[clamp(40px,6vw,80px)] lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 lg:flex-row lg:justify-center lg:gap-[clamp(40px,8vw,120px)]">
          <div className="relative w-full max-w-md bg-navbar-dropdown p-6 shadow-2xl">
            <Image
              src="/Flower.svg"
              alt=""
              width={80}
              height={80}
              aria-hidden="true"
              className="absolute left-0 top-0 h-auto w-[clamp(50px,4vw,80px)] -translate-x-1/5 -translate-y-1/5 rotate-90 opacity-90"
            />
            <Image
              src="/Flower.svg"
              alt=""
              width={80}
              height={80}
              aria-hidden="true"
              className="absolute right-0 top-0 h-auto w-[clamp(50px,4vw,80px)] translate-x-1/5 -translate-y-1/5 rotate-180 opacity-90"
            />

            <h2 className="mb-4 text-center font-outfit text-[clamp(20px,2vw,28px)] font-semibold text-foreground">
              Who We Are
            </h2>

            <p className="font-outfit text-[clamp(14px,1.1vw,16px)] leading-relaxed text-foreground">
              UMAnime is a community for students who share a passion for anime, manga,
              and Japanese pop culture. Our goal is to create a welcoming space where
              fans can connect, discover new series, and enjoy their favorite shows
              together. We believe anime is best enjoyed together, and UMAnime is here
              to make that experience fun, inclusive, and memorable for everyone.
            </p>
          </div>

          <div className="w-full max-w-2xl">
            <Image
              src="/UMStaff.jpg"
              alt="UM Anime Club staff group photo"
              width={1920}
              height={1080}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>
    </main>
  );
}
