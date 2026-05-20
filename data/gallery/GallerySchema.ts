import { z } from "zod";

export const GallerySchema = z.object({
    id: z.string(),
    event_name: z.string(),
    cover_image: z.string(),
    cover_offset: z.optional(z.string()).default("0%_0%"), // X%_Y% format for object position
    eventDate: z.date(),
    location: z.optional(z.string()),
});

export const GalleriesSchema = z.array(GallerySchema);

export type Gallery = z.infer<typeof GallerySchema>;
export type Galleries = z.infer<typeof GalleriesSchema>