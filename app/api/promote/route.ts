import connect from "@/lib/db";
import User from "@/lib/schemas/user.schema";
import { UserItem } from "@/lib/types";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const { email, secret } = await req.json();
    if(secret !== process.env.ADMIN_PROMOTE_SECRET) {
        return NextResponse.json(
            {message: "UnAuthorized."}, {status: 401}
        );
    }
    try {
        await connect();
        const user = await User.findOneAndUpdate(
            {email},
            {$set: {role: "admin"}},
            {returnDocument: "after"}
        ).lean<UserItem>();
        if(!user) {
            return NextResponse.json(
                {message: "User not found with the email"}, {status: 404}
            );
        }
        const client = await clerkClient();
        await client.users.updateUser(user.clerk_id, {
            publicMetadata: {role: "admin"}
        });
        return NextResponse.json(
            {message: "Promoted"}, {status: 200}
        );
    } catch (err: any) {
        return NextResponse.json({message: err.message}, {status: 500});
    }
}