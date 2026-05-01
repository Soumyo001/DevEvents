import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { EventItem } from "@/lib/types/event.type";
import {MapPin, CalendarDays, Clock, Heart} from "lucide-react";
import { useState } from "react";
import { formatDate } from "@/lib/helpers/formatter";
import { format } from "date-fns";

const EventCard = ({event, fav}: {event: EventItem, fav: boolean}) => {
    const [favourite, setFavourite] = useState<boolean>(fav);
    return (
        <Link
            href={`/admin/events/${event.slug}`}
            className="group flex flex-col gap-4"
        >
            <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
                <Button
                    type="button"
                    className="absolute top-2 right-2 z-10 rounded-full p-2 opacity-0 group-hover:opacity-100 max-sm:opacity-100 bg-secondary/30 text-white hover:bg-secondary/80 transition-colors duration-200"
                    onClick={(e) => {
                        e.preventDefault();
                        setFavourite(!favourite);
                    }}
                >
                    <Heart className="w-2 h-2" fill={favourite?"red":"none"}/>
                </Button>
                <Image
                    src={event.image||""}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                />
            </div>
            <div className="flex flex-col justify-start items-start gap-2 w-full">
                {event.venue && event.venue.mode !== "Online" && 
                <p className="flex flex-row items-center gap-1 text-xs max-sm:text-[10px] text-left text-muted-foreground font-semibold">
                    <MapPin className="w-3.5 h-3.5"/>
                    <span>
                        {`${event.venue.city}, ${event.venue.state ? `${event.venue.state}, `:""} ${event.venue.country}`}
                    </span>
                </p>}
                <h2 className="text-lg text-left text-primary max-sm:text-sm max-md: font-bold">
                    {event.title.trim()}
                </h2>
                <div className="grid grid-cols-2 w-full divide-x divide-muted-foreground/30">
                    <div className="flex flex-row w-full justify-start items-center gap-2 text-sm max-sm:text-[10px] tex-left text-muted-foreground font-semibold pr-3">
                        <CalendarDays className="w-4 h-4 max-sm:h-3 max-sm:w-3"/>
                        {event.start_datetime && 
                        <span>
                            {formatDate(event.start_datetime)}
                        </span>}
                    </div>
                    <div className="flex flex-row w-full justify-start items-center gap-2 text-sm max-sm:text-[10px] text-left text-muted-foreground font-semibold pl-3">
                        <Clock className="w-4 h-4 max-sm:h-3 max-sm:w-3"/>
                        {event.start_datetime && 
                        <span>
                            {format(new Date(event.start_datetime), "hh:mm a")}
                        </span>}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default EventCard