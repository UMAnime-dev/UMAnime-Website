import { z } from "zod";

export const GallerySchema = z.object({
    id: z.string(),
    name: z.string(),
    cover_image: z.string(),
    cover_offset: z.string().default("0%_0%").nullable(), // X%_Y% format for object position
    date: z.date(),
    location: z.string().nullable(),
});

export const GalleriesSchema = z.array(GallerySchema);

export type Gallery = z.infer<typeof GallerySchema>;
export type Galleries = z.infer<typeof GalleriesSchema>