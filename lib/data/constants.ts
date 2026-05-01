import { eventSchemaType } from "../validator/schema_validator/event.schema";

export const ADMINNAVBARITEM = [
    {
        name: "Home",
        url: "/admin/home"
    },
    {
        name: "Events",
        url: "/admin/events"
    },
    {
        name: "Create Event",
        url: "/admin/events/new"
    },
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
    is_published: false
};