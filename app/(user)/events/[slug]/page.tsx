import { use } from "react"
import DisplayEventBySlug from "@/components/display-events-by-slug";


const EventBySlug = ({params}: {params: Promise<{slug: string}>}) => {
    const { slug } = use(params);
    return <DisplayEventBySlug slug={slug} isAdmin={false}/>
}

export default EventBySlug