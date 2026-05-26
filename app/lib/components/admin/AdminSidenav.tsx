"use client"

import { CalendarClock, ChevronRight, DoorOpen, FolderTree, House, Menu, PanelLeftClose, PartyPopper, X } from "lucide-react"

import Image from "next/image"
import { redirect, RedirectType, usePathname, useRouter } from "next/navigation"
import { Dispatch, SetStateAction } from "react"
import { authClient } from "@/lib/auth-client"

export default function AdminSideNav({state} : {state : {
            visible: boolean;
            setVisiblity: Dispatch<SetStateAction<boolean>>;
        } 
    }) {

    const pathname = usePathname();

    const router = useRouter()
    const dashboard = '/admin'
    const scheduler = '/admin/events'
    const gallery = '/admin/gallery'
    const features = '/admin/features'

    const isActive = (route: string) => {
        if (route === '/admin') return pathname === '/admin';
        return pathname.startsWith(route);
    };
    return (
        <>
            {/* PC */}
            <nav className={`fixed top-0 h-screen hidden md:flex flex-col bg-sidebar w-35 md:w-65 px-8 py-2 transition-[width,opacity] duration-600 ease-in-out overflow-hidden ${state.visible ? "opacity-100 gap-5" : "w-20! px-0! overflow-clip items-center"}`}>
                <Image src='/Logo.png' alt="UM Anime Club Logo" width={1920} height={1080} style={{ width: '1920', height: '1080' }} className={`${state.visible ? "hidden" : "pt-5"} w-15 object-contain cursor-pointer`} loading="eager" onClick={() => {redirect(dashboard, RedirectType.push)}}/>
                <header className="flex flex-row justify-center items-center w-full h-20">
                    <Image src='/UMAnime.svg' alt="UM Anime Club Logo" width={0} height={0} style={{ width: '1920', height: '1080' }} className={`${state.visible ? "" : "hidden"} whitespace-nowrap w-30 sm:w-35 md:w-25 object-contain cursor-pointer`} loading="eager" onClick={() => {redirect(dashboard, RedirectType.push)}}/>
                    <button 
                        className={`${state.visible ? "ml-auto" : "" } text-foreground cursor-pointer p-1`}
                        onClick={() => {
                            state.setVisiblity(!state.visible)
                        }}
                    >
                        <PanelLeftClose className={`${state.visible ? "rotate-0" : "rotate-180" } transition-[rotate] duration-500 ease-in-out`}/>
                    </button>
                </header>

                <section className="flex flex-col justify-center gap-2">
                    <button 
                        id="btn_dash" 
                        className={`${isActive(dashboard) ? "bg-sidebar-hover" : "" } flex flex-row gap-3 font-outfit font-medium p-3 rounded-2xl cursor-pointer whitespace-nowrap hover:bg-sidebar-hover`}
                        onClick={() => {
                            redirect(dashboard, RedirectType.push)
                        }}
                    >
                        <House className="min-w-6" />
                        {state.visible ? "Admin Dashboard" : ""}
                    </button>

                    <button 
                        id="btn_event" 
                        className={`${isActive(scheduler) ? "bg-sidebar-hover" : "" } flex flex-row gap-3 font-outfit font-medium p-3 rounded-2xl cursor-pointer whitespace-nowrap hover:bg-sidebar-hover`}
                        onClick={() => {
                            redirect(scheduler, RedirectType.push)
                        }}
                    >
                        <CalendarClock className="min-w-6" />
                        {state.visible ? "Event Scheduler" : ""}
                    </button>

                    <button 
                        id="btn_gallery" 
                        className={`${isActive(gallery) ? "bg-sidebar-hover" : "" } flex flex-row gap-3 font-outfit font-medium p-3 rounded-2xl cursor-pointer whitespace-nowrap hover:bg-sidebar-hover`}
                        onClick={() => {
                            redirect(gallery, RedirectType.push)
                        }}
                    >
                        <FolderTree className="min-w-6"/>
                        {state.visible ? "Gallery Manager" : ""}
                    </button>
                    <button 
                        id="btn_features" 
                        className={`${isActive(features) ? "bg-sidebar-hover" : "" } flex flex-row gap-3 font-outfit font-medium p-3 rounded-2xl cursor-pointer whitespace-nowrap hover:bg-sidebar-hover`}
                        onClick={() => {
                            redirect(features, RedirectType.push)
                        }}
                    >
                        <PartyPopper className="min-w-6"/>
                        {state.visible ? "Website Features" : ""}
                    </button>
                </section>

                <button 
                    id="btn_exit" 
                    className={`flex flex-row gap-3 font-outfit font-medium p-3.5 rounded-2xl cursor-pointer whitespace-nowrap hover:bg-sidebar-hover mt-auto mb-4 bg-sidebar-logout`}
                    onClick={async () => {
                        await authClient.signOut({
                            fetchOptions: {
                                onSuccess: () => {
                                    router.push("/")
                                }
                            }
                        })
                    }}
                >
                    <DoorOpen className="min-w-6"/>
                    {state.visible ? "Logout" : ""}
                </button>
            </nav>
            
            <button 
                className={`${!state.visible ? "hidden" : ""} md:hidden fixed left-4.5 top-4.5 text-foreground cursor-pointer p-1.5 bg-sidebar rounded-3xl border-2 border-gray-400 z-99`}
                onClick={() => {
                    state.setVisiblity(false)
                }}
            >
                <Menu />
            </button>

            <button 
                className={`${state.visible ? "hidden" : ""} md:hidden fixed left-4.5 top-4.5 text-foreground cursor-pointer p-1.5 bg-background rounded-3xl border-2 border-gray-400 z-99`}
                onClick={() => {
                    state.setVisiblity(true)
                }}
            >
                <X />
            </button>
            
            {/* Mobile */}
            <nav className={`${state.visible ? "hidden" : ""} md:hidden fixed flex flex-col items-center min-w-full min-h-full bg-sidebar py-8 px-10 gap-10 z-98`}>
                <Image src='/UMAnime.svg' alt="UM Anime Club Logo" width={0} height={0} style={{ width: '1920', height: '1080' }} className={`${!state.visible ? "" : "hidden"} whitespace-nowrap w-30 sm:w-35 md:w-25 object-contain cursor-pointer`} loading="eager" 
                    onClick={() => {
                        redirect(dashboard, RedirectType.push)
                    }}
                />
                <section className="flex flex-col justify-center gap-2 w-full">
                    <button 
                        id="btn_dash" 
                        className={`${isActive(dashboard) ? "outline-2 outline-foreground outline-solid" : "" } flex flex-row gap-3 font-outfit font-medium p-3 rounded-2xl cursor-pointer whitespace-nowrap bg-sidebar-hover`}
                        onClick={() => {
                            state.setVisiblity(true)
                            redirect(dashboard, RedirectType.push)
                        }}
                    >
                        <House className="min-w-6" />
                        {!state.visible ? "Admin Dashboard" : ""}
                        <ChevronRight className="ml-auto" />
                    </button>

                    <button 
                        id="btn_event" 
                        className={`${isActive(scheduler) ? "outline-2 outline-foreground outline-solid" : "" } flex flex-row gap-3 font-outfit font-medium p-3 rounded-2xl cursor-pointer whitespace-nowrap bg-sidebar-hover`}
                        onClick={() => {
                            state.setVisiblity(true)
                            redirect(scheduler, RedirectType.push)
                        }}
                    >
                        <CalendarClock className="min-w-6" />
                        {!state.visible ? "Event Scheduler" : ""}
                        <ChevronRight className="ml-auto" />
                    </button>

                    <button 
                        id="btn_gallery" 
                        className={`${isActive(gallery) ? "outline-2 outline-foreground outline-solid" : "" } flex flex-row gap-3 font-outfit font-medium p-3 rounded-2xl cursor-pointer whitespace-nowrap bg-sidebar-hover`}
                        onClick={() => {
                            state.setVisiblity(true)
                            redirect(gallery, RedirectType.push)
                        }}
                    >
                        <FolderTree className="min-w-6"/>
                        {!state.visible ? "Gallery Manager" : ""}
                        <ChevronRight className="ml-auto" />
                    </button>
                </section>

                <button 
                    id="btn_exit" 
                    className={`flex flex-row gap-3 font-outfit font-medium w-full p-3.5 rounded-2xl cursor-pointer whitespace-nowrap hover:bg-sidebar-hover mt-auto mb-8 bg-sidebar-logout`}
                    onClick={async () => {
                        await authClient.signOut({
                            fetchOptions: {
                                onSuccess: () => {
                                    router.push("/")
                                }
                            }
                        })
                    }}
                >
                    <DoorOpen className="min-w-6"/>
                    {!state.visible ? "Logout" : ""}
                    <ChevronRight className="ml-auto" />
                </button>
            </nav>
        </>
    )
}