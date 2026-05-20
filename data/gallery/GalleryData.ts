import { GalleriesSchema, type Gallery} from "./GallerySchema";

const data = [
    {
        id: "gunpla-2025-10-06",
        event_name: "Gunpla Build Night",
        cover_image: "/gallery/gunpla-2025-10-06/IMG_7479.jpg",
        cover_offset: "0%_0%",
        eventDate: new Date("2025-10-06T17:00:00"),
        location: "University of Manitoba (EITC E2-330)",
    },
    {
        id: "icebreaker-2025-09-26",
        event_name: "Fall Icebreaker",
        cover_image: "/gallery/icebreaker-2025-09-26/IMG_2718.jpg",
        cover_offset: "0%_5%",
        eventDate: new Date("2025-09-26T16:00:00"),
        location: "Armes (SSA Lounge)"
    },
    {
        id: "halloween-2025-10-31",
        event_name: "Halloween 2025",
        cover_image: "/gallery/halloween-2025-10-31/IMG_8610.jpg",
        cover_offset: "0%_5%",
        eventDate: new Date("2025-10-31T19:00:00"),
        location: "Russell atrium"
    },
    {
        id: "butler-cafe-2026-01-30",
        event_name: "Butler Cafe / Winter Icebreaker",
        cover_image: "/gallery/butler-cafe-2026-01-30/Butler_Cafe.png",
        cover_offset: "0%_5%",
        eventDate: new Date("2026-01-30T16:00:00"),
        location: "UMSU (GSA Lounge)"
    },
] satisfies Gallery[];
    
export const galleries = GalleriesSchema.parse(data);