import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { EventItem } from "@/lib/types";
import Event from "@/lib/schemas/event.schema";
import connect from "@/lib/db";

export const GET = async () => {
    try {
        const { userId, isAuthenticated } = await auth();
        if(!userId || !isAuthenticated) {
            return NextResponse.json(
                {message: "Unauthorized. User must be logged in"}, {status: 401}
            );
        }
        await connect();
        const featuredEvents = await Event
                                .find({is_published: true, is_featured: true})
                                .sort({start_datetime: 1})
                                .lean<EventItem[]>();
        return NextResponse.json(
            {message: "Featured events fetched successfully", events: featuredEvents},
            {status: 200}
        );
    } catch (err: any) {
        return NextResponse.json(
            {message: `Server error: ${err.message}`}, {status: 500}
        );
    }
}