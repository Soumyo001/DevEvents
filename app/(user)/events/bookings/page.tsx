'use client'
import SectionDivider from "@/components/section-divider"
import FilterChip from "@/components/filter-chip"
import { Suspense, useEffect, useMemo, useState } from "react";
import { BookingWithEventItem } from "@/lib/types";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Ticket, TicketCheck, MapPin, Mail, Globe, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import BookingTicket from "@/components/booking-ticket";
import Loader from "@/components/loader";

type Filter = "all"|"upcoming"|"past";
const BookingsPageContent = () => {
    const [filter, setFilter] = useState<Filter>("all");
    const [bookedEvents, setBookedEvents] = useState<BookingWithEventItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBookedEvents = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/events/booking');
                const body = await res.json();
                if(!res.ok) throw new Error(body.message);
                setBookedEvents(body.bookings);
            } catch (err: any) {
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchBookedEvents();
    }, []);

    const handleCancel = async (booking_id: string, event_id: string) => {
        if(!confirm("Are you sure you want to cancel this booking ?")) return;
        try {
            const res = await fetch('/api/events/booking', {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({event_id})
            });
            const body = await res.json();
            if(!res.ok) throw new Error(body.message);
            setBookedEvents(prev => prev.filter(item => item._id !== booking_id));
            toast.success(body.message);
        } catch (err: any) {
            toast.error(err.message);
        }
    }

    const upcoming = useMemo(() => {
        const now = new Date();
        return bookedEvents.filter(e => new Date(e.event_id.start_datetime) >= now);
    }, [bookedEvents]);

    const past = useMemo(() => {
        const now = new Date();
        return bookedEvents.filter(e => new Date(e.event_id.start_datetime) < now);
    }, [bookedEvents]);

    return (
      <div className="flex flex-col items-start w-full">
        <section className="mb-7 flex flex-wrap justify-between items-end gap-3 w-full">
            <div className="flex-1">
                <h1 className="text-2xl text-primary text-left font-bold">My bookings</h1>
                <p className="text-sm text-muted-foreground text-left font-semibold mb-3 mt-1">Tickets and registrations for events you've booked</p> 
                <Badge variant={"secondary"} className="rounded-full p-3">
                    <Ticket className="w-4 h-4 mr-1"/>
                    {bookedEvents.length} active bookings
                </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
                <FilterChip
                    active={filter === "all"}
                    onClick={() => setFilter("all")}
                    text="All"
                />
                <FilterChip
                    active={filter === "upcoming"}
                    onClick={() => setFilter("upcoming")}
                    text="Upcoming"
                />
                <FilterChip
                    active={filter === "past"}
                    onClick={() => setFilter("past")}
                    text="Past"
                />
            </div>
        </section>
        <div className="flex flex-col items-start w-full">
            {loading ? (
                <div className="flex justify-center items-center w-full min-h-75 py-20">
                    <Loader/>
                </div>
            ):(
                bookedEvents.length === 0 ? (
                    <div className="flex flex-col justify-center items-center w-full py-20 px-6 border border-dashed border-muted-foreground/40 bg-muted/30 rounded-md">
                        <TicketCheck className="h-8 w-8 text-muted-foreground mb-3"/>
                        <h3 className="text-base text-primary text-center font-bold">No bookings yet</h3>
                        <p className="text-xs text-muted-foreground text-center font-semibold max-w-sm">You haven't booked any events. Find one to attend!</p>
                    </div>
                ):(
                    <>
                        {bookedEvents.length > 0 && filter === "all" && <div className="flex flex-col items-start justify-start w-full gap-3">
                            <SectionDivider label="All" count={bookedEvents.length}/>
                            {bookedEvents.map(e => 
                                    <BookingTicket
                                        key={e._id}
                                        booking={e}
                                        past={false}
                                        onCancel={() => handleCancel(e._id, e.event_id._id)}
                                    />
                                )
                            }
                        </div>}
                        {upcoming.length > 0 && filter === "upcoming" && <div className="flex flex-col items-start justify-start w-full gap-3">
                            <SectionDivider label="Upcoming" count={upcoming.length}/>
                            {upcoming.map(e => 
                                    <BookingTicket
                                        key={e._id}
                                        booking={e}
                                        past={false}
                                        onCancel={() => handleCancel(e._id, e.event_id._id)}
                                    />
                                )
                            }
                        </div>}
                        {past.length > 0 && filter === "past" && <div className="flex flex-col items-start justify-start w-full gap-3">
                            <SectionDivider label="Past" count={past.length}/>
                            {past.map(e => 
                                    <BookingTicket
                                        key={e._id}
                                        booking={e}
                                        past={true}
                                        onCancel={() => {}}
                                    />
                                )
                            }
                        </div>}
                    </>
                )
            )}
        </div>
      </div>
    )
}

const BookingsPage = () => {
    return (
        <Suspense fallback={
            <div className='flex justify-center items-center w-full min-h-dvh'>
              <Loader/>
            </div>
        }>
            <BookingsPageContent/>
        </Suspense>
    )
}

export default BookingsPage