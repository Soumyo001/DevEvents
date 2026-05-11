'use client'
import { use, useEffect, useState } from 'react';
import { EventItem } from '@/lib/types/event.type';
import { toast } from 'sonner';
import Loader from '@/components/loader';
import { Calendar, Clock, MapPin, Monitor, Users } from "lucide-react";
import DisplayBookingSection from '@/components/display-booking-section';
import EventDetailsItem from '@/components/event-details-item';
import AgendaDisplaySection from '@/components/agenda-display-section';
import EventCard from '@/components/event-card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useDebouncedCallback } from 'use-debounce';
import { Heart } from 'lucide-react';

const EventBySlug = ({params}: {params: Promise<{slug: string}>}) => {
  const { slug } = use(params);
  const [event, setEvent] = useState<EventItem|undefined>(undefined);
  const [similarEvents, setSimilarEvents] = useState<EventItem[]>([]);
  const [favEventsID, setFavEventsID] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fav, setFav] = useState<boolean>(false);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const [eventRes, favRes] = await Promise.all([
          fetch(`/api/events/${slug}`),
          fetch(`/api/events/favourites`)
        ])
        const eventBody = await eventRes.json();
        const favBody = await favRes.json();
        if(!eventRes.ok) throw new Error(eventBody.message);
        const eventData: EventItem = eventBody.event;
        const similarEvents: EventItem[]= eventBody.similar_events;
        const favIDs: string[] = favBody.events.map((item: EventItem) => item._id);
        setEvent(eventData);
        setSimilarEvents(similarEvents);
        setFavEventsID(favIDs);
        setFav(favIDs.includes(eventData._id));
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [slug]);
  const debouncedSave = useDebouncedCallback(async(event_id: string|undefined, setAsFav: boolean) => {
    if(!event_id) return;
    try {
      const res = await fetch('/api/events/favourites', {
        method: setAsFav? "POST":"DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({event_id}),
      });
      const body = await res.json();
      if(!res.ok) throw new Error(body.message);
    } catch (err: any) {
      toast.error(err.message);
      setFav(!setAsFav);
    }
  }, 1000);
  return (
    <div className='relative w-full min-h-dvh flex flex-col justify-start items-start'>
      {loading ? (
        <div className='absolute inset-0 flex justify-center items-center bg-background/40 backdrop-blur-md rounded-md'>
          <Loader/>
        </div>
      ):(
        <div className='flex flex-col justify-start items-start w-full mb-7'>
          <div className='flex flex-wrap justify-between items-start gap-3 mb-15'>
            <div className='flex flex-col items-start gap-2'>
              <h1 className='text-5xl text-primary text-left font-bold'>{event?.title}</h1>
              <p className='text-sm text-muted-foreground'>{event?.description}</p>
            </div>
            <Button
              type='button'
              variant={"outline"}
              size={"sm"}
              onClick={(e) => {
                e.preventDefault();
                const newIsFav = !fav;
                setFav(newIsFav);
                debouncedSave(event?._id, newIsFav);
              }}
              className='cursor-pointer'
            >
              <Heart className='w-4 h-4 mr-1' fill={fav ? "red":""}/>
              {fav? "Marked as favourite":"Mark as favourite"}
            </Button>
          </div>
          <DisplayBookingSection image={event?.image} title={event?.title} event_id={event?._id}/>
          <div className='mb-7'>
            <h3 className='text-2xl text-left font-bold text-primary mb-3'>Overview</h3>
            <p className='text-[15px] text-left font-normal text-primary'>{event?.overview}</p>
          </div>
          <div className='mb-7 space-y-3'>
            <h3 className='text-2xl text-primary text-left font-bold mb-3'>Event Details</h3>
            {event?.start_datetime && event.end_datetime &&
              <EventDetailsItem
                Icon={Calendar}
                text={`Date: ${format(new Date(event.start_datetime), "do MMMM, yyyy")} - ${format(new Date(event.end_datetime), "do MMMM, yyyy")}`}
              />

            }
            {event?.start_datetime && event.end_datetime &&
              <EventDetailsItem
                Icon={Clock}
                text={`Time: ${format(new Date(event.start_datetime), "hh:MM a")} - ${format(new Date(event.end_datetime), "hh:MM a")}`}
              />
            }
            {event?.venue && event.venue.mode !== "Online" && 
              <EventDetailsItem
                Icon={MapPin}
                text={`Venue: ${event.venue.name}, ${event.venue.state? `${event.venue.state}, `:""}${event.venue.city}, ${event.venue.country}`}
              />
            }
            {event?.venue && 
              <EventDetailsItem
                Icon={Monitor}
                text={`Mode: ${event.venue.mode === "Hybrid"? `${event.venue.mode} (In-person + Online Streaming)`:event.venue.mode}`}
              />
            }
            {event?.audience && 
              <EventDetailsItem
                Icon={Users}
                text='Audience:'
                audience={event.audience}
              />
            }
          </div>
          {event?.agenda && event.agenda.length !== 0 && <div className='mb-7 space-y-3'>
            <h3 className='text-2xl text-primary text-left font-bold mb-3'>Agenda</h3>
            <AgendaDisplaySection agenda={event.agenda}/>
          </div>}
            <div className='mb-7 space-y-3'>
              <h3 className='text-2xl text-left text-primary font-bold mb-3'>{`About the Organizer (${event?.organizer.organizer_name})`}</h3>
              <p>{event?.organizer.description}</p>
            </div>
            {event?.tags && <div className='flex flex-wrap gap-2 mb-7'>
              {event.tags.map((item, index) => (
                <Badge
                  key={index}
                  className='p-3 rounded-sm bg-accent text-primary font-bold max-md:text-sm text-md'
                >
                  {item}
                </Badge>
              ))}
            </div>}
            {similarEvents.length > 0 && <div className='mt-10 space-y-3'>
              <h3 className='text-xl text-left text-primary font-bold'>Similar Events</h3>
              <div className='grid grid-cols-3 max-sm:grid-cols-1 gap-3'>
                {similarEvents.map(event => 
                  <EventCard 
                    key={event.slug} 
                    event={event} 
                    fav={favEventsID.includes(event._id)}
                  />
                )}
              </div>
            </div>}
        </div>
      )}
    </div>
  )
}

export default EventBySlug