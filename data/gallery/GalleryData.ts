import { GalleriesSchema, type Gallery} from "./GallerySchema";

const data = [
    {
        id: "gunpla-2025-10-06",
        name: "Gunpla Build Night",
        coverPath: "/gallery/gunpla-2025-10-06/IMG_7479.jpg",
        coverOffset: "0%_0%",
        eventDate: new Date("2025-10-06T17:00:00"),
        folderPath: "/gallery/gunpla-2025-10-06",
        externalSource: false,
        location: "University of Manitoba (EITC E2-330)",
    },
    {
        id: "icebreaker-2025-09-26",
        name: "Fall Icebreaker",
        coverPath: "/gallery/icebreaker-2025-09-26/IMG_2718.jpg",
        coverOffset: "0%_5%",
        eventDate: new Date("2025-09-26T16:00:00"),
        folderPath: "/gallery/icebreaker-2025-09-26",
        externalSource: false,
        location: "Armes (SSA Lounge)"
    },
    {
        id: "halloween-2025-10-31",
        name: "Halloween 2025",
        coverPath: "/gallery/halloween-2025-10-31/IMG_8610.jpg",
        coverOffset: "0%_5%",
        eventDate: new Date("2025-10-31T19:00:00"),
        folderPath: "/gallery/halloween-2025-10-31",
        externalSource: false,
        location: "Russell atrium"
    },
    {
        id: "butler-cafe-2026-01-30",
        name: "Butler Cafe / Winter Icebreaker",
        coverPath: "/gallery/butler-cafe-2026-01-30/Butler_Cafe.png",
        coverOffset: "0%_5%",
        eventDate: new Date("2026-01-30T16:00:00"),
        folderPath: "/gallery/butler-cafe-2026-01-30",
        externalSource: false,
        location: "UMSU (GSA Lounge)"
    },
] satisfies Gallery[];
    
export const galleries = GalleriesSchema.parse(data);