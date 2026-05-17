"use client"

import Navbar from "./lib/components/navbar";
import Image from "next/image"
import { redirect, RedirectType } from "next/navigation";
import Footer from "./lib/components/footer";

export default function Home() {

  const samples = [
    {
      title: "Semester Icebreaker",
      desc: "Relax and meet new people at our semester icebreaker event! Join us for fun games, delicious snacks, and great company as we kick off the new semester together. Whether you're a returning member or new to the club, this is the perfect opportunity to connect with fellow anime enthusiasts and make lasting friendships. Don't miss out on the fun – see you there!",
      img: "/eventSamples/icebreaker.jpg",
      link: "/events/icebreaker"
    },
    {
      title: "Gunpla Build Night",
      desc: "Unleash your creativity at our Gunpla Build Night! Join us for an evening of fun and camaraderie as we build and customize Gundam model kits together. Whether you're a seasoned builder or new to the hobby, this event is perfect for all skill levels. Bring your own kits or use our supplies to create your masterpiece. Don't miss out on the fun – see you there!",
      img: "/eventSamples/gunpla.jpg",
      link: "/events/gunpla"
    },
    {
      title: "Halloween Party",
      desc: "Spook out the competition at our Halloween Party! Join us for a night of frights and fun as we celebrate the spookiest night of the year. Dress up in your best costume, enjoy delicious treats, and participate in exciting contests. Whether you're a fan of ghosts, ghouls, or just love a good scare, this is the perfect opportunity to show off your creativity and have a blast. Don't miss out on the fun – see you there!",
      img: "/eventSamples/halloween.jpg",
      link: "/events/halloween"
    },
    {
      title: "Anime Screening Events",
      desc: "Join us for our Anime Screening Events! Experience the magic of anime on the big screen with fellow fans. We host regular screenings of popular and classic anime series. Whether you're a long-time fan or new to anime, this is the perfect opportunity to discover new shows and enjoy your favorites with great company. Don't miss out on the fun – see you there!",
      img: "/eventSamples/screening.jpg",
      link: "/events/screening"
    },
    {
      title: "School Festival",
      desc: "Experience the excitement of our School Festival! Join us for a day filled with fun activities, delicious food, and great company as we celebrate our love for anime and Japanese culture. From cosplay contests to game tournaments, there's something for everyone to enjoy. Don't miss out on the fun – see you there!",
      img: "/eventSamples/festival.jpg",
      link: "/events/festival"
    },
    {
      title: "End-of-year Party",
      desc: "Celebrate the end of the year with us at our End-of-year Party! Join us for a night of fun and festivities as we reflect on the past year and look forward to the future. Enjoy delicious food, exciting activities, and great company as we wrap up another successful semester. Don't miss out on the fun – see you there!",
      img: "/eventSamples/endyear.jpg",
      link: "/events/endyear"
    },
  ];

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden bg-background">
      <Navbar/>
      <Image
        src="/UMAnime_banner.svg"
        alt="UM Anime Club Banner"
        width={1920}
        height={1080}
        className="w-full h-auto max-h-190 object-center object-cover"
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
              className="h-auto w-full object-cover border-6 border-navbar-dropdown"
              priority
            />
          </div>
        </div>
      </section>

      <section className="w-full px-6 pb-12 sm:px-10 sm:pb-16 lg:px-[clamp(40px,6vw,80px)] lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="font-outfit text-[clamp(24px,2.5vw,36px)] font-semibold text-foreground">
              Our Events
            </h2>
            <p className="mt-3 font-outfit text-[clamp(14px,1.2vw,18px)] text-muted-foreground">
              Join us during our events we host for the public and our beloved members!
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {samples.map((sample, i) => (
              <article key={i}
                className="overflow-hidden rounded-2xl bg-navbar-dropdown shadow-xl transition hover:scale-[1.02] hover:shadow-2xl/100 hover:shadow-foreground/40"
              >
                <div className="relative h-70 w-full">
                  <Image
                    src={sample.img}
                    alt={sample.title}
                    width={1920}
                    height={1080}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col justify-between p-6">
                <div>
                  <h3 className="font-outfit text-[clamp(18px,1.5vw,22px)] font-semibold text-foreground">
                    {sample.title}
                  </h3>
                  <p className="mt-4 font-outfit text-[clamp(14px,1.1vw,16px)] leading-relaxed text-foreground">
                    {sample.desc}
                  </p>
                </div>

                <button className="mt-6 w-fit rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition cursor-pointer hover:opacity-80"
                  onClick={() => {redirect(sample.link, RedirectType.push)}}>
                  Learn More
                </button>
              </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      
      <Footer/>
    </main>
  );
}
