'use client'
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Globe, Clock, Calendar, Eye, X } from "lucide-react";
import Image from "next/image";
import { BookingWithEventItem } from "@/lib/types";
import { Button } from "./ui/button";
import Link from "next/link";
import { format } from "date-fns";


const BookingTicket = ({
    booking,
    past,
    onCancel,
}: {
    booking:  BookingWithEventItem,
    past:     boolean,
    onCancel: () => void
}) => {
    const event = booking.event_id;
    const start = new Date(event.start_datetime);
    const deadline = new Date(event.registration_deadline);
    const canCancel = !past && new Date() < deadline;

    return (
        <div className={`grid grid-cols-[100px_1fr_auto] max-sm:grid-cols-1 bg-background w-full border border-border rounded-lg overflow-hidden ${past? "opacity-50":""}`}>
            <div className="relative flex justify-center items-center bg-muted/70 min-h-24 max-sm:h-32">
                {event.image ? (
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        sizes='150px'
                        className="object-cover"
                    />
                ):(
                    <Calendar className="w-8 h-8 text-muted-foreground"/>
                )}
                <div className="absolute left-2 right-2 bottom-1 bg-background/70 rounded-md text-center py-1">
                    <p className="text-[9px] text-primary font-bold uppercase leading-none">
                        {format(start, "MMM")}
                    </p>
                    <p className="text-base text-primary font-bold leading-tight tracking-tighter">
                        {format(start, "dd")}
                    </p>
                </div>
            </div>
            <div className="p-4 max-sm:p-3 border-x border-border border-dashed flex flex-col justify-between items-left min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h3 className="text-primary font-bold truncate">
                        {event.title}
                    </h3>
                    <Badge variant={"secondary"} className="text-[10px] rounded-full">
                        {event.venue.mode}
                    </Badge>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex gap-1 items-center">
                        {event.venue.mode === "Online" ? (
                            <>
                                <Globe className="w-3 h-3 shrink-0"/> Virtual event
                            </>
                        ):(
                            <>
                                <MapPin className="w-3 h-3 shrink-0"/> {`${event.venue.city}, ${event.venue.country}`}
                            </>
                        )}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 shrink-0"/> {format(start, "hh:mm a")}
                    </span>
                </div>
                <div className="text-xs text-left text-muted-foreground flex flex-row gap-1.5 items-center border-t border-border mt-2 pt-2">
                    <Mail className="w-3 h-3 shrink-0"/>
                    <span>booked with {booking.email}</span>
                </div>
            </div>
            <div className="flex flex-col justify-between items-end p-4 max-sm:p-3 max-sm:flex-row max-sm:items-center gap-2 min-w-30">
                <Badge variant={past? "secondary":"default"} className="text-xs">
                    {past ? "Attended":"Booked"}
                </Badge>
                <div className="flex gap-2">
                    <Button type="button" size={"sm"} variant={"outline"} asChild>
                        <Link href={`/events/${event.slug}`}>
                            <Eye className="w-3 h-3 mr-1"/>
                            View
                        </Link>
                    </Button>
                    {canCancel && <Button 
                        type="button" 
                        size={"sm"} 
                        variant={"outline"}
                        className="text-destructive hover:text-destructive cursor-pointer"
                        onClick={onCancel}
                    >
                        <X className="w-3 h-3 mr-1"/>
                        Cancel
                    </Button>}
                </div>
            </div>
        </div>
    );
};

export default BookingTicket