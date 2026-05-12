import { NavItem } from "../types/nav.type";
import { eventSchemaType } from "../validator/schema_validator/event.schema";

export const ADMINNAVBARITEM: NavItem[] = [
    {
        id: "admin_home",
        name: "Home",
        url: "/admin/home"
    },
    {
        id: "admin_events",
        name: "Events",
        url: "/admin/events"
    },
    {
        id: "admin_new",
        name: "Create Event",
        url: "/admin/events/new"
    },
    {
        id: "admin_fav",
        name: "Favoruites",
        url: "/admin/events/favourites"
    }
];

export const USERNAVBARITEM: NavItem[] = [
    {
        id: "home",
        name: "Home",
        url: "/home"
    },
    {
        id: "events",
        name: "Events",
        url: "/events"
    },
    {
        id: "favoruites",
        name: "Favoruites",
        url: "/events/favourites"
    },
    {
        id: "bookings",
        name: "Bookings",
        url: "/events/bookings"
    }
];

export const DEFAULTEVENTVALUES: eventSchemaType = {
    image: undefined,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    capacity: null,
    agenda: [],
    audience: [],
    tags: [],
    title: "",
    description: "",
    overview: "",
    start_datetime: "",
    end_datetime: "",
    registration_deadline: "",
    venue: { 
      mode: "In-Person", 
      name: "", 
      city: "", 
      state: "", 
      country: "",
    },
    organizer: { organizer_name: "", description: "" },
    is_published: false,
    is_featured: false,
};