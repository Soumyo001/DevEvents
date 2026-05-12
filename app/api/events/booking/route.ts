import Booking from "@/lib/schemas/booking.schema";
import User from "@/lib/schemas/user.schema";
import Event from "@/lib/schemas/event.schema";
import { BookingItem, BookingWithEventItem, UserItem, EventItem } from "@/lib/types";
import { BookingPayload } from "@/lib/validator/payload_validator/booking.payload";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connect from "@/lib/db";

export const GET = async() => {
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
        if(user.role === "admin") {
            return NextResponse.json(
                {message: "Forbidden. Only non-admin users are allowed to view their bookings"},
                {status: 403}
            );
        }
        const bookings = await Booking.find({user_id: user._id})
                            .populate("event_id")
                            .sort({createdAt: -1})
                            .lean<BookingWithEventItem[]>();
        if(bookings.length === 0) {
            return NextResponse.json(
                {message: "No events booked yet", bookings: []}, {status: 200}
            );
        }
        // const bookedEventIDs = bookings.map(item => item.event_id);
        // const events = await Event.find({
        //     _id: {$in: bookedEventIDs},
        //     is_published: true
        // }).lean<EventItem[]>();
        return NextResponse.json(
            {message: "Booked events fetched successfully", bookings},
            {status: 200}
        );
    } catch (err: any) {
        return NextResponse.json(
            {message: `Server error: ${err.message}`}, {status: 500}
        );
    }
}

export const POST = async(req: Request) => {
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
        if(user.role === "admin") {
            return NextResponse.json(
                {message: "Forbidden. Only non-admin users can book events"},
                {status: 403}
            );
        }
        const { _id } = user;
        const body = await req.json();
        const parsed = BookingPayload.safeParse(body);
        if(!parsed.success) {
            return NextResponse.json(
                {
                    message: "Invalid request data",
                    errors: parsed.error.flatten().fieldErrors
                }, {status: 400}
            );
        }
        const { event_id, email } = parsed.data;
        const event = await Event.findById(event_id).lean<EventItem>();
        if(!event || !event.is_published) {
            return NextResponse.json(
                {message: "Event not available for booking"}, {status: 404}
            );
        }
        if(new Date() > new Date(event.registration_deadline)) {
            return NextResponse.json(
                {message: "User cannot book an event after registration deadline"},
                {status: 400}
            );
        }
        const existingBooking = await Booking.findOne({event_id, user_id: _id}).lean<BookingItem>();
        if(existingBooking?.email.toLowerCase().trim() === email.toLowerCase().trim()) {
            return NextResponse.json(
                {message: "You already booked with this email"}, {status: 409}
            );
        }
        if(event.capacity !== null && !existingBooking) {
            const { bookingCount } = event;
            if(bookingCount >= event.capacity) {
                return NextResponse.json(
                    {message: "Event is fully booked"}, {status: 400}
                );
            }
        }
        try {
            const booking = await Booking.findOneAndUpdate(
                {event_id, user_id: _id},
                {
                    $set: {email},
                    $setOnInsert: {event_id, user_id: _id}
                },
                {upsert: true, returnDocument: "after"}
            ).lean<BookingItem>();
            if(!existingBooking) {
                await Event.findByIdAndUpdate(
                    event_id, 
                    {$inc: {bookingCount: 1} },
                    {returnDocument: "after"}
                );
            }
            return NextResponse.json(
                {message: "Booking successful!", booking}, {status: 200}
            );
        } catch (err: any) {
            if(err.code === 11000) {
                return NextResponse.json(
                    {message: "Conflict. The email is already booked by another user for this event"}, {status: 409}
                );
            }
            throw err;
        }
    } catch (err: any) {
        return NextResponse.json(
            {message: `Server error: ${err.message}`}, {status: 500}
        );
    }
}

export const DELETE = async(req: Request) => {
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
        const { event_id } = await req.json();
        const event = await Event.findById(event_id).lean<EventItem>();
        if(!event) {
            return NextResponse.json(
                {message: "Event not found"}, {status: 404}
            );
        }
        if(new Date() > new Date(event.registration_deadline)) {
            return NextResponse.json(
                {message: "Forbidden. User cannot cancel booking after registration deadline"},
                {status: 403}
            );
        }
        const deletedBooking = await Booking
                                    .findOneAndDelete({event_id, user_id: user._id})
                                    .lean<BookingItem>();
        if(!deletedBooking) {
            return NextResponse.json(
                {message: "Booking cancelation failed. please try again"}, {status: 500}
            );
        }
        await Event.findByIdAndUpdate(event_id, {$inc: {bookingCount: -1}});
        return NextResponse.json(
            {message: "Booking successfully canceled"}, {status: 200}
        );
    } catch (err: any) {
        return NextResponse.json(
            {message: `Server error: ${err.message}`}, {status: 500}
        );
    }
}