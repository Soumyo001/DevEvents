import { z } from "zod";

const venueSchema = z.object({
    name: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    mode: z.enum(["In-Person","Online","Hybrid"])
}).refine(
    (data) => data.mode === "Online" || !!data.name,
    {
        message: "Venue name is required",
        path: ["name"]
    }
).refine(
    (data) => data.mode === "Online" || !!data.city,
    {
        message: "City is required",
        path: ["city"]
    }
).refine(
    (data) => data.mode === "Online" || !!data.country,
    {
        message: "Country is required",
        path: ["country"]
    }
);

const agendaSchema = z.object({
    start_datetime: z.iso.datetime({message: "Start date & time of agenda is required"}),
    end_datetime: z.iso.datetime({message: "End date & time of agenda is required"}),
    title: z.string().min(1, {message: "Title of agenda is required"}),
    description: z.string().optional()
}).refine(
    (data) => new Date(data.end_datetime) > new Date(data.start_datetime),
    {
        message: "End date cannot be less than start date",
        path: ["end_datetime"]
    }
);

const organizerSchema = z.object({
    organizer_name: z.string().min(1, {message: "Organizer name is required"}),
    description: z.string().optional()
});

export const eventSchema = z.object({
    title: z.string()
        .min(3, {message: "Title must be at least 3 characters"})
        .max(100, {message: "Title must be under 100 characters"}),
    description: z.string()
        .min(10, {message: "Description must be at least 10 characters"})
        .max(5000, {message: "Too big description"}),
    image: z.string()
        .url({message: "Invalid image URL"})
        .or(z.literal(""))
        .optional(),
    timezone: z.string()
        .min(1, {message: "Timezone is required"}),
    start_datetime: z.iso
        .datetime({message: "Start date & time is required"}),
    end_datetime: z.iso
        .datetime({message: "End date & time is required"}),
    registration_deadline: z.iso
        .datetime({message: "Registration deadline is required"}),
    capacity: z.number().int()
        .positive({message: "Capacity cannot be negative"})
        .nullable(),
    venue: venueSchema,
    agenda: z.array(agendaSchema),
    organizer: organizerSchema,
    audience: z.array(z.string())
        .min(1, {message: "At least one audience is required."}),
    tags: z.array(z.string())
        .min(1, {message: "At least one tag is required."}),
    is_published: z.boolean(),
}).refine(
    (data)=> new Date(data.end_datetime) > new Date(data.start_datetime),
    {
        message: "Event end date cannot be less than start date",
        path: ["end_datetime"]
    },
).refine(
    (data) => new Date(data.registration_deadline) < new Date(data.start_datetime),
    {
        message: "Registration deadline must be before or on the start date",
        path: ["registration_deadline"]
    }
);

export type eventSchemaType = z.infer<typeof eventSchema>;