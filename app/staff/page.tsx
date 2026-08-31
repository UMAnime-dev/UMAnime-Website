"use server"

import StaffClient from "./StaffYearClient";
import { 
    getStaffByYear, 
    StaffMember as Members
} from "@/data/staff";

export default async function Staff({searchParams}:{searchParams: Promise<{ year?: string }>}) {
    const params = await searchParams;

    const activeYear = params.year || '2026-2027';
    const current_staff = await getStaffByYear(activeYear as string);

    return (
        <StaffClient members={current_staff as Members[]}/>
    )
}