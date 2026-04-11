'use client';
import { Button } from './ui/button';
import Image from 'next/image';

const ExploreButton = ({onClick}: {onClick: ()=>void}) => {
  return (
    <Button
        type='button'
        id='explore-btn'
        className='mt-10 bg-primary-foreground border-border rounded-2xl text-primary text-lg font-semibold px-6 py-8 transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 max-sm:px-4 max-sm:py-6 max-sm:text-sm'
        onClick={onClick}
    >
        Explore Events
        <Image
            src="/icons/arrow-down.svg"
            alt="arrow-down"
            width={24}
            height={24}
        />
    </Button>
  )
}

export default ExploreButton