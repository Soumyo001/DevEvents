import Taxonomy from "@/lib/schemas/taxonomy.schema";
import { toast } from "sonner";

export default function SyncTaxonomies(items: string[], type: "tag"|"audience") {
    if(!items.length) return;
    items.map(async item => {
        const trimmed = item.trim();
        if(!trimmed) return;
        const slug = trimmed.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
        await Taxonomy.findOneAndUpdate(
            {type, slug},
            {
                $setOnInsert: {type, value: trimmed, slug},
                $inc: {usageCount: 1}
            },
            {upsert: true}
        );
    });
}