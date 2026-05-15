import { z } from "zod";

export const EventSchema = z.object({
    id: z.string(),
    name: z.string(),
    photoUrl: z.url(),
    description: z.string(),
    location: z.string(),
    date: z.date()
});

export const EventsSchema = z.array(EventSchema);

export type Event = z.infer<typeof EventSchema>;