"use client"

import FooterNoSocial from "@/app/lib/components/footer_nosocial"

import Form from "next/form"
import { AtSign, Tag, User, UserKey } from "lucide-react"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { generate } from "generate-password"

export default function NewAdminCreator() {

    const [nameInput, setName] = useState<string>("")
    const [emailInput, setEmail] = useState<string>("")
    const [roleInput, setRoleInput] = useState<string>("")
    const [passwordInput, setPassword] = useState<string>("")

    const [nameBoxEvent, setNameEvent] = useState<boolean>(false)
    const [emailBoxEvent, setEmailEvent] = useState<boolean>(false)
    const [roleBoxEvent, setRoleEvent] = useState<boolean>(false)

    const signUp = async () => {
        const password = generate({
            length: 30,
            numbers: true,
            symbols: true,
            strict: true
        })

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data, error } = await authClient.signUp.email({
            name: nameInput,
            email: emailInput,
            password: password,
            image: "",
            role: roleInput,
            callbackURL: process.env.NEXT_PUBLIC_LOGIN_LINK,
        });

        setPassword(password)

    }

    return (
        <main className="flex flex-col w-full min-h-screen overflow-x-hidden bg-background">
            <div className="flex-1 flex my-10 items-center justify-center">
                <div className="flex flex-col justify-center w-110 h-140 gap-4 py-5 px-10 rounded-2xl bg-sidebar shadow-2xl shadow-black/30 overflow-hidden">
                    <section className="flex items-center justify-center w-full h-20">
                        <h1 className="text-foreground font-outfit text-3xl font-semibold animate-pulse">Welcome Back, Owner.</h1>
                    </section>
                    <p className="font-outfit text-sm">
                        This is for the Server Owner only.
                    </p>
                    <p className="font-outfit text-sm">
                        Credentials Creator. This endpoint is LOCKED to Server Owner only.
                    </p>
                    <Form action={signUp} className="flex-1">
                        <div className="flex flex-col w-full h-full">
                            <main className="flex flex-col gap-4 py-5">
                                <div className="w-full h-13">
                                    <span className="flex flex-row gap-1 absolute -translate-y-2 translate-x-3.5 px-1.5 bg-sidebar text-xs font-medium">
                                        {"Name"}
                                    </span>
                                    <div className={`${!nameBoxEvent ? "border-foreground" : "border-navbar-join"} flex items-center justify-center gap-2 w-full h-full border-2 rounded-xl px-3`}>
                                        <User className="scale-80" />
                                        <input
                                            name="name" 
                                            type="text"
                                            placeholder={"Ryann Pastolero"}
                                            value={nameInput}
                                            required={true}
                                            onMouseEnter={() => setNameEvent(true)} 
                                            onMouseLeave={() => setNameEvent(false)}
                                            style={{ outline: "none" }}
                                            onChange={(e) => {setName(e.currentTarget.value)}}
                                            className="flex-1 w-full h-full"
                                        />
                                    </div>
                                </div>
                                <div className="w-full h-13">
                                    <span className="flex flex-row gap-1 absolute -translate-y-2 translate-x-3.5 px-1.5 bg-sidebar text-xs font-medium">
                                        {"Email"}
                                    </span>
                                    <div className={`${!emailBoxEvent ? "border-foreground" : "border-navbar-join"} flex items-center justify-center gap-2 w-full h-full border-2 rounded-xl px-3`}>
                                        <AtSign className="scale-80" />
                                        <input
                                            name="email" 
                                            type="email"
                                            placeholder={"some_email@gmail.com"}
                                            value={emailInput}
                                            required={true}
                                            onMouseEnter={() => setEmailEvent(true)} 
                                            onMouseLeave={() => setEmailEvent(false)}
                                            style={{ outline: "none" }}
                                            onChange={(e) => {setEmail(e.currentTarget.value)}}
                                            className="flex-1 w-full h-full"
                                        />
                                    </div>
                                </div>
                                <div className="w-full h-13">
                                    <span className="flex flex-row gap-1 absolute -translate-y-2 translate-x-3.5 px-1.5 bg-sidebar text-xs font-medium">
                                        {"Role"}
                                    </span>
                                    <div className={`${!roleBoxEvent ? "border-foreground" : "border-navbar-join"} flex items-center justify-center gap-2 w-full h-full border-2 rounded-xl px-3`}>
                                        <Tag className="scale-80" />
                                        <input
                                            name="role" 
                                            type="text"
                                            placeholder={"President"}
                                            value={roleInput}
                                            required={true}
                                            onMouseEnter={() => setRoleEvent(true)} 
                                            onMouseLeave={() => setRoleEvent(false)}
                                            style={{ outline: "none" }}
                                            onChange={(e) => {setRoleInput(e.currentTarget.value)}}
                                            className="flex-1 w-full h-full"
                                        />
                                    </div>
                                </div>
                                <div className="w-full gap-1.25 flex items-center justify-center font-outfit text-sm">
                                    <p>
                                        {`Your password: ${passwordInput}`}
                                    </p>
                                </div>
                            </main>

                            <section className="w-full h-full flex items-center justify-center mb-5">
                                <button 
                                    type="submit"
                                    className={`${passwordInput ? "cursor-not-allowed opacity-55" : "cursor-pointer hover:bg-sidebar-hover"} mt-auto flex flex-row justify-center gap-3 font-outfit font-medium w-100 p-3.5 rounded-2xl whitespace-nowrap bg-sidebar-logout`}
                                >   
                                    <UserKey className={``}/>
                                    Create new credentials
                                </button>
                            </section>
                        </div>
                    </Form>
                </div>
            </div>
                <FooterNoSocial/>
        </main>
    )
}