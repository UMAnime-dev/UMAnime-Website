"use server"

import { getAllMembers } from "@/app/lib/scripts/MemberPostgres";
import MembershipManager from "./MembershipManager";
import { MembersSchema } from "@/data/membership/MembershipSchema";
import DatabaseError_Filler from "@/app/lib/fillers/DatabaseError";

export default async function Membership_Server() {

    const db_result = await getAllMembers()
    const members = await MembersSchema.safeParseAsync(db_result)

    console.log(members.error)
    if (!members.success) return <DatabaseError_Filler/>;

    return (
        <MembershipManager memberships={members.data}/>
    )
}