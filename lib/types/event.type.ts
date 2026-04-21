export type Venue = {
    name: string;
    city: string;
    state?: string;
    country: string,
    mode: "In-Person"|"Online"|"Hybrid";
}

export type Agenda = {
    start_datetime: string;
    end_datetime: string;
    title: string;
    description?: string;
}

export type Organizer = {
    organizer_name: string;
    description?: string;
}

export type EventItem = {
    _id: string;
    title: string;
    description: string;
    slug: string;
    image?: string;
    timezone: string;
    start_datetime: string;
    end_datetime: string;
    registration_deadline: string;
    capacity: number|null;
    venue: Venue;
    agenda: Agenda[];
    audience: string[];
    organizer: Organizer;
    tags: string[];
    is_published: boolean;
}