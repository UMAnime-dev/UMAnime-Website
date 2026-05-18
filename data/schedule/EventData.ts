import { EventsSchema, type Event} from "./EventSchema";

const data = [
    {
        id: "sample-1",
        name: "Anime Movie Night",
        photourl: "/eventSamples/screening.jpg",
        photooffset: "0%_0%",
        description: "A casual movie night with snacks, friends, and a featured anime film.",
        location: "University of Manitoba (EITC E3-270)",
        startdate: new Date("2026-05-15T18:00:00"),
        enddate: new Date("2026-05-15T20:00:00"),
        rsvp: "https://www.google.ca",
        membership: true,
        created_at: new Date()
    },
    {
        id: "sample-2",
        name: "Gunpla Build Night",
        photourl: "/eventSamples/gunpla.jpg",
        photooffset: "0%_0%",
        description: "Come build and customize your favorite gunpla models with fellow enthusiasts.",
        location: "University of Manitoba (EITC E3-270)",
        startdate: new Date("2026-05-22T17:30:00"),
        enddate: new Date("2026-05-22T19:30:00"),
        membership: false,
        created_at: new Date()
    },
    {
        id: "sample-3",
        name: "UM School Festival",
        photourl: "/eventSamples/festival.jpg",
        photooffset: "0%_5%",
        description: "Plan cosplay ideas, share progress, and get advice from other members.",
        location: "University of Manitoba (EITC E3-270)",
        startdate: new Date("2026-06-05T18:00:00"),
        enddate: new Date("2026-06-05T20:00:00"),
        rsvp: "https://www.google.ca",
        membership: false,
        created_at: new Date()
    },
    {
        id: "sample-4",
        name: "Summer Icebreaker",
        photourl: "/eventSamples/icebreaker.jpg",
        photooffset: "0%_0%",
        description: "Compete in teams and test your knowledge of anime openings, characters, and studios.",
        location: "University of Manitoba (EITC E3-270)",
        startdate: new Date("2026-06-19T18:00:00"),
        enddate: new Date("2026-06-19T21:00:00"),
        rsvp: "https://www.google.ca",
        membership: true,
        created_at: new Date()
    },
    {
        id: "sample-5",
        name: "Summer Watch Party",
        photourl: "/eventSamples/screening.jpg",
        photooffset: "0%_0%",
        description: "Watch selected summer anime episodes together and discuss first impressions.",
        location: "University of Manitoba (EITC E3-270)",
        startdate: new Date("2026-07-10T18:00:00"),
        enddate: new Date("2026-07-10T20:30:00"),
        membership: false,
        created_at: new Date()
    },
    {
        id: "sample-6",
        name: "Halloween Party",
        photourl: "/eventSamples/halloween.jpg",
        photooffset: "0%_0%",
        description: "A relaxed drawing workshop for fan art, character design, and creative practice.",
        location: "University of Manitoba (EITC E3-270)",
        startdate: new Date("2026-07-24T17:00:00"),
        enddate: new Date("2026-07-24T19:00:00"),
        rsvp: "https://www.google.ca",
        membership: false,
        created_at: new Date()
    },
    {
        id: "sample-7",
        name: "End of Summer Social",
        photourl: "/eventSamples/endyear.jpg",
        photooffset: "0%_5%",
        description: "A chill social event with games, discussion, and plans for the upcoming term.",
        location: "University of Manitoba (EITC E3-270)",
        startdate: new Date("2026-08-07T18:00:00"),
        enddate: new Date("2026-08-07T21:00:00"),
        rsvp: "https://www.google.ca",
        membership: true,
        created_at: new Date()
    },
] satisfies Event[];
    
export const events = EventsSchema.parse(data);