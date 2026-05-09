'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ImageIcon } from 'lucide-react'
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Field, FieldLabel, FieldGroup } from './ui/field';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';

const DisplayBookingSection = ({image, title, event_id}: {
                                    image: string|undefined, 
                                    title: string|undefined, 
                                    event_id: string|undefined
                                }) => {
    const [email, setEmail] = useState<string>("");
    const [booking, setBooking] = useState<boolean>(false);
    const handleClick = async () => {
        if(booking) return;
        setBooking(true);
        try {
            await toast.promise(
                fetch('/api/events/booking', {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({event_id, email})
                }).then(async res => {
                    const body = await res.json();
                    if(!res.ok) {
                        const errorMsg = body.errors 
                                    ? Object.values(body.errors).flat().join(", ")
                                    : body.message;
                        throw new Error(errorMsg);
                    }
                    return body.message;
                }),
                {
                    loading: "Booking your event...",
                    success: data => data,
                    error: (err: Error) => err.message ?? "Unknown error occured"
                }
            );
        } finally {
            setBooking(false);
        }
    }
    return (
        <div className='flex flex-row max-md:flex-col gap-7 w-full mb-7'>
            <div className='relative w-3/5 max-md:w-full min-h-75 aspect-auto max-md:aspect-video ovreflow-hidden'>
                {image? (
                    <Image
                        src={image}
                        alt={title || "image"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className='object-cover'
                    />
                ):(
                    <div className='flex justify-center items-center w-full h-full'>
                        <ImageIcon className='w-8 h-8 text-muted-foreground'/>
                    </div>
                )}
            </div>
            <div className='flex flex-col justify-start items-end w-2/5 max-md:w-full'>
                <Card className='max-w-md w-full max-md:max-w-full max-md:rounded-xs bg-background/40 gap-7 rounded-sm'>
                    <CardHeader>
                        <CardTitle className='text-2xl text-left font-bold'>
                            Book your spot
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor='booking-email'>Email Address</FieldLabel>
                                <Input
                                    type='email'
                                    id='booking-email'
                                    placeholder='enter your email address'
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='py-6 rounded-sm outline-none border-none'
                                />
                            </Field>
                            <Field>
                                <Button
                                    type='button'
                                    variant={'outline'}
                                    className='py-5 rounded-sm'
                                    disabled={booking}
                                    onClick={handleClick}
                                >
                                    {booking? "Booking...":"Submit"}
                                </Button>
                            </Field>
                        </FieldGroup>
                    </CardContent>
                </Card>
            </div>
        </div>
    ) 
}   

export default DisplayBookingSection