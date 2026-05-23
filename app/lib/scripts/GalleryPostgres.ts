import { Gallery } from '@/data/gallery/GallerySchema'
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

export async function postNewGallery(gallery : Gallery) {
    const sql = postgres(process.env.POSTGRE_DATABASE_URL!)

    try {
        const galleries = await sql`
            insert into public.galleries (id, name, cover_image, cover_offset, date, location)
            values (${gallery.id}, ${gallery.name}, ${gallery.cover_image}, ${null}, ${gallery.date}, ${gallery.location});
        `
        return galleries
    } finally {
        await sql.end()
    }
}

export async function deleteGalleryById(id: string): Promise<boolean> {
    const sql = postgres(process.env.POSTGRE_DATABASE_URL!)

    try {
        const sql_result = await sql`
            delete from public.galleries
            where id = ${id}
            returning id
        `

        return sql_result.length > 0
    } finally {
        await sql.end()
    }
}