import { EventItem } from '@/lib/types/event.type'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, EditIcon, ImageIcon, MapPin, Trash2 } from 'lucide-react'
import { ChevronRight } from 'lucide-react'
import { format } from 'date-fns'
import { Button } from './ui/button'

const EventsMobileView = ({event, isAdmin, onDelete}: {
    event: EventItem,
    isAdmin: boolean,
    onDelete: (slug: string) => void
}) => {
  return (
    <div className='flex flex-col gap-3 p-3 rounded-lg border border-border bg-background'>
        <Link 
            href={isAdmin? `/admin/events/${event.slug}`:`/events/${event.slug}`} 
            className="flex gap-3"
        >
            <div className='relative w-14 h-14 rounded-md overflow-hidden shrink-0 bg-muted/50'>
                {event.image?(
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        sizes="80px"
                        className='object-cover'
                    />
                ):(
                    <div className='flex justify-center items-center h-14 w-14'>
                        <ImageIcon className='w-10 h-10 text-muted-foreground opacity-60'/>
                    </div>
                )}
            </div>
            <div className='flex-1 min-w-0'>
                <h1 className='text-primary font-semibold truncate'>{event.title}</h1>
                <p className='flex items-center gap-2 text-xs text-muted-foreground'>
                    <MapPin className='w-3 h-3'/>
                    {event.venue.mode === "Online"
                                    ? "Virtual event"
                                    : `${event.venue.city}, ${event.venue.country}`}
                </p>
                <p className='flex items-center text-xs text-muted-foreground gap-2'>
                    <Calendar className='w-3 h-3'/>
                    {format(new Date(event.start_datetime), "do MMM, yyyy · hh:mm a")}
                </p>
            </div>
            <ChevronRight className='w-4 h-4 text-muted-foreground self-center'/>
        </Link>
        {isAdmin && <div className='border-t border-border pt-2 flex gap-2'>
            <Button type='button' variant={'outline'} size={'sm'} className='flex-1' asChild>
                <Link href={`/admin/events/${event.slug}/edit`}>
                    <EditIcon className='w-4 h-4'/>
                    Edit
                </Link>
            </Button>
            <Button 
                type='button'
                variant={'outline'} 
                size='sm' 
                className='text-destructive hover:text-destructive flex-1'
                onClick={(e) => {
                    e.preventDefault();
                    onDelete(event.slug);
                }}
            >
                <Trash2 className='w-4 h-4'/>
                Delete
            </Button>
        </div>}
    </div>
  )
}

export default EventsMobileView