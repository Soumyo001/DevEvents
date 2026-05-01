'use client'
import EventCard from '@/components/event-card';
import ExploreButton from '@/components/explore-button';
import { EventItem } from '@/lib/types/event.type';
import { useEffect, useState } from 'react';

const page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(body => setEvents(body.events));
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
        <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1 max-md:w-full max-sm:p-4">
          {events.map((data: EventItem, index) => 
            <EventCard
              key={index}
              event={data}
              fav={false}  
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default page;