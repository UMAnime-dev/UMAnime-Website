import { z } from "zod";

export const EventSchema = z.object({
    id: z.string(),
    name: z.string(),
    photourl: z.string(),
    photooffset: z.optional(z.string()).default("0%_0%").nullable(), // X%_Y% format for object position
    description: z.string(),
    location: z.string(),
    startdate: z.date(),
    enddate: z.date(),
    rsvp: z.optional(z.string()).nullable(),
    membership: z.boolean().default(true),
    created_at: z.date(),
    updated_at: z.optional(z.date()).nullable()
});

export const EventsSchema = z.array(EventSchema);

export type Event = z.infer<typeof EventSchema>;
export type Events = z.infer<typeof EventsSchema>;