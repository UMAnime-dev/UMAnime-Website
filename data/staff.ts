import fs from 'fs';
import path from 'path';

type StaffCategory = "executive" | "events" | "artists" | "media";

export interface StaffMember {
    name: string;
    position: string;
    photoUrl: string;
    bio: string;
    category?: StaffCategory
}

export async function getStaffByYear(year: string): Promise<StaffMember[]> {

    try {
        const yearBegin = year.split('-')[0];
        const filePath = path.join(process.cwd(), 'data', 'staff', `${yearBegin}.json`);

        // Check if the file exists to prevent server crashes
        if (!fs.existsSync(filePath)) {
            return [];
        }

        const fileContents = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContents) as StaffMember[];
    } catch (error) {
        console.error(`Failed to load staff data for year ${year}:`, error);
        return [];
    }
}
