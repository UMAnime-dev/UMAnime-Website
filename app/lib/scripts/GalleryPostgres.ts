import postgres from 'postgres'

export async function getAllGalleries() {
    const sql = postgres(process.env.POSTGRE_DATABASE_URL!)

    try {
        const galleries = await sql`
            select *
            from public.galleries
        `
        return galleries
    } finally {
        await sql.end()
    }
}