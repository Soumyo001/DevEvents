import { NextResponse } from "next/server";
import Event from "@/lib/schemas/event.schema";
import User from "@/lib/schemas/user.schema";
import Booking from "@/lib/schemas/booking.schema";
import Favourite from "@/lib/schemas/favourite.schema";
import { UserItem, EventItem } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import connect from "@/lib/db";
import { eventSchema } from "@/lib/validator/schema_validator/event.schema";
import SyncTaxonomies from "@/lib/helpers/sync/sync-taxonomies";

export const GET = async(req: Request, {params}: {params: Promise<{slug: string}>}) => {
    try {
        const { userId, isAuthenticated } = await auth();
        if(!userId || !isAuthenticated) {
            return NextResponse.json(
                {message: "Unauthorized. user must be logged in"}, {status: 401}
            );
        }
        await connect();
        const user = await User.findOne({clerk_id: userId}).lean<UserItem>();
        if(!user) {
            return NextResponse.json(
                {message: "User not synced. please re-login to sync your account"},
                {status: 404}
            );
        }
        const { slug } = await params;
        const filter: any = {slug};
        if(user.role !== "admin") {
            filter.is_published = true;
        }
        const event = await Event.findOne(filter).lean<EventItem>();
        if(!event) {
            return NextResponse.json(
                {message: "Event not found"},
                {status: 404}
            );
        }
        const similar_events = await Event.find({
            _id: {$ne: event._id},
            tags: {$in: event.tags},
            is_published: true,
            start_datetime: {$gte: new Date()}
        }).sort({start_datetime: 1}).limit(6).lean<EventItem[]>();
        return NextResponse.json(
            {message: "Event fetched successfully", event, similar_events}, {status: 200}
        );
    } catch (err: any) {
        return NextResponse.json(
            {message: `Server error: ${err.message}`},
            {status: 500}
        );
    }
}

export const PUT = async(req: Request, {params}: {params: Promise<{slug: string}>}) => {
    try {
        const { userId, isAuthenticated } = await auth();
        if(!userId || !isAuthenticated) {
            return NextResponse.json(
                {message: "Unauthorized. User must be logged in"}, {status: 401}
            );
        }
        await connect();
        const user = await User.findOne({clerk_id: userId}).lean<UserItem>();
        if(!user || user.role !== "admin") {
            return NextResponse.json(
                {message: "Forbidden. Only admin users are allowed"}, {status: 403}
            );
        }
        const { slug } = await params;
        const event = await Event.findOne({slug}).lean<EventItem>();
        if(!event) {
            return NextResponse.json(
                {message: "Event not found. Invalid update request"}, {status: 404}
            );
        }
        const body = await req.json();
        const parsed = eventSchema.safeParse(body);
        if(!parsed.success) {
            return NextResponse.json(
                {
                    message: "Invalid request data. please try again",
                    errors: parsed.error.flatten().fieldErrors
                }, {status: 400}
            );
        }
        const data = parsed.data;
        await SyncTaxonomies(data.tags, "tag");
        await SyncTaxonomies(data.audience, "audience");
        const updatedEvent = await Event.findOneAndUpdate(
            {slug},
            {...data},
            {returnDocument: "after"}
        ).lean<EventItem>();
        if(!updatedEvent) {
            return NextResponse.json(
                {message: "Event update failed. please try again"}, {status: 500}
            );
        }
        return NextResponse.json(
            {message: "Event update successful", event: updatedEvent}, {status: 200}
        );
    } catch (err: any) {
        return NextResponse.json(
            {message: `Server error: ${err.message}`}, {status: 500}
        );
    }
}

export const DELETE = async(req: Request, {params}: {params: Promise<{slug: string}>}) => {
    try {
        const { userId, isAuthenticated } = await auth();
        if(!userId || !isAuthenticated) {
            return NextResponse.json(
                {message: "Unauthorized. user must be logged in"}, {status: 401}
            );
        }
        await connect();
        const user = await User.findOne({clerk_id: userId}).lean<UserItem>();
        if(!user) {
            return NextResponse.json(
                {message: "Warning! User not synced. please re-login to sync your account"},
                {status: 404}
            );
        }
        if(user.role !== "admin") {
            return NextResponse.json(
                {message: "Forbidden. Only admin users can delete event"}, {status: 403}
            );
        }
        const { slug } = await params;
        const event = await Event.findOne({slug}).lean<EventItem>();
        if(!event) {
            return NextResponse.json(
                {message: "Event does not exist"}, {status: 404}
            );
        }
        const deletedEvent = await Event.findOneAndDelete({_id: event._id, slug}).lean<EventItem>();
        if(!deletedEvent) {
            return NextResponse.json(
                {message: "Event deletion failed. please try again"}, {status: 500}
            );
        }
        await Promise.all([
            Booking.deleteMany({event_id: event._id}),
            Favourite.deleteMany({event_id: event._id})
        ]);
        return NextResponse.json(
            {message: "Event deleted successfully"}, {status: 200}
        );
    } catch (err: any) {
        return NextResponse.json(
            {message: `Server error: ${err.message}`}, {status: 500}
        );
    }
}