import { z } from "zod";

export const EventSchema = z.object({
    id: z.string(),
    name: z.string(),
    photoUrl: z.string(),
    photoOffset: z.optional(z.string()).default("0%_0%"), // X%_Y% format for object position
    description: z.string(),
    location: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    rsvp: z.optional(z.string()),
    membership: z.boolean().default(true)
});

export const EventsSchema = z.array(EventSchema);

export type Event = z.infer<typeof EventSchema>;