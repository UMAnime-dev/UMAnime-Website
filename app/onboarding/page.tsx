"use client"

import Form from "next/form";
import FooterNoSocial from "../lib/components/footer_nosocial";
import { useState } from "react"
import { ChevronDown } from "lucide-react";

export default function OnboardingPage() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [affiliation, setAffiliation] = useState("UMSU");
    const [affiliationOpen, setAffiliationOpen] = useState(false);
    const [studentId, setStudentId] = useState("");

    const [email, setEmail] = useState("");

    const register = async () => {

    }

    return (
        <main className="flex flex-col w-full min-h-screen overflow-x-hidden bg-background">
            <div className="flex-1 flex my-10 items-center justify-center">
                <div className="flex flex-col justify-center w-140 py-6 px-10 rounded-2xl bg-sidebar shadow-2xl shadow-black/30 overflow-hidden">
                    <section className="flex items-center w-full h-15">
                        <h1 className="text-foreground font-outfit text-xl font-semibold">UMAnime Membership Onboarding</h1>
                    </section>
                    <p className="font-outfit text-xs">
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
            <FooterNoSocial/>
        </main>
    );
}