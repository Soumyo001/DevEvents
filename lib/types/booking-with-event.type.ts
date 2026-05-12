import { EventItem } from "./event.type";

export type BookingWithEventItem = {
    _id: string;
    event_id: EventItem;
    user_id: string;
    email: string;
}