import { Schema, models, model } from "mongoose";

const VenueSchema = new Schema(
  {
    name: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String},
    country: {type: String, required: true},
    mode: {
      type: String,
      enum: ["In-Person","Online","Hybrid"],
      required: true,
    },
  },
  {_id: false}
);

const AgendaSchema = new Schema(
  {
    start_datetime: {type: Date, required: true},
    end_datetime: {type: Date, required: true},
    title: {type: String, required: true},
    description: {type: String},
  }, {_id: false}
);

const OrganizerSchema = new Schema(
  {
    organizer_name: {type: String, required: true},
    description: {type: String},
  }, {_id: false}
);

const EventSchema = new Schema(
  {
    title: {type: String, required: true},
    description: {type: String, required: true},
    slug: {type: String, required: true, unique: true, lowercase: true, trim: true},
    image: {type: String},
    timezone: {type: String, default: "America/Los_Angeles"},
    start_datetime: {type: Date, required: true},
    end_datetime: {type: Date, required: true},
    registration_deadline: {type: Date, required: true},
    capacity: {type: Number, default: null},
    venue: {type: VenueSchema, required: true},
    agenda: {type: [AgendaSchema], default: []},
    audience: {type: [String], default: []},
    organizer: {type: OrganizerSchema, required: true},
    tags: {type: [String], default: []},
    is_published: {type: Boolean, default: false},
  },
  {
    timestamps: true,
    collection: "events",
  },
);

const Event = models.Event || model("Event", EventSchema);
export default Event;