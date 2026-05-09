import { Types } from "mongoose";
import { z } from "zod";

export const BookingPayload = z.object({
    event_id: z.string()
        .min(1, {message: "Event ID is required"})
        .refine(
            (data) => Types.ObjectId.isValid(data),
            {message: "Invalid event id"}
        ),
    email: z.string()
        .min(1, {message: "Email is required"})
        .email({message: "Please enter a valid email", pattern: z.regexes.html5Email})
});