import { NextResponse } from "next/server";
import Event from "@/lib/schemas/event.schema";
import User from "@/lib/schemas/user.schema";
import { UserItem, EventItem } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import connect from "@/lib/db";

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