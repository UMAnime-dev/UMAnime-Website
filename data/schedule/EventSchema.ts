import { z } from "zod";

export const EventSchema = z.object({
    id: z.string(),
    name: z.string(),
    photoUrl: z.url(),
    description: z.string(),
    location: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    rsvp: z.optional(z.string()),
    membership: z.boolean().default(true)
});

export const EventsSchema = z.array(EventSchema);

export type Event = z.infer<typeof EventSchema>;