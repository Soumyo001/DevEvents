import Taxonomy from "@/lib/schemas/taxonomy.schema";
import { TaxonomyItem } from "@/lib/types/taxonomy.type";
import { auth } from "@clerk/nextjs/server";
import User from "@/lib/schemas/user.schema";
import { UserItem } from "@/lib/types/user.type";
import { NextResponse } from "next/server";
import connect from "@/lib/db";

export const GET = async (req: Request) => {
    try {
        const { userId, isAuthenticated } = await auth();
        if(!userId || !isAuthenticated) {
            return NextResponse.json(
                {message: "Unauthorized. User not logged in"}, {status: 401}
            );
        }
        const url = new URL(req.url);
        const type = url.searchParams.get("type");
        if(!type || !["tag", "audience"].includes(type)) {
            return NextResponse.json(
                {message: "No type specified"}, {status: 400}
            );
        }
        await connect();
        const user = await User.findOne({clerk_id: userId}).lean<UserItem>();
        if(!user || user.role !== "admin") {
            return NextResponse.json(
                {message: "Forbidden. Only admin users are allowed"}, {status: 403}
            );
        }
        
        const taxonomies = await Taxonomy.find({type})
                        .sort({usageCount: -1})
                        .select("value -_id")
                        .lean<TaxonomyItem[]>();
        
        return NextResponse.json(taxonomies.map(item => item.value), {status: 200});
    } catch (err: any) {
        return NextResponse.json(
            {message: `Server error: ${err.message}`}, {status: 500}
        );
    }
}