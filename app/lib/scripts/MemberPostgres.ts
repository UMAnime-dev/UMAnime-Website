import postgres from 'postgres'

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