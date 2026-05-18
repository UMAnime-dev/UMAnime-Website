import { prisma } from "@/lib/prisma"

export async function getEvents() {
    return await prisma.events.findMany({
        orderBy: {
            startdate: "desc"
        }
    })
}