"use client"

import { Members } from "@/data/membership/MembershipSchema";
import { authClient } from "@/lib/auth-client";
import { BadgeCheck, ChevronDown, Trash2, TriangleAlert, X } from "lucide-react";
import Form from "next/form";
import { redirect, RedirectType } from "next/navigation";
import { useEffect, useState } from "react";

import { deleteMember, addMember } from "./actions";
import z from "zod";

const MembershipSchema = z.object({
    name: z.string().min(2),
    student_id: z.string(),
    email: z.string(),
    affiliation: z.string(),
    status: z.string(),
});

export default function MembershipManager({memberships} : {memberships : Members}) {

    const [onboardingOpen, setOnboardingOpen] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [affiliation, setAffiliation] = useState("UMSU");
    const [affiliationOpen, setAffiliationOpen] = useState(false);
    const [studentId, setStudentId] = useState("");

    const [email, setEmail] = useState("");

    const register = async () => {

        const memberObject = MembershipSchema.parse({
            name: `${firstName} ${lastName}`,
            student_id: studentId,
            email: email,
            affiliation: affiliation,
            status: "ACTIVE",
        })

        const result = await addMember(memberObject)

        if (result) {
            window.location.reload()
        } else {
            console.log("Error")
        }
    }

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
                    <div className="flex flex-row w-full border-b-2 border-foreground  pb-3">
                        <h1 className="font-outfit text-xl font-bold tracking-wide">
                            UMAnime Memberships
                        </h1>
                        <button className="ml-auto font-outfit text-sm bg-sidebar-logout hover:bg-sidebar-hover cursor-pointer p-1.5 rounded-lg" onClick={() => setOnboardingOpen(true)}>
                            Add New Member
                        </button>
                    </div>
                    <div className={`${memberships.length == 0 ? "items-center justify-center" : ""} flex flex-col my-5 gap-3 h-full`}>
                        { memberships.length > 0 ? 
                            <div className="w-full overflow-x-auto pb-10">
                                <table className="w-full table-auto whitespace-nowrap">
                                    <thead>
                                    <tr className="text-left">
                                        <th className="px-4 py-2 font-semibold font-outfit text-sm">Action</th>
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
                                            <td className="py-2 text-sm text-center" style={{ outline: "none" }}>
                                                <button 
                                                    className="text-red-400 hover:text-red-700 cursor-pointer scale-85"
                                                    onClick={async () => {
                                                        await deleteMember(member.id).then(() => {
                                                            window.location.reload()
                                                        })
                                                    }}
                                                >
                                                    <Trash2 />
                                                </button>
                                            </td>
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
                
            <div className={`${onboardingOpen ? 'fixed' : 'hidden'} top-0 left-0 w-full h-full bg-black z-100 opacity-70`}/>

            <div className={`${onboardingOpen ? 'fixed' : 'hidden'} left-1/2 -translate-x-1/2 flex items-center justify-center w-full h-full z-101`}>
                <div className="relative flex flex-col justify-center w-140 py-6 px-10 rounded-2xl bg-sidebar shadow-2xl shadow-black/30 overflow-hidden">
                    <button className="absolute right-8 top-8 cursor-pointer" onClick={() => setOnboardingOpen(false)}>
                        <X/>
                    </button>
                    <section className="flex items-center w-full h-15 pl-3">
                        <h1 className="text-foreground font-outfit text-xl font-semibold">UMAnime Membership Onboarding</h1>
                    </section>
                    <p className="font-outfit text-xs pl-3">
                        Complete form below to register for UMAnime Membership.
                    </p>
                    <Form action={register} className="flex-1 py-5">
                        <section className="flex flex-col gap-5 mt-10 sm:mx-3">
                            <main className="flex flex-row gap-4">
                                <div className="w-full h-13">
                                    <span className="flex flex-row gap-1 absolute -translate-y-2 translate-x-3.5 px-1.5 bg-sidebar text-xs font-medium">
                                        {"First Name"}
                                        <p className="text-red-500">
                                            {"*"}
                                        </p>
                                    </span>
                                    <input
                                        name="firstName" 
                                        placeholder={"John"}
                                        value={firstName}
                                        required={true}
                                        onChange={(e) => {setFirstName(e.currentTarget.value)}}
                                        className="w-full h-full border-2 rounded-xl px-3"
                                    />
                                </div>

                                <div className="w-full h-13">
                                    <span className="flex flex-row gap-1 absolute -translate-y-2 translate-x-3.5 px-1.5 bg-sidebar text-xs font-medium">
                                        {"Last Name"}
                                        <p className="text-red-500">
                                            {"*"}
                                        </p>
                                    </span>
                                    <input
                                        name="lastName" 
                                        placeholder={"Doe"}
                                        value={lastName}
                                        required={true}
                                        onChange={(e) => {setLastName(e.currentTarget.value)}}
                                        className="w-full h-full border-2 rounded-xl px-3"
                                    />
                                </div>
                            </main>

                            <main className="flex flex-col">
                                <div className="w-full h-13">
                                    <span className="flex flex-row gap-1 absolute -translate-y-2 translate-x-3.5 px-1.5 bg-sidebar text-xs font-medium">
                                        {"Email"}
                                        <p className="text-red-500">
                                            {"*"}
                                        </p>
                                    </span>
                                    <input
                                        name="email" 
                                        type="email"
                                        placeholder={"johndoe@gmail.com"}
                                        value={email}
                                        required={true}
                                        style={{ outline: "none" }}
                                        onChange={(e) => {setEmail(e.currentTarget.value)}}
                                        className="w-full h-full border-2 rounded-xl px-3"
                                    />
                                </div>
                            </main>

                            <main className="flex flex-col">
                                <div className="w-full h-13">
                                    <span className="flex flex-row gap-1 absolute -translate-y-2 translate-x-3.5 px-1.5 bg-sidebar text-xs font-medium">
                                        {"Student ID (not required)"}
                                    </span>
                                    <input
                                        name="studentId"
                                        placeholder={"12345678"}
                                        value={studentId}
                                        required={false}
                                        onChange={(e) => {setStudentId(e.currentTarget.value)}}
                                        className="w-full h-full border-2 rounded-xl px-3"
                                    />
                                </div>
                            </main>

                            <main className="flex flex-col gap-4">
                                <div className="w-full h-13 cursor-pointer" onClick={() => setAffiliationOpen((prev) => !prev)}>
                                    <span className="flex flex-row gap-1 absolute -translate-y-2 translate-x-3.5 px-1.5 bg-sidebar text-xs font-medium">
                                        {"Affiliation"}
                                        <p className="text-red-500">
                                            {"*"}
                                        </p>
                                    </span>
                                    <div id="affiliation" className="flex items-center pl-3 w-full h-full border-2 rounded-xl">
                                        <p className="select-none">{affiliation}</p>
                                        <ChevronDown className={`${affiliationOpen ? 'rotate-180' : ''} transition-[rotate] duration-300 ease-in-out ml-auto mr-3`}/>
                                    </div>
                                </div>

                                <div className={`w-full hidden md:flex flex-col bg-sidebar h-30 transition-[height,opacity] duration-600 ease-in-out overflow-x-hidden overflow-y-auto border-2 rounded-xl ${affiliationOpen ? "opacity-100 gap-5" : "h-0! px-0! overflow-clip border-0!"}`}>
                                    <ul className={`flex-col gap-2 m-2 ${affiliationOpen ? "flex" : "hidden"}`}>
                                        <li className="px-3 py-1 rounded-lg cursor-pointer hover:bg-sidebar-hover" onClick={() => {setAffiliation("UMSU"); setAffiliationOpen(false)}}>
                                            UMSU (UofM)
                                        </li>
                                        <li className="px-3 py-1 rounded-lg cursor-pointer hover:bg-sidebar-hover" onClick={() => {setAffiliation("EXTERNAL"); setAffiliationOpen(false)}}>
                                            EXTERNAL (USB, UofW or non University Affiliated)
                                        </li>
                                        <li className="px-3 py-1 rounded-lg cursor-pointer hover:bg-sidebar-hover" onClick={() => {setAffiliation("GUEST"); setAffiliationOpen(false)}}>
                                            GUEST (Sponsors)
                                        </li>
                                        <li className="px-3 py-1 rounded-lg cursor-pointer hover:bg-sidebar-hover" onClick={() => {setAffiliation("STAFF"); setAffiliationOpen(false)}}>
                                            CLUB STAFF (UMAnime Club Staff)
                                        </li>
                                    </ul>
                                </div>
                            </main>

                            <button 
                                type="submit"
                                className={`mt-auto flex flex-row justify-center gap-3 font-outfit font-medium w-full p-3.5 rounded-2xl whitespace-nowrap bg-sidebar-logout cursor-pointer hover:bg-sidebar-hover`}
                            >   
                                Register Membership
                            </button>
                        </section>
                    </Form>
                </div>
            </div>
        </main>
    )
}