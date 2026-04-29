export type TaxonomyItem = {
    _id: string;
    type: "tag"|"audience"|"timezone";
    value: string;
    slug: string;
    usageCount: number;
}