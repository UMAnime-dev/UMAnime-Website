import { EventsSchema, type Event} from "./EventSchema";

const data = [
    {
        id: "sample-1",
        name: "Sample Event 1",
        photoUrl: "https://via.placeholder.com/400x200.png?text=Sample+Event+1",
        description: "This is a description for Sample Event 1. It provides details about the event, including what to expect and who should attend.",
        location: "University of Manitoba EITC E3-270",
        date: new Date("2024-09-15T18:00:00"),
    }
] satisfies Event[];
    
export const events = EventsSchema.parse(data);