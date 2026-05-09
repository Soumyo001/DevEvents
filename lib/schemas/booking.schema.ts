import { Schema, models, model, Types } from "mongoose";

const BookingSchema = new Schema(
    {
        event_id: {type: Types.ObjectId, ref: "Event", required: true},
        user_id: {type: Types.ObjectId, ref: "User", required: true},
        email: {type: String, required: true, lowercase: true, trim: true},
    },
    {
        timestamps: true,
        collection: "bookings",
    },
);

BookingSchema.index({event_id: 1,user_id: 1}, {unique: true});
BookingSchema.index({event_id: 1, email: 1}, {unique: true});

const Booking = models.Booking || model("Booking", BookingSchema);
export default Booking;