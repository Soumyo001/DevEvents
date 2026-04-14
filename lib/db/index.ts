import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export default async function connect() {
    const state = mongoose.connection.readyState;
    switch(state) {
        case 1:
            console.log("Already Connected");
            break;
        case 2:
            console.log("Connecting...");
            break;
        case 3:
            try {
                await mongoose.connect(MONGODB_URI!, {
                    dbName: "DevEvents",
                    bufferCommands: true,
                });
            } catch (err: any) {
                console.log("MongoDB Connection Error: ", err);
                throw new Error("MongoDB Connection Error: ", err);
            }
    }
}