import postgres from 'postgres';

export async function getActiveSessionCount() {
    const sql = postgres(process.env.POSTGRE_DATABASE_URL!, {
        idle_timeout: 20,
        max_lifetime: 60 * 30.
    })

    try {
        const result = await sql`
            SELECT COUNT(*)::int AS count
            FROM public.session 
            WHERE "expiresAt" > ${new Date()}
        `
        
        return result[0].count;
    } catch (error) {
        console.error("Failed to fetch session count:", error);
        throw error;
    }
}