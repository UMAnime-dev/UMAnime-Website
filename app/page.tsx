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
      <section className="flex flex-col lg:flex-row items-center justify-center w-full px-6 sm:px-10 lg:px-[clamp(40px,11vw,200px)] py-12 sm:py-16 lg:py-20 gap-8 lg:gap-[clamp(40px,8vw,120px)]">
        <div className="relative flex flex-col items-center gap-5 w-full max-w-md max-h-[600px] bg-navbar-dropdown p-5 shadow-2xl/100">
          <Image
            src="/Flower.svg"
            alt="UM Anime Club Banner"
            width={1920}
            height={1080}
            className="w-[clamp(50px,4vw,80px)] h-auto absolute top-0 left-0 -translate-x-1/5 -translate-y-1/5 rotate-90 opacity-90"
            priority
          />
          <Image
            src="/Flower.svg"
            alt="UM Anime Club Banner"
            width={1920}
            height={1080}
            className="w-[clamp(50px,4vw,80px)] h-auto absolute top-0 right-0 translate-x-1/5 -translate-y-1/5 rotate-180 opacity-90"
            priority
          />
          <h1 className="text-[clamp(15px,2vw,28px)] font-semibold font-outfit text-foreground text-center">Who We Are</h1>
          <p className="font-outfit font-light text-sm sm:text-base">
            The UMAnime is a community for students who share a passion for anime, manga, and Japanese pop culture. Our goal is to create a welcoming space where fans can connect, discover new series, and enjoy their favorite shows together. We believe anime is best enjoyed together, and UMAnime is here to make that experience fun, inclusive, and memorable for everyone.
          </p>
        </div>

        <Image
          src="/UMStaff.jpg"
          alt="UM Anime Club Staff"
          width={1920}
          height={1080}
          className="w-full max-w-2xl h-auto lg:ml-auto"
          priority
        />
      </section>
    </main>
  );
}
