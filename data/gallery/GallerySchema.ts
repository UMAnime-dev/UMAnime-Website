import { z } from "zod";

export const GallerySchema = z.object({
    id: z.string(),
    name: z.string(),
    folderPath: z.string(),
    externalSource: z.boolean().default(false),
    coverPath: z.string(),
    coverOffset: z.optional(z.string()).default("0%_0%"), // X%_Y% format for object position
    eventDate: z.date(),
    location: z.optional(z.string()),
});

export const GalleriesSchema = z.array(GallerySchema);

export type Gallery = z.infer<typeof GallerySchema>;