'use client'
import { use, useEffect, useState } from 'react';
import { EventItem } from '@/lib/types/event.type';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import DisplayBookingSection from '@/components/display-booking-section';

const EventBySlug = ({params}: {params: Promise<{slug: string}>}) => {
  const { slug } = use(params);
  const [event, setEvent] = useState<EventItem|undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/events/${slug}`);
        const body = await res.json();
        if(!res.ok) throw new Error(body.message);
        setEvent(body.event);
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [slug]);
  return (
    <div className='relative w-full min-h-dvh flex flex-col justify-start items-start'>
      {loading ? (
        <div className='absolute inset-0 flex justify-center items-center bg-background/60 backdrop-blur-sm'>
          <Loader2 className='w-8 h-8 animate-spin text-muted-foreground'/>
        </div>
      ):(
        <div className='flex flex-col justify-start items-start border-4 w-full'>
          <div className='flex flex-col items-start justify-start gap-2 mb-15'>
            <h1 className='text-5xl text-primary text-left font-bold'>{event?.title}</h1>
            <p className='text-sm text-muted-foreground'>{event?.description}</p>
          </div>
          <DisplayBookingSection image={event?.image} title={event?.title}/>
          <div className='mb-7'>
            <h3 className='text-2xl text-left font-bold text-primary'>Overview</h3>
            <p className='text-[15px] text-left font-normal text-primary'>{event?.overview}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventBySlug