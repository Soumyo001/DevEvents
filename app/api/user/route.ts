import { auth } from "@clerk/nextjs/server";
import User from "@/lib/schemas/user.schema";
import { NextResponse } from "next/server";
import connect from "@/lib/db";
import { UserItem } from "@/lib/types/user.type";

export const GET = async () => {
    try {
        const { userId, isAuthenticated } = await auth();
        if(!userId || !isAuthenticated) {
            return NextResponse.json({message: "User not logged in."}, {status: 401});
        }
        await connect();
        const user = await User.findOne({clerk_id: userId});
        if(!user) {
            return NextResponse.json(
                {message: "User not found. Please create your account"},
                {status: 404}
            );
        } 
        return NextResponse.json(
            {message: "User sign in successful"},
            {status: 200}
        );
    } catch (err: any) {
        return NextResponse.json(
            {message: `Server error: ${err.message}`},
            {status: 500}
        );
    }
}

// this function is only used for user account sync to mongoDB
export const POST = async (request: Request) => {
    try {
        const { userId, isAuthenticated } = await auth();
        if(!isAuthenticated || !userId) {
            return NextResponse.json(
                {message: "User account not created. Please create your account and try again."}, 
                {status: 401}
            );
        }
        await connect();
        const { email } = await request.json();
        const existingUser = await User.findOne({email});
        if(existingUser?.clerk_id === userId) {
            return NextResponse.json(
                {message: "User already exists."},
                {status: 409}
            );
        }
        await User.findOneAndUpdate(
            {email},
            {
                $set: {clerk_id: userId},
                $setOnInsert: {email, role: "user"},
            },
            {upsert: true},
        );
        return NextResponse.json(
            {message: "User account synced successfully."}, 
            {status: 200}
        );
    } catch (err: any) {
        if(err.code === 11000) {
            return NextResponse.json(
                {message: "User already exists"}, {status: 409}
            );
        }
        return NextResponse.json(
            {message: `Server error: ${err.message}`}, 
            {status: 500}
        );
    }
}