export type taxonomyItem = {
    type: "tag"|"audience"|"timezone";
    value: string;
    slug: string;
    usageCount: number;
}