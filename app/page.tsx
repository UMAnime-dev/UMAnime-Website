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
        height={10}
        className="w-full h-[clamp(600px,40vw,800px)] object-cover"
        priority
      />
    </main>
  );
}
