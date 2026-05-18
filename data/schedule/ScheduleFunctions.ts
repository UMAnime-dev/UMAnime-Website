import { Event } from "./EventSchema";

export function groupEventsByMonth(events: Event[]) {
    const sorted = [...events].sort(
        (a, b) => a.startdate.getTime() - b.startdate.getTime()
    );

    const grouped = sorted.reduce<Record<string, Event[]>>((acc, event) => {
        const month = event.startdate.toLocaleString("en-US", { month: "long", year: "numeric" });

        if (!acc[month]) {
            acc[month] = [];
        }

        acc[month].push(event);

        return acc;

    }, {})

    return grouped;
}