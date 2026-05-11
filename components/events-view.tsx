'use client';

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Search, ImageIcon, Calendar, MapPin, Edit, Trash2, ChevronRight } from "lucide-react";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { format } from "date-fns";
import EventsMobileView from "@/components/events-mobile-view";
import { EventItem } from "@/lib/types";
import Loader from "@/components/loader";

const PER_PAGE = 10;

const EventsManagementPage = ({isAdmin = false}: {isAdmin: boolean}) => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/events');
        const body = await res.json();
        setEvents(body.events);
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const handleDelete = async(slug: string) => {
    try {
        if(!confirm("Are you sure you want to delete this event ?")) return;
        const res = await fetch(`/api/events/${slug}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        });
        const body = await res.json();
        if(!res.ok) throw new Error(body.message);
        setEvents(prev => prev.filter(event => event.slug !== slug));
        toast.success("Event successfully deleted");
    } catch (err: any) {
        toast.error(err.message);
    }
  }

  const filtered = useMemo(() => {
    const trimmed = search.toLowerCase().trim();
    if(!trimmed) return events;
    return events.filter((e) => e.title.toLowerCase().includes(trimmed)
                          || (e.venue.city?.toLowerCase().includes(trimmed) ?? false)
                          || (e.tags.length === 0
                                          ? false 
                                          : e.tags.some(tag => tag.toLowerCase().includes(trimmed))));
  }, [search, events]);
  const total_pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = useMemo(() => {
    return filtered.slice((page-1) * PER_PAGE, page * PER_PAGE);
  }, [filtered, page]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-wrap items-end justify-between gap-4 w-full mb-7">
        <div>
            <h1 className="text-3xl text-left text-primary font-bold">
              {isAdmin? "Event Management":"Browse all available events"}
            </h1>
            <p className="text-sm text-left text-muted-foreground font-semibold">
                {isAdmin? "Manage all events on the platform":"Browse all available events"}
            </p>
        </div>
        {isAdmin && <Button asChild>
          <Link href={"/admin/events/new"}>
            Add new event <Plus className="w-4 h-4 mr-1"/>
          </Link>
        </Button>}
      </div>
      <div className="relative max-w-sm mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4"/>
        <Input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-muted-foreground/40 pl-9"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center w-full min-h-75 py-20">
          <Loader/>
        </div>
      ):(
        filtered.length === 0 ? (
          <div className="flex flex-col justify-center items-center py-20 w-full border border-muted-foreground/30 border-dashed rounded-lg bg-muted/20">
            <Calendar className="w-8 h-8 text-muted-foreground mb-3"/>
            <h3 className="text-base text-primary font-bold mb-1">
              {search? "No events match your search":"No Events yet"}
            </h3>
            <p className="text-sm text-muted-foreground font-semibold mb-4">
              {search? "Try a different keyword":isAdmin
                                                    ? "Create your first event to get started"
                                                    : "Check back soon for upcoming events"}
            </p>
            {!search && isAdmin && <Button asChild>
              <Link href={`/admin/events/new`}>
                <Plus className="w-4 h-4 mr-1"/>
                Create your first event
              </Link>
            </Button>}
          </div>
        ):(
          <>
            <div className="hidden md:block w-full rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/40 hover:bg-muted/40!">
                  <TableRow>
                    <TableHead className="w-75">Event</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Booked</TableHead>
                    {isAdmin && <TableHead className="text-right">Action</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginated.map(event => (
                    <TableRow>
                      <TableCell>
                        <div className="flex gap-3 items-center">
                          {event.image ? (
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                              <Image
                                src={event.image}
                                alt={event.title}
                                fill
                                sizes="80px"
                                className="object-cover"
                              />
                            </div>
                          ):(
                            <div className="w-10 h-10 flex justify-center items-center border border-border rounded-lg bg-background">
                              <ImageIcon className="w-7 h-7"/>
                            </div>
                          )}
                          <Link 
                            href={`/admin/events/${event.slug}`}
                            className="font-semibold hover:text-primary transition-colors duration-200"
                          >
                            {event.title}
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-muted-foreground text-left font-semibold">
                          {event.venue.mode === "Online" 
                                                  ? "Virtual event"
                                                  :`${event.venue.city}, ${event.venue.country}`}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-left text-muted-foreground font-semibold">
                          {format(new Date(event.start_datetime), "do MMM, yyyy")}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-left text-muted-foreground font-semibold">
                          {`${format(new Date(event.start_datetime), "hh:mm a")} - ${format(new Date(event.end_datetime), "hh:mm a")}`}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge variant={"secondary"}>
                          {!event.capacity? "UNLIMITED": `${event.bookingCount} / ${event.capacity}`}
                        </Badge>
                      </TableCell>
                      {isAdmin && <TableCell>
                        <div className="flex gap-2 items-center justify-end">
                          <Button 
                            type="button" 
                            variant={"ghost"} 
                            size={"icon-sm"} asChild
                          >
                            <Link href={`/admin/events/${event.slug}/edit`}>
                              <Edit className="w-4 h-4"/>
                            </Link>
                          </Button>
                          <Button
                            type="button"
                            variant={"ghost"}
                            size={"icon-sm"}
                            className="text-destructive hover:text-destructive cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              handleDelete(event.slug);
                            }}
                          >
                            <Trash2 className="h-4 w-4"/>
                          </Button>
                        </div>
                      </TableCell>}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="md:hidden flex flex-col gap-3">
              {paginated.map(event => 
                <EventsMobileView
                  event={event}
                  isAdmin={isAdmin}
                  onDelete={handleDelete}
                />
              )}
            </div>
            {total_pages > 1 && <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if(page > 1) setPage(page - 1);
                    }}
                    className={page === 1 ? "pointer-events-none opacity-50":""}
                  />
                </PaginationItem>
                <PaginationItem>
                  <span className="text-sm text-muted-foreground text-center px-3">
                    {`Page ${page} of ${total_pages}`}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if(page < total_pages) setPage(page + 1);
                    }}
                    className={page === total_pages ? "pointer-events-none opacity-50":""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>}
          </>
        )
      )}
    </div>
  )
};

export default EventsManagementPage;