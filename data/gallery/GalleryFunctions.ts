import { Gallery } from "./GallerySchema";

export function groupEventsByRangeYear(galleries: Gallery[]) {
    const sorted = [...galleries].sort(
        (a, b) => a.date.getTime() - b.date.getTime()
    );

    const grouped = sorted.reduce<Record<string, Gallery[]>>((acc, gallery) => {

        const date = gallery.date;
        const startYear = date.getMonth() >= 4 ? date.getFullYear() : date.getFullYear() - 1;

        const endYear = startYear + 1;
        const range = `${startYear} - ${endYear}`;

        if (!acc[range]) {
            acc[range] = [];
        }

        acc[range].push(gallery);

        return acc;

    }, {});

    return grouped;
}