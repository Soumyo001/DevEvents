'use client';
import ExploreButton from '@/components/explore-button';

const page = () => {
  return (
    <div
      className='flex flex-col justify-starts items-center w-full'
    >
      <section className='flex flex-col items-center justify-center'>
        <h1 className='text-center text-6xl font-semibold leading-15 tracking-tighter max-sm:text-4xl'>
          The Hub for Every Dev <br/> Event You Can't Miss
        </h1>
        <p className='text-center mt-5 font-schibsted-grotesk'>
          Hackathons, Meetups and Conferences, All in One place
        </p>
        <ExploreButton
          onClick={()=>console.log("Clicked Explore Button!")}
        />
      </section>
    </div>
  )
}

export default page;