import { NextResponse } from "next/server";
import Favourite from "@/lib/schemas/favourite.schema";
import { FavouritesItem } from "@/lib/types/fav.type";
import Event from "@/lib/schemas/event.schema";
import { EventItem } from "@/lib/types/event.type";
import User from "@/lib/schemas/user.schema";
import { UserItem } from "@/lib/types/user.type";
import { auth } from "@clerk/nextjs/server";
import connect from "@/lib/db";

export const GET = async () => {
    try {
        const { userId, isAuthenticated } = await auth();
        if(!userId || !isAuthenticated) {
            return NextResponse.json(
                {message: "Unauthorized. User not logged in"}, {status: 401}
            );
        }
        await connect();
        const user = await User.findOne({clerk_id: userId}).lean<UserItem>();
        if(!user) {
            return NextResponse.json(
                {message: "Warning! User not synced. Please re-login to sync your account"},
                {status: 404}
            );
        }
        const favourites = await Favourite.find({user_id: user._id}).lean<FavouritesItem[]>();
        if(favourites.length === 0) {
            return NextResponse.json(
                {message: "No favourites found", events: []}, {status: 200}
            );
        }
        const eventIDs = favourites.map(item => item.event_id);
        const events = await Event.find({
            _id: {$in: eventIDs},
            is_published: true
        }).lean<EventItem[]>();
        return NextResponse.json(
            {message: "Favourite events found", events}, {status: 200}
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
                {message: "Unauthorized. User must be logged in"}, {status: 401}
            );
        }
        await connect();
        const user = await User.findOne({clerk_id: userId}).lean<UserItem>();
        if(!user) {
            return NextResponse.json(
                {message: "Warning! User account not synced. please re-login to sync your account"},
                {status: 404}
            );
        }
        const { _id } = user;
        const { event_id } = await req.json();
        const event = await Event.findById(event_id).lean<EventItem>();
        if(!event) {
            return NextResponse.json(
                {message: "Event does not exist"}, {status: 404}
            );
        }
        await Favourite.findOneAndUpdate(
            {event_id, user_id: _id},
            {
                $setOnInsert: {event_id, user_id: _id}
            },
            {upsert: true}
        ).lean<FavouritesItem>();
        return NextResponse.json(
            {message: "User favourites updated"}, {status: 201}
        );
    } catch (err: any) {
        return NextResponse.json(
            {message: `Server error: ${err.message}`}, {status: 500}
        );
    }
}

export const DELETE = async(req: Request) => {
    try {
        const {userId, isAuthenticated} = await auth();
        if(!userId || !isAuthenticated) {
            return NextResponse.json(
                {message: "Unauthorized. user must be logged in"}, {status: 401}
            );
        }
        await connect();
        const user = await User.findOne({clerk_id: userId}).lean<UserItem>();
        if(!user) {
            return NextResponse.json(
                {message: "Warning! User account not synced. please re-login to sync your account"},
                {status: 404}
            );
        }
        const { _id } = user;
        const { event_id } = await req.json();
        const deleted = await Favourite.findOneAndDelete({event_id, user_id: _id}).lean<FavouritesItem>();
        if(!deleted) {
            return NextResponse.json(
                {message: "Favourite not found"}, {status: 404}
            );
        }
        return NextResponse.json(
            {message: "Favourite removed"}, {status: 200}
        );
    } catch (err: any) {
        return NextResponse.json(
            {message: `Server error: ${err.message}`}, {status: 500}
        );
    }
}