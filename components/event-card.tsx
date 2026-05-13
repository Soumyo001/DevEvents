'use client'
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { EventItem } from "@/lib/types/event.type";
import {MapPin, CalendarDays, Clock, Heart, ImageIcon, Globe} from "lucide-react";
import { useState } from "react";
import { formatDate } from "@/lib/helpers/formatter";
import { format } from "date-fns";
import { useDebouncedCallback } from "use-debounce";
import { toast } from "sonner";

const EventCard = ({event, fav, isAdmin = false}: {event: EventItem, fav?: boolean, isAdmin: boolean}) => {
    const [isFav, setIsFav] = useState<boolean|undefined>(fav);
    const debouncedSave = useDebouncedCallback(async(event_id: string, setAsFav: boolean) => {
        try {
            const res = await fetch("/api/events/favourites", {
                method: setAsFav? "POST":"DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({event_id}),
            });
            const body = await res.json();
            if(!res.ok) throw new Error(body.message);
        } catch (err: any) {
            toast.error(err.message);
            setIsFav(!setAsFav);
        }
    }, 500);
    return (
        <Link
            href={isAdmin ? `/admin/events/${event.slug}`:`/events/${event.slug}`}
            className="group flex flex-col gap-4"
        >
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <Button
                    type="button"
                    className="absolute top-2 right-2 z-10 rounded-full p-2 opacity-0 group-hover:opacity-100 max-md:opacity-100 bg-secondary/30 hover:bg-secondary/80 transition-colors duration-200"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const newIsFav = !isFav;
                        setIsFav(newIsFav);
                        debouncedSave(event._id, newIsFav);
                    }}
                >
                    <Heart className="w-4 h-4 text-white" fill={isFav?"red":"none"}/>
                </Button>
                {event.image?(
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        loading="eager"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                ):(
                    <div className="w-full h-full flex flex-col items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-muted-foreground"/>
                    </div>
                )}
            </div>
            <div className="flex flex-col justify-start items-start gap-2 w-full">
                <p className="flex flex-row justify-start items-center gap-1 text-xs max-sm:text-[10px] text-left text-muted-foreground font-semibold">
                    {event.venue && event.venue.mode !== "Online" ? (
                        <>
                            <MapPin className="w-3.5 h-3.5"/>
                            <span>
                                {`${event.venue.city}, ${event.venue.state ? `${event.venue.state}, `:""}${event.venue.country}`}
                            </span>
                        </>
                    ):(
                        <>
                            <Globe className="w-3.5 h-3.5"/>
                            <span>Virtual event</span>
                        </>
                    )}
                </p>
                <h2 className="text-lg max-sm:text-sm text-left text-primary font-bold">
                    {event.title.trim()}
                </h2>
                <div className="grid grid-cols-2 w-fit divide-x divide-muted-foreground/30">
                    <div className="flex flex-row justify-start items-center gap-2 text-sm max-sm:text-[10px] text-left text-muted-foreground font-semibold pr-3">
                        <CalendarDays className="w-4 h-4 max-sm:h-3 max-sm:w-3"/>
                        {event.start_datetime && 
                        <span>
                            {formatDate(event.start_datetime)}
                        </span>}
                    </div>
                    <div className="flex flex-row justify-start items-center gap-2 text-sm max-sm:text-[10px] text-left text-muted-foreground font-semibold pl-3">
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