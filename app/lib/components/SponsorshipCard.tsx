import { Sponsor } from "@/data/sponsor";
import Image from "next/image";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

import { X } from 'lucide-react';
import remarkBreaks from "remark-breaks";

export default function SponsorCard({
  sponsor,
  openSponsor,
  setOpenSponsor
}: {
  sponsor: Sponsor
  openSponsor: string | null;
  setOpenSponsor: (name: string | null) => void;
}) {

    const [bio, setBio] = useState<string>("")
    const fullShow = openSponsor === sponsor.name;

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch(sponsor.bio);
                if (!res.ok) {
                    setBio("Failed to load bio.");
                    return;
                }
                const text = await res.text();
                setBio(text);
            } catch (err) {
                console.error("Failed to load markdown:", err);
            }
        }

        load();
    }, [sponsor.bio]);


    return (
        <article key={sponsor.name}
        className={`${fullShow ? "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-999 max-h-[80vh] w-[clamp(400px,70vw,900px)] md:w-[40%] max-w-150" : "transition-[scale] hover:scale-[1.02] hover:shadow-foreground/25 max-h-130 cursor-pointer overflow-hidden max-w-100"} overflow-hidden rounded-2xl bg-navbar-dropdown shadow-2xl/100 shadow-black flex flex-col`}
        onClick={() => {
            setOpenSponsor(sponsor.name)
        }}
        >
            {fullShow && (
            <button
                className="absolute top-2 right-2 cursor-pointer z-999 p-2"
                onClick={(e) => {
                e.stopPropagation();
                setOpenSponsor(null)
                }}
            >
                <X />
            </button>
            )}
            <div className="relative w-full flex items-center justify-center pt-8 select-none">
                <div className="relative w-25 h-25 rounded-full overflow-hidden">
                    <Image
                        src={sponsor.photoUrl}
                        alt={sponsor.name}
                        width={1024}
                        height={1024}
                        className="object-cover"
                    />
                </div>
            </div>
            <div className={`flex flex-col justify-between p-6 text-foreground ${fullShow ? "overflow-y-auto" : "overflow-hidden text-ellipsis"}`}>
                <div>
                    <h2 className="font-outfit text-[clamp(18px,1.5vw,22px)] font-bold! text-foreground text-center">
                        {sponsor.name}
                    </h2>
                    <div className={`text-start markdown-content mt-3 ${fullShow ? "" : "hidden"}`}>
                        <Markdown remarkPlugins={[remarkBreaks]}>{bio}</Markdown>
                    </div>
                </div>
            </div>
        </article>
    )
}