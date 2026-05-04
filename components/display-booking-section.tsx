'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ImageIcon } from 'lucide-react'
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Field, FieldLabel, FieldGroup, FieldDescription } from './ui/field';
import { Input } from './ui/input';
import { Button } from './ui/button';

const DisplayBookingSection = ({image, title}: {image: string|undefined, title: string|undefined}) => {
    const [email, setEmail] = useState<string>("");
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
            <div className='flex flex-col justify-start items-center w-2/5 max-md:w-full'>
                <Card className='max-w-md w-full max-md:max-w-full bg-background/40 gap-7 rounded-sm'>
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
                                    className='py-6 rounded-sm'
                                />
                            </Field>
                                <Button
                                    type='button'
                                    variant={'outline'}
                                    className='py-5 rounded-sm'
                                >
                                    Submit
                                </Button>
                        </FieldGroup>
                    </CardContent>
                </Card>
            </div>
        </div>
    ) 
}   

export default DisplayBookingSection