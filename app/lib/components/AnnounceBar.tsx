import { AnnouncementData } from "@/app/lib/data/EditableData"

export default function AnnouncementBar() {

    const data = AnnouncementData

    if (!data) return
    
    return (
    <div className={`flex items-center justify-center gap-2 w-full text-foreground text-center bg-announce-default! px-4 py-2 ${data.background}`}>
        {data.icon && <data.icon className="scale-80"/>}
        <p className="font-outfit text-base">{data.main}</p>
    </div>
  )
}