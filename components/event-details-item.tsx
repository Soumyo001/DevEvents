import { LucideIcon } from 'lucide-react'
import React from 'react'

const EventDetailsItem = ({Icon, text, audience}: {Icon: LucideIcon, text: string, audience?: string[]}) => {
  return (
    <div className='flex flex-row gap-2 justify-start'>
        <Icon className='w-5 h-5'/>
        <p className='max-md:text-sm text-left text-primary font-semibold'>{text}</p>
        {audience && <div className='flex flex-wrap gap-1 max-md:text-sm text-primary text-left font-semibold'>
            {audience.join(", ")}
        </div>}
    </div>
  )
}

export default EventDetailsItem