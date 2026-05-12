// app/bookings/page.tsx
'use client';

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import {
    Ticket, MapPin, Clock, Mail, Eye, X, Calendar, Globe,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";
import FilterChip from "@/components/filter-chip";
import SectionDivider from "@/components/section-divider";
import { BookingWithEventItem } from "@/lib/types";

type Filter = "all" | "upcoming" | "past";

const BookingsPage = () => {
    const [bookings, setBookings] = useState<BookingWithEventItem[]>([]);
    const [loading,  setLoading]  = useState<boolean>(true);
    const [filter,   setFilter]   = useState<Filter>("all");

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const res  = await fetch("/api/events/booking");
                const body = await res.json();
                if (!res.ok) throw new Error(body.message);
                setBookings(body.bookings ?? []);
            } catch (err: any) {
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const { upcoming, past } = useMemo(() => {
        const now = new Date();
        const upcoming: BookingWithEventItem[] = [];
        const past:     BookingWithEventItem[] = [];

        bookings.forEach((b) => {
            if (!b.event_id) return;   // event may have been deleted
            const endsAt = new Date(b.event_id.end_datetime);
            if (endsAt >= now) upcoming.push(b);
            else               past.push(b);
        });

        // Sort each group
        upcoming.sort((a, b) =>
            +new Date(a.event_id.start_datetime) - +new Date(b.event_id.start_datetime)
        );
        past.sort((a, b) =>
            +new Date(b.event_id.start_datetime) - +new Date(a.event_id.start_datetime)
        );

        return { upcoming, past };
    }, [bookings]);

    const handleCancel = async (bookingId: string, eventId: string) => {
        if (!confirm("Are you sure you want to cancel this booking?")) return;

        try {
            const res = await fetch("/api/events/booking", {
                method:  "DELETE",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify({ event_id: eventId }),
            });

            const body = await res.json();
            if (!res.ok) throw new Error(body.message);

            setBookings(prev => prev.filter(b => b._id !== bookingId));
            toast.success("Booking cancelled");
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    const showUpcoming = filter === "all" || filter === "upcoming";
    const showPast     = filter === "all" || filter === "past";

    const thisMonth = useMemo(() => {
        const now = new Date();
        return upcoming.filter(b => {
            const d = new Date(b.event_id.start_datetime);
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        }).length;
    }, [upcoming]);

    return (
        <div className="flex flex-col w-full min-h-dvh">

            {/* Header */}
            <section className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-primary">My bookings</h1>
                    <p className="text-sm text-muted-foreground font-semibold mt-1">
                        Tickets and registrations for events you've booked
                    </p>
                    <Badge variant="secondary" className="mt-3 rounded-full">
                        <Ticket className="w-3 h-3 mr-1" />
                        {upcoming.length} active bookings
                    </Badge>
                </div>

                {bookings.length > 0 && (
                    <div className="flex gap-2">
                        <FilterChip active={filter === "all"}      onClick={() => setFilter("all")}      text="All" />
                        <FilterChip active={filter === "upcoming"} onClick={() => setFilter("upcoming")} text="Upcoming" />
                        <FilterChip active={filter === "past"}     onClick={() => setFilter("past")}     text="Past" />
                    </div>
                )}
            </section>

            {/* Stats */}
            {bookings.length > 0 && (
                <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-3 mb-6">
                    <StatBox label="Upcoming"    value={upcoming.length} />
                    <StatBox label="Past"        value={past.length} />
                    <StatBox label="This month"  value={thisMonth} />
                </div>
            )}

            <div className="relative w-full min-h-75">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-md z-10">
                        <Loader />
                    </div>
                )}

                {/* Empty */}
                {!loading && bookings.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 px-6 border border-dashed border-muted-foreground/40 bg-muted/30 rounded-lg">
                        <Ticket className="w-8 h-8 text-muted-foreground mb-3" />
                        <h3 className="font-bold text-primary mb-1">No bookings yet</h3>
                        <p className="text-sm text-muted-foreground mb-4 max-w-sm text-center">
                            You haven't booked any events. Find one to attend!
                        </p>
                        <Button variant="secondary" asChild>
                            <Link href="/events">Browse events</Link>
                        </Button>
                    </div>
                )}

                {/* Results */}
                {!loading && bookings.length > 0 && (
                    <div className="flex flex-col w-full">

                        {showUpcoming && upcoming.length > 0 && (
                            <>
                                <SectionDivider label="upcoming" count={upcoming.length} />
                                <div className="flex flex-col gap-3 mb-6">
                                    {upcoming.map((b) => (
                                        <BookingTicket
                                            key={b._id}
                                            booking={b}
                                            past={false}
                                            onCancel={() => handleCancel(b._id, b.event_id._id)}
                                        />
                                    ))}
                                </div>
                            </>
                        )}

                        {showPast && past.length > 0 && (
                            <>
                                <SectionDivider label="past" count={past.length} />
                                <div className="flex flex-col gap-3">
                                    {past.map((b) => (
                                        <BookingTicket
                                            key={b._id}
                                            booking={b}
                                            past={true}
                                            onCancel={() => {}}
                                        />
                                    ))}
                                </div>
                            </>
                        )}

                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingsPage;

// ── Sub-components ───────────────────────────────────────────

const StatBox = ({ label, value }: { label: string; value: number }) => (
    <div className="bg-muted/40 rounded-md p-4">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
);

const BookingTicket = ({
    booking,
    past,
    onCancel,
}: {
    booking:  BookingWithEventItem;
    past:     boolean;
    onCancel: () => void;
}) => {
    const event = booking.event_id;
    const start = new Date(event.start_datetime);

    // Check if cancellation is still possible
    const deadline = new Date(event.registration_deadline);
    const canCancel = !past && new Date() < deadline;

    return (
        <div className={`grid grid-cols-[100px_1fr_auto] max-sm:grid-cols-1 bg-background border border-border rounded-lg overflow-hidden ${past ? "opacity-65" : ""}`}>

            {/* Thumbnail with date stamp */}
            <div className="relative bg-muted flex items-center justify-center min-h-24 max-sm:h-32">
                {event.image ? (
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        sizes="100px"
                        className="object-cover"
                    />
                ) : (
                    <Calendar className="w-6 h-6 text-muted-foreground" />
                )}
                <div className="absolute bottom-2 left-2 right-2 bg-background/95 rounded-md py-1 text-center">
                    <p className="text-[9px] font-bold text-primary uppercase leading-none">
                        {format(start, "MMM")}
                    </p>
                    <p className="text-base font-bold text-primary leading-tight">
                        {format(start, "dd")}
                    </p>
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-col justify-between p-4 max-sm:p-3 border-x border-dashed border-border min-w-0">
                <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <h3 className="font-bold text-primary truncate">{event.title}</h3>
                        <Badge variant="secondary" className="text-[10px] rounded-full">
                            {event.venue?.mode}
                        </Badge>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                            {event.venue?.mode === "Online"
                                ? <><Globe className="w-3 h-3" />Virtual event</>
                                : <><MapPin className="w-3 h-3" />{event.venue?.city}, {event.venue?.country}</>
                            }
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {format(start, "h:mm a")}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
                    <Mail className="w-3 h-3" />
                    booked with {booking.email}
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col justify-between items-end p-4 max-sm:p-3 max-sm:flex-row max-sm:items-center gap-2 min-w-[120px]">
                <Badge variant={past ? "secondary" : "default"} className="text-xs">
                    {past ? "Attended" : "Booked"}
                </Badge>
                <div className="flex gap-1.5">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={`/events/${event.slug}`}>
                            <Eye className="w-3 h-3 mr-1" /> View
                        </Link>
                    </Button>
                    {canCancel && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={onCancel}
                        >
                            <X className="w-3 h-3 mr-1" /> Cancel
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};