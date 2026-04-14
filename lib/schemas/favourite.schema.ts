import { Schema, models, model, Types } from "mongoose";

const FavouriteSchema = new Schema(
    {
        event_id: {type: Types.ObjectId, ref: "Event", required: true},
        user_id: {type: Types.ObjectId, ref: "User", required: true},
    },
    {
        timestamps: true,
        collection: "favourites",
    },
);

FavouriteSchema.index({event_id: 1,user_id: 1}, {unique: true});

const Favourite = models.Favourite || model("Favourite", FavouriteSchema);
export default Favourite;