import postgres from 'postgres'
import z from "zod";
import { MembershipSchema } from "@/app/api/membership/register/route";

export async function getAllMembers() {
    const sql = postgres(process.env.POSTGRE_DATABASE_URL!, {
        idle_timeout: 20,
        max_lifetime: 60 * 30.
    })

    try {
        const members = await sql`
            select *
            from public.membership
        `
        return members
    } finally {
        await sql.end()
    }
}

export async function insertMember(id : string, memberData: z.infer<typeof MembershipSchema>) {
    const sql = postgres(process.env.POSTGRE_DATABASE_URL!, {
        idle_timeout: 20,
        max_lifetime: 60 * 30.
    })

    try {
        const sql_result = await sql`
            insert into public.membership (
                id,
                name,
                student_id,
                email,
                affiliation,
                created_at,
                status
            )
            values (
                ${id},
                ${memberData.name},
                ${memberData.student_id},
                ${memberData.email},
                ${memberData.affiliation},
                ${new Date()},
                ${memberData.status}
            )
            returning *
        `
        if (sql_result.length) {
            return sql_result[0]
        }

        return null
    } finally {
        await sql.end()
    }
}