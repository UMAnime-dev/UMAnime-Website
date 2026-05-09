export interface Sponsor {
    name: string;
    url: string;
    photoUrl: string;
    bio: string;
}

export const sponsors : Sponsor[] = [
    {
        name: "Cleocatra Cafe",
        url: "https://www.google.com",
        photoUrl: "/sponsors/cleocatra.png",
        bio: "/sponsors/bio/cleocatra.md"
    },{
        name: "Yuka's Japanese Bakery",
        url: "https://www.google.com",
        photoUrl: "/sponsors/yukasbakery.jpg",
        bio: "/sponsors/bio/yukas.md"
    },{
        name: "Seoul Dak",
        url: "https://www.google.com",
        photoUrl: "/sponsors/seouldak.png",
        bio: "/sponsors/bio/seouldak.md"
    }
]
