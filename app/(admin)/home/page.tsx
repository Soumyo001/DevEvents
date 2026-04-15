'use client';
import EventCard from '@/components/event-card';
import ExploreButton from '@/components/explore-button';

const page = () => {
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
          className='text-primary font-bold text-2xl max-sm:text-[18px]'
        >
          Featured Events
        </h3>
      </div>
    </div>
  )
}

export default page;