import { StaffMember } from "@/data/staff";
import Image from "next/image";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

import { X } from 'lucide-react';

export default function StaffCard({staff}: {staff: StaffMember}) {

    const [bio, setBio] = useState<string>("")
    const [fullShow, setFull] = useState<boolean>(false)

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch(staff.bio);
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
    }, []);


    return (
        <article key={staff.name}
        className={`${fullShow ? "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-999 min-w-100 min-h-100" : "transition-[scale] hover:scale-[1.02] hover:shadow-foreground/25 max-h-[520px] cursor-pointer"} overflow-hidden rounded-2xl bg-navbar-dropdown shadow-2xl/100 shadow-black flex flex-col`}
        onClick={() => {
            setFull(true)
        }}
        >
            {fullShow && (
            <button
                className="absolute top-2 right-2 cursor-pointer z-999 p-2"
                onClick={(e) => {
                e.stopPropagation();
                setFull(false);
                }}
            >
                <X />
            </button>
            )}
            <div className="relative w-full flex items-center justify-center pt-8">
                <div className="relative w-45 h-45 rounded-full overflow-hidden">
                    <Image
                        src={staff.photoUrl}
                        alt={staff.name}
                        width={1024}
                        height={1024}
                        className="object-cover"
                    />
                </div>
            </div>
            <div className="flex flex-col justify-between p-6 text-foreground overflow-hidden text-ellipsis">
                <div>
                    <h2 className="font-outfit text-[clamp(18px,1.5vw,22px)] font-bold! text-foreground text-center">
                        {staff.name}
                    </h2>
                    <h3 className="font-outfit text-[clamp(15px,0.89vw,17px)] font-light! text-foreground text-center tracking-[0.35px]">
                        {staff.position}
                    </h3>
                    <div className={`markdown-content mt-3 ${fullShow ? "" : "line-clamp-8"}`}>
                        <Markdown>{bio}</Markdown>
                    </div>
                </div>
            </div>
        </article>
    )
}