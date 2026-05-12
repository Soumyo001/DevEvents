import { use, Suspense } from "react";
import DisplayEventBySlug from "@/components/display-events-by-slug";
import Loader from "@/components/loader";

const EventBySlugContent = ({params}: {params: Promise<{slug: string}>}) => {
    const { slug } = use(params);
    return <DisplayEventBySlug slug={slug} isAdmin={false}/>
}

const EventBySlug = ({params}: {params: Promise<{slug: string}>}) => {
    return (
        <Suspense fallback={
            <div className='flex justify-center items-center w-full min-h-dvh'>
              <Loader/>
            </div>
        }>
            <EventBySlugContent params={params}/>
        </Suspense>
    )
}

export default EventBySlug