"use client"

import AdminSideNav from "../lib/components/admin/AdminSidenav"
import { useState } from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [visible, setVisiblity] = useState(true);

  const stateObject = {
    visible: visible,
    setVisiblity: setVisiblity
  }
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden bg-background flex flex-row">
        <AdminSideNav state={stateObject}/>
        <section className={`${visible ? "md:pl-65" : "md:pl-20"} flex w-full min-h-screen transition-[padding-left] duration-600 ease-in-out`}>
          {children}
        </section>
    </main>
  )
}