import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
    {
        email: {
            type: String, 
            required: true, 
            unique: true, 
            lowercase: true, 
            trim: true
        },
        password: {
            type: String,
            minlength: 8,
            required: true,
            select: false,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
    },
    {
        timestamps: true,
        collection: "users",
    },
);

const User = models.User || model("User", UserSchema);
export default User;