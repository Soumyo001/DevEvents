'use client'
import EventForm from '@/components/event-form';
import Loader from '@/components/loader';
import { EventItem } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState, Suspense } from 'react'
import { toast } from 'sonner';

const EditEventContent = ({params}: {params: Promise<{slug: string}>}) => {
    const { slug } = use(params);
    const [loading, setLoading] = useState<boolean>(false);
    const [event, setEvent] = useState<EventItem>();
    const router = useRouter();

    useEffect(() => {
        const fetchEvent = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/events/${slug}`);
                const body = await res.json();
                if(!res.ok) throw new Error(body.message);
                const fetchedEvent: EventItem = body.event;
                setEvent(fetchedEvent);
            } catch (err: any) {
                toast.error(err.message);
                router.push('/admin/events');
            } finally {
                setLoading(false);
            }
        }
        fetchEvent();
    }, [slug, router]);

    return <EventForm mode='edit' initialData={event} slug={slug}/>;
}

const EditEventPage = ({params}: {params: Promise<{slug: string}>}) => {


    return (
        <Suspense fallback={
            <div className='flex items-center justify-center w-full min-h-75'>
                <Loader/>
            </div>
        }>
            <EditEventContent params={params}/>
        </Suspense>
    )
}

export default EditEventPage