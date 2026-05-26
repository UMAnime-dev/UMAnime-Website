"use client"

import { Galleries } from "@/data/gallery/GallerySchema";
import { Events } from "@/data/schedule/EventSchema";
import { authClient } from "@/lib/auth-client"
import { TriangleAlert } from "lucide-react";
import { redirect, RedirectType } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboard({galleries, events, sessionCount} : {galleries : Galleries, events : Events, sessionCount : number}) {

    const { 
        data: session, 
        isPending,
        error,
    } = authClient.useSession() 

    useEffect(() => {
        if (!isPending && error) {
            redirect('/', RedirectType.replace);
        }
    }, [isPending, error])

    if (isPending) {
        return (
            <main className="flex flex-col bg-sidebar w-full min-h-fit ml-3 md:ml-5 mr-4 my-8 rounded-2xl py-9 px-5 sm:px-15">
                <section className="flex flex-col gap-5 sm:flex-row items-center">
                    <h1 className="font-outfit text-2xl font-semibold text-foreground w-fit sm:px-2 text-start">
                        Loading Data. Please wait!
                    </h1>
                </section>
            </main>
        )
    }

    if (!session) {
        return null
    }

    const user = session.user

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const upcomings = events
        .filter((event) => event.startdate >= today)
        .sort((a, b) => a.startdate.getTime() - b.startdate.getTime());

    
    return (
        <main className="flex flex-col bg-sidebar w-full min-h-fit ml-3 md:ml-5 mr-4 my-8 rounded-2xl py-5 px-5 sm:px-15">
            <div className="flex flex-col gap-5 pb-4">
                <h1 className="font-outfit text-2xl font-semibold text-foreground w-fit sm:px-2 text-start py-3">
                    {`Welcome back, ${user.name}`}
                </h1>

                <section className="flex flex-col px-8 py-6 bg-background w-full rounded-2xl shadow-xl shadow-black/50">
                    <h1 className="w-full border-b-2 border-foreground font-outfit text-xl font-bold tracking-wide">
                        Account Summary
                    </h1>
                    <div className="flex flex-col mx-3 sm:mx-10 my-5 gap-3">
                        <div className="flex flex-row w-full">
                            <p className="font-outfit font-bold">
                                Account ID
                            </p>
                            <p className="font-outfit ml-auto">
                                {user.id}
                            </p>
                        </div>
                        <div className="flex flex-row w-full">
                            <p className="font-outfit font-bold">
                                Registered name
                            </p>
                            <p className="font-outfit ml-auto">
                                {user.name}
                            </p>
                        </div>
                        <div className="flex flex-row w-full">
                            <p className="font-outfit font-bold">
                                Email
                            </p>
                            <p className="font-outfit ml-auto">
                                {user.email}
                            </p>
                        </div>
                        <div className="flex flex-row w-full">
                            <p className="font-outfit font-bold">
                                Website Role Privilege
                            </p>
                            <p className="font-outfit ml-auto">
                                {user.role.trim().length > 0 ? user.role : "N/A"}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col px-8 py-6 bg-background w-full rounded-2xl shadow-xl shadow-black/50">
                    <h1 className="w-full border-b-2 border-foreground font-outfit text-xl font-bold tracking-wide">
                        Summary
                    </h1>
                    <div className="flex flex-col mx-3 sm:mx-10 my-5 gap-3">
                        <div className="flex flex-row w-full">
                            <p className="font-outfit font-bold">
                                Total Events
                            </p>
                            <p className="font-outfit ml-auto">
                                {events.length}
                            </p>
                        </div>
                        <div className="flex flex-row w-full">
                            <p className="font-outfit font-bold">
                                Total Galleries
                            </p>
                            <p className="font-outfit ml-auto">
                                {galleries.length}
                            </p>
                        </div>
                        <div className="flex flex-row w-full">
                            <p className="font-outfit font-bold">
                                Upcoming Events
                            </p>
                            <p className="font-outfit ml-auto">
                                {upcomings.length}
                            </p>
                        </div>
                        <div className="flex flex-row w-full">
                            <p className="font-outfit font-bold">
                                Active Admin Sessions
                            </p>
                            <p className="font-outfit ml-auto">
                                {sessionCount}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col px-8 py-6 min-h-60 bg-background w-full rounded-2xl shadow-xl shadow-black/50">
                    <h1 className="w-full border-b-2 border-foreground font-outfit text-xl font-bold tracking-wide">
                        Upcoming Events
                    </h1>
                    <div className={`${upcomings.length == 0 ? "items-center justify-center" : ""} flex flex-col mx-3 sm:mx-10 my-5 gap-3 h-full`}>
                        { upcomings.length > 0 ? 
                            <div className="flex flex-row w-full">
                                { upcomings.slice(0,3).map((event) => {
                                    return (
                                        <div key={event.id} className="flex flex-row items-center w-full gap-5">
                                            <p className="font-outfit font-bold">
                                                {event.name}
                                            </p>
                                            <p className="font-outfit text-xs">
                                                {`Event ID: ${event.id}`}
                                            </p>
                                            <p className="font-outfit ml-auto">
                                                {event.startdate.toDateString()}
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>
                        :
                            <TriangleAlert className="opacity-50 scale-200"/>
                        }
                    </div>
                </section>
            </div>
        </main>
    )
}