"use client"

import Footer from "@/app/lib/components/footer"
import Navbar from "@/app/lib/components/navbar"

import Form from "next/form"
import { AtSign, KeyRound, UserKey } from "lucide-react"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function LoginPage() {

    const [emailInput, setEmail] = useState<string>("")
    const [passwordInput, setPassword] = useState<string>("")

    const [emailBoxEvent, setEmailEvent] = useState<boolean>(false)
    const [passwrdBoxEvent, setPasswrdEvent] = useState<boolean>(false)

    const [errorInput,  setError] = useState<boolean>()

    const router = useRouter()

    const signIn = async () => {
        const { data, error } = await authClient.signIn.email({
            email: emailInput,
            password: passwordInput,
            fetchOptions: {
                onSuccess: () => {
                    router.push(process.env.NEXT_PUBLIC_ADMIN_LINK!)
                },
                onError: (err) => {
                    if (err.response.status === 401) {
                        setError(true)
                    }
                }
            }
        })
        
    }

    return (
        <main className="flex flex-col w-full min-h-screen overflow-x-hidden bg-background">
            <Navbar/>
                <div className="flex-1 flex items-center justify-center my-10">
                    <div className="flex flex-col justify-center w-110 h-140 gap-4 py-5 px-10 rounded-2xl bg-sidebar shadow-2xl shadow-black/30 overflow-hidden">
                        <section className="flex items-center justify-center w-full h-20">
                            <h1 className="text-foreground font-outfit text-3xl font-semibold">Welcome Back!</h1>
                        </section>
                        <p className="font-outfit text-sm">
                            Sign In to access the staff panel for the UMAnime Website. Unauthorized login will be reported!
                        </p>
                        <p className="font-outfit text-sm text-center">
                            Your credentials are given by the server administrator.
                        </p>
                        <Form action={signIn} className="flex-1">
                            <div className="flex flex-col w-full h-full">
                                <main className="flex flex-col gap-8 py-5">
                                    <div className="w-full h-13">
                                        <span className="flex flex-row gap-1 absolute -translate-y-2 translate-x-3.5 px-1.5 bg-sidebar text-xs font-medium">
                                            {"Email"}
                                        </span>
                                        <div className={`${!emailBoxEvent ? "border-foreground" : "border-navbar-join"} flex items-center justify-center gap-2 w-full h-full border-2 rounded-xl px-3`}>
                                            <AtSign className="scale-80" />
                                            <input
                                                name="email" 
                                                type="email"
                                                placeholder={"Enter your credentials' email"}
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
                                            {"Password"}
                                        </span>
                                        <div className={`${!passwrdBoxEvent ? "border-foreground" : "border-navbar-join"} flex items-center justify-center gap-2 w-full h-full border-2 rounded-xl px-3`}>
                                            <KeyRound className="scale-80" />
                                            <input
                                                name="password" 
                                                type="password"
                                                placeholder={"Enter your credentials' password"}
                                                value={passwordInput}
                                                required={true}
                                                onMouseEnter={() => setPasswrdEvent(true)} 
                                                onMouseLeave={() => setPasswrdEvent(false)}
                                                style={{ outline: "none" }}
                                                onChange={(e) => {setPassword(e.currentTarget.value)}}
                                                className="flex-1 w-full h-full"
                                            />
                                        </div>
                                    </div>
                                </main>

                                <p className={`${errorInput ? "animate-pulse" : "hidden"} font-outfit text-red-500 text-sm text-center`}>
                                    Incorrect email and/or password.
                                </p>

                                <section className="w-full h-full flex items-center justify-center mb-5">
                                    <button 
                                        type="submit"
                                        className={`mt-auto flex flex-row justify-center gap-3 font-outfit font-medium w-100 p-3.5 rounded-2xl cursor-pointer whitespace-nowrap bg-sidebar-logout hover:bg-sidebar-hover`}
                                    >   
                                        <UserKey className={``}/>
                                        Login with credentials
                                    </button>
                                </section>
                            </div>
                        </Form>
                    </div>
                </div>
            <Footer/>
        </main>
    )
}