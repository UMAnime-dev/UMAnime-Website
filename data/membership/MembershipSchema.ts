import { z } from "zod";

export const MemberSchema = z.object({
    id: z.string(),
    name: z.string(),
    student_id: z.string(),
    status: z.string(),
    email: z.string(),
    affiliation: z.string(),
    created_at: z.date(),
});

export const MembersSchema = z.array(MemberSchema);

export type Member = z.infer<typeof MemberSchema>;
export type Members = z.infer<typeof MembersSchema>;