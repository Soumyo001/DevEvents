import { NextResponse } from "next/server";
import { eventSchema } from "@/lib/validator/schema_validator/event.schema";
import Event from "@/lib/schemas/event.schema";
import { EventItem } from "@/lib/types/event.type";
import User from "@/lib/schemas/user.schema";
import { UserItem } from "@/lib/types/user.type";
import { auth } from "@clerk/nextjs/server";
import connect from "@/lib/db";
import SyncTaxonomies from "@/lib/helpers/sync/sync-taxonomies";

export const GET = async () => {
    try {
        const { userId, isAuthenticated } = await auth();
        if(!userId || !isAuthenticated) {
            return NextResponse.json(
                {message: "Unauthorized. user not logged in"}, {status: 401}
            );
        }
        await connect();
        const events = await Event.find({is_published: true})
                                .sort({start_datetime: 1})
                                .lean<EventItem[]>();
        return NextResponse.json(
            {message: "Events parsed successfully", events}, {status: 200}
        );
    } catch (err: any) {
        return NextResponse.json(
            {message: `Server error: ${err.message}`}, {status: 500}
        );
    }
}

export const POST = async (req: Request) => {
    try {
        const { userId, isAuthenticated } = await auth();
        if(!userId || !isAuthenticated) {
            return NextResponse.json(
                {message: "Unauthorized access. user not logged in"}, {status: 401}
            );
        }
        await connect();
        const user = await User.findOne({clerk_id: userId}).lean<UserItem>();
        if(!user || user.role !== "admin") {
            return NextResponse.json(
                {message: "Forbidden. User must be an admin"}, {status: 403}
            );
        }
        const body = await req.json();
        const parsed = eventSchema.safeParse(body);
        if(!parsed.success) {
            return NextResponse.json(
                {
                    message: "Invalid request data", 
                    errors: parsed.error.flatten().fieldErrors
                }, {status: 400}
            );
        }
        const data = parsed.data;
        const slug = data.title
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");
        const existingEvent = await Event.findOne({slug}).lean<EventItem>();
        if(existingEvent) {
            return NextResponse.json(
                {message: "Conflict. An event with same title already exists"}, {status: 409}
            );
        }
        await SyncTaxonomies(data.tags, "tag");
        await SyncTaxonomies(data.audience, "audience");
        const event = await Event.create({...data, slug, bookingCount: 0});
        return NextResponse.json(
            {
                message: `Event ${data.is_published? "published":"created"} successfully`,
                event
            }, 
            {status: 201}
        );
    } catch (err: any) {
        return NextResponse.json(
            {message: `Server error: ${err.message}`}, {status: 500}
        );
    }
}