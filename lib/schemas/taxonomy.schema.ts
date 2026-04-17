import { Schema, models, model } from "mongoose";

const TaxonomySchema = new Schema(
    {
        type: {
            type: String,
            enum: ["tag", "audience", "timezone"],
            required: true
        },
        value: {type: String, required: true, trim: true},
        slug: {type: String, required: true, lowercase: true, trim: true},
        usageCount: {type: Number, default: 1}
    },
    {
        timestamps: true,
        collection: "taxonomies"
    },
);

TaxonomySchema.index({type: 1, slug: 1}, {unique: true});

const Taxonomy = models.Taxonomy || model("Taxonomy", TaxonomySchema);
export default Taxonomy;