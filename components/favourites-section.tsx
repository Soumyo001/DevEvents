'use client'
import Loader from "@/components/loader"
import { EventItem } from "@/lib/types"
import { Suspense, useEffect, useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Heart, HeartCrack, Search, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import SectionDivider from "@/components/section-divider"
import EventCard from "@/components/event-card"
import FilterChip from "@/components/filter-chip"

type Filter = "upcoming"|"past"|"all";

const FavouritesContent = ({isAdmin = false}: {isAdmin: boolean}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const [filter, setFilter] = useState<Filter>("all");
    const [favEvents, setFavEvents] = useState<EventItem[]>([]);
    
    useEffect(() => {
      const fetchEvents = async () => {
        setLoading(true);
        try {
          const res = await fetch('/api/events/favourites');
          const body = await res.json();
          if(!res.ok) throw new Error(body.message);
          setFavEvents(body.events);
        } catch (err: any) {
          toast.error(err.message);
        } finally {
          setLoading(false);
        }
      }
      fetchEvents();
    },[]);

    const filtered = useMemo(() => {
      const trimmed = search.toLowerCase().trim();
      return favEvents.filter((event) => {
        if(trimmed) {
          const hasTitle = event.title.toLowerCase().includes(trimmed);
          const hasTag = event.tags.length === 0 ? false : event.tags.some(e => e.toLowerCase().includes(trimmed));
          const hasCity = event.venue.city?.toLowerCase().includes(trimmed) ?? false;
          if(!hasTitle && !hasTag && !hasCity) return false;
        }
        return true;
      });
    }, [search, favEvents]);

    const upcoming = useMemo(() => {
      const now = new Date();
      return filtered.filter((event) => new Date(event.start_datetime) >= now);
    }, [filtered]);

    const past = useMemo(() => {
      const now = new Date();
      return filtered.filter(event => now > new Date(event.start_datetime));
    }, [filtered]);

    return (
      <div className='flex flex-col w-full'>
        <section className="mb-7">
          <h1 className="text-2xl text-primary text-left font-bold">Your favourites</h1>
          <p className="text-sm text-muted-foreground text-left font-semibold mb-2 mt-1">Events you've saved to revisit later</p>
          <Badge variant={"secondary"} className="p-3 rounded-full">
            {favEvents.length == 0 ? (
              <HeartCrack className="w-4 h-4"/>
            ):(
              <Heart className="w-4 h-4"/>
            )}
            {favEvents.length} events saved
          </Badge>
        </section>
        <div className="flex flex-col items-start w-full">
          {favEvents.length > 0 && <div className="flex flex-wrap gap-2 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 max-sm:w-3 max-sm:h-3 text-muted-foreground"/>
              <Input
                type="text"
                size={32}
                placeholder="Search favourites..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-sm pl-9 max-sm:pl-7 max-sm:text-xs max-sm:w-45 border-muted-foreground/30"
              />
            </div>
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
          </div>}
          <div className="flex flex-col justify-start items-start w-full">
            {loading? (
              <div className="flex items-center justify-center w-full min-h-75 py-20 bg-background/40 backdrop-blur-md">
                <Loader/>
              </div>
            ):(
              filtered.length === 0 ? (
                <div className="flex flex-col justify-center items-center w-full py-20 px-6 border border-dashed border-muted-foreground/40 bg-muted/30 rounded-lg">
                  <Heart className="w-8 h-8 text-muted-foreground mb-3"/>
                  <h3 className="text-base max-sm:text-sm text-primary text-center font-bold">No Favourites yet</h3>
                  <p className="text-sm max-sm:text-xs text-muted-foreground text-center font-semibold max-w-sm mb-4">Browse events and tap the heart to save them here</p>
                  <Button variant={"secondary"} asChild>
                    <Link href={isAdmin? "/admin/home":"/home"}>
                      Explore events <ArrowRight className="h-3 w-3 ml-1"/>
                    </Link>
                  </Button>
                </div>
              ):(
                <div className="flex flex-col justify-start items-start w-full">
                  {upcoming.length > 0 && filter === "upcoming" && <>
                    <SectionDivider label="upcoming" count={upcoming.length}/>
                    <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4">
                      {upcoming.map(event => 
                        <EventCard
                          key={event.slug}
                          isAdmin={isAdmin}
                          event={event}
                          fav={true}
                        />
                      )}
                    </div>
                  </>}
                  {past.length > 0 && filter === "past" && <>
                    <SectionDivider label="past" count={past.length}/>
                    <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4">
                      {past.map(event => 
                        <EventCard
                          key={event.slug}
                          isAdmin={isAdmin}
                          event={event}
                          fav={true}
                        />
                      )}
                    </div>
                  </>}
                  {filtered.length > 0 && filter === "all" && <>
                    <SectionDivider label="All" count={filtered.length}/>
                    <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4">
                      {filtered.map(event => 
                        <EventCard
                          key={event.slug}
                          isAdmin={isAdmin}
                          event={event}
                          fav={true}
                        />
                      )}
                    </div>
                  </>}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    )
}

const FavouritesSection = ({isAdmin = false}: {isAdmin: boolean}) => {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center w-full min-h-75 py-20 bg-background/40 backdrop-blur-md">
                <Loader/>
            </div>
        }>
            <FavouritesContent isAdmin={isAdmin}/>
        </Suspense>
    )
}

export default FavouritesSection