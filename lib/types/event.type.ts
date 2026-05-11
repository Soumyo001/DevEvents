export type VenueItem = {
    name?: string;
    city?: string;
    state?: string;
    country?: string,
    mode: "In-Person"|"Online"|"Hybrid";
}

export type AgendaItem = {
    start_datetime: string;
    end_datetime: string;
    title: string;
    description?: string;
}

export type OrganizerItem = {
    organizer_name: string;
    description?: string;
}

export type EventItem = {
    _id: string;
    title: string;
    description: string;
    overview: string;
    slug: string;
    image?: string;
    timezone: string;
    start_datetime: string;
    end_datetime: string;
    registration_deadline: string;
    capacity: number|null;
    bookingCount: number;
    venue: VenueItem;
    agenda: AgendaItem[];
    audience: string[];
    organizer: OrganizerItem;
    tags: string[];
    is_published: boolean;
    is_featured: boolean;
}