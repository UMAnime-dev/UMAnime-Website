"use client"

import { Members } from "@/data/membership/MembershipSchema";
import { authClient } from "@/lib/auth-client";
import { BadgeCheck, TriangleAlert, X } from "lucide-react";
import { redirect, RedirectType } from "next/navigation";
import { useEffect } from "react";


export default function MembershipManager({memberships} : {memberships : Members}) {

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

    return (
        <main className="flex flex-col bg-sidebar w-full min-h-fit ml-3 md:ml-5 mr-4 my-8 rounded-2xl py-5 px-5 sm:px-15">
            <div className="flex flex-col gap-5 pb-4">
                <h1 className="font-outfit text-2xl font-semibold text-foreground w-fit sm:px-2 text-start py-3">
                    {`Welcome back, ${user.name}`}
                </h1>

                <section className="flex flex-col px-8 py-6 min-h-60 bg-background w-full rounded-2xl shadow-xl shadow-black/50">
                    <h1 className="w-full border-b-2 border-foreground font-outfit text-xl font-bold tracking-wide pb-3">
                        UMAnime Memberships
                    </h1>
                    <div className={`${memberships.length == 0 ? "items-center justify-center" : ""} flex flex-col my-5 gap-3 h-full`}>
                        { memberships.length > 0 ? 
                            <div className="w-full overflow-x-auto pb-10">
                                <table className="w-full table-auto whitespace-nowrap">
                                    <thead>
                                    <tr className="text-left">
                                        <th className="px-4 py-2 font-semibold font-outfit text-sm">Membership ID #</th>
                                        <th className="px-4 py-2 font-semibold font-outfit text-sm">Registered Name</th>
                                        <th className="px-4 py-2 font-semibold font-outfit text-sm">Student ID #</th>
                                        <th className="px-4 py-2 font-semibold font-outfit text-sm">Email</th>
                                        <th className="px-4 py-2 font-semibold font-outfit text-sm">Affiliation</th>
                                        <th className="px-4 py-2 font-semibold font-outfit text-sm">Joined At</th>
                                        <th className="px-4 py-2 font-semibold font-outfit text-sm">Paid?</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {memberships.map((member) => {
                                        return (
                                        <tr key={member.student_id} className="border-b border-foreground">
                                            <td className="px-4 py-2 text-sm">{member.id}</td>
                                            <td className="px-4 py-2 text-sm">{member.name}</td>
                                            <td className="px-4 py-2 text-sm">{member.student_id}</td>
                                            <td className="px-4 py-2 text-sm">{member.email}</td>
                                            <td className="px-4 py-2 text-sm">{member.affiliation}</td>
                                            <td className="px-4 py-2 text-sm">{member.created_at.toDateString()}</td>
                                            <td className="px-4 py-2 text-sm">{member.status == "ACTIVE" ? <BadgeCheck /> : <X />}</td>
                                        </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
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