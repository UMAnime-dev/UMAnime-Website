type StaffCategory = "executive" | "events" | "artists";

export interface StaffMember {
    name: string;
    position: string;
    photoUrl: string;
    bio: string;
    category: StaffCategory
}

export const categories: { key: StaffCategory; label: string }[] = [
    { key: "executive", label: "Executive Team + Lead Moderator" },
    { key: "events", label: "Events Staff" },
    { key: "artists", label: "Artists" },
];


export const current_staff : StaffMember[] = [
    {
        name: "Seth Paras",
        position: "President · Kaichou",
        photoUrl: "/staff/sethP.png",
        bio: "/staff/bio/sethP.md",
        category: "executive"
    },{
        name: "Prothoma",
        position: "VP of Internal Affairs",
        photoUrl: "/staff/prothoma.png",
        bio: "/staff/bio/prothoma.md",
        category: "executive"
    },{
        name: "Charlie",
        position: "VP of Communications",
        photoUrl: "/staff/charlie.png",
        bio: "/staff/bio/charlie.md",
        category: "executive"
    },{
        name: "Akshar Patel",
        position: "Treasurer",
        photoUrl: "/staff/akshar.png",
        bio: "/staff/bio/akshar.md",
        category: "executive"
    },{
        name: "Lem",
        position: "Lead Moderator",
        photoUrl: "/staff/lem.png",
        bio: "/staff/bio/lem.md",
        category: "executive"
    },{
        name: "Ryann",
        position: "Events Staff",
        photoUrl: "/staff/ryann.png",
        bio: "/staff/bio/ryann.md",
        category: "events"
    },{
        name: "Jason",
        position: "Events Staff",
        photoUrl: "/staff/jason.png",
        bio: "/staff/bio/jason.md",
        category: "events"
    },{
        name: "Joseph",
        position: "Artists",
        photoUrl: "/staff/joseph.png",
        bio: "/staff/bio/joseph.md",
        category: "artists"
    },
    {
        name: "Melissa",
        position: "Artists",
        photoUrl: "/staff/melissa.png",
        bio: "/staff/bio/melissa.md",
        category: "artists"
    },
    {
        name: "Melinda",
        position: "Artists",
        photoUrl: "/staff/melinda.png",
        bio: "/staff/bio/melinda.md",
        category: "artists"
    },
    {
        name: "Sheral",
        position: "Events Staff",
        photoUrl: "/staff/sheral.png",
        bio: "/staff/bio/sheral.md",
        category: "events"
    },
    {
        name: "Oliver",
        position: "Events Staff",
        photoUrl: "/staff/oliver.png",
        bio: "/staff/bio/oliver.md",
        category: "events"
    },
    {
        name: "Carr",
        position: "Events Staff",
        photoUrl: "/staff/carr.png",
        bio: "/staff/bio/carr.md",
        category: "events"
    },
    {
        name: "Dalton",
        position: "Events Staff",
        photoUrl: "/staff/dalton.png",
        bio: "/staff/bio/dalton.md",
        category: "events"
    },
    {
        name: "Arya",
        position: "Artists",
        photoUrl: "/staff/arya.png",
        bio: "/staff/bio/arya.md",
        category: "artists"
    },
    {
        name: "Lex",
        position: "Events Staff",
        photoUrl: "/staff/lex.png",
        bio: "/staff/bio/lex.md",
        category: "events"
    },
    {
        name: "Seth S",
        position: "Events Staff",
        photoUrl: "/staff/sethS.png",
        bio: "/staff/bio/sethS.md",
        category: "events"
    },
    
]