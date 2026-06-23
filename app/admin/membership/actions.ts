"use server"

import { deleteMemberById, getMemberByIdOrStudentId, insertMember } from "@/app/lib/scripts/MemberPostgres";
import crypto from "crypto";
import z from "zod";

const MembershipSchema = z.object({
    name: z.string().min(2),
    student_id: z.string(),
    email: z.string(),
    affiliation: z.string(),
    status: z.string(),
});


export async function deleteMember(id: string) {
    return await deleteMemberById(id)
}

async function validateExistance(id: string, student_id: string) {
    return await getMemberByIdOrStudentId(id, student_id)
}

export async function addMember(memberObject : z.infer<typeof MembershipSchema>) {

    const newId = crypto.randomInt(1000000, 9999999).toString();

    const validate = await validateExistance(newId, memberObject.student_id)

    if (validate) {
        return false
    }
    
    return await insertMember(newId, memberObject)
}

