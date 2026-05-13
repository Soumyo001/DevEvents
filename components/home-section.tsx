'use client'
import EventCard from '@/components/event-card';
import ExploreButton from '@/components/explore-button';
import { EventItem } from '@/lib/types/event.type';
import { useEffect, useState } from 'react';
import Loader from '@/components/loader';
import { toast } from 'sonner';

const HomeSection = ({isAdmin = false}: {isAdmin: boolean}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [favEvents, setFavEvents] = useState<string[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const [eventRes, favRes] = await Promise.all([
          fetch('/api/events/featured'),
          fetch('/api/events/favourites')
        ]);
        const eventBody = await eventRes.json();
        const favBody = await favRes.json();
        if(eventRes.ok)  setEvents(eventBody.events);
        if(favRes.ok) setFavEvents(favBody.events.map((item: EventItem) => item._id));

        if(!eventRes.ok && !favRes.ok) throw new Error([eventBody.message, favBody.message].join(", "));
        else if(!eventRes.ok) throw new Error(eventBody.message);
        else if(!favRes.ok) throw new Error(favBody.message);
      } catch (err: any) { 
        toast.error(`Unknow error occured: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);


  return (
    <div
      className='flex flex-col justify-start items-center w-full'
    >
      <section className='flex flex-col items-center justify-center w-full'>
        <h1 className='text-center text-6xl font-semibold leading-17 tracking-tighter max-sm:text-4xl'>
          The Hub for Every Dev <br/> Event You Can't Miss
        </h1>
        <p className='text-center mt-5 font-schibsted-grotesk'>
          Hackathons, Meetups and Conferences, All in One place
        </p>
        <ExploreButton
          onClick={()=>console.log("Clicked Explore Button!")}
        />
      </section>
      <div
        className='flex flex-col justify-start items-start gap-4 w-full mt-12'
      >
        <h3
          className='text-primary font-bold text-2xl max-sm:text-[18px] max-sm:p-4'
        >
          Featured Events
        </h3>
        <div className="relative grid grid-cols-3 gap-5 min-h-75 w-full max-md:grid-cols-1 max-sm:p-4">
          {loading? (
            <div className='absolute inset-0 bg-background/70 flex justify-center items-center'>
              <Loader/>  
            </div>
          ):(events.map((data) => 
            <EventCard
              key={data.slug}
              isAdmin={isAdmin}
              event={data}
              fav={favEvents.includes(data._id)}  
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeSection;