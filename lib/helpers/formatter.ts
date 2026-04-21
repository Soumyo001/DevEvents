export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

export const formatTimezone = (tz: string) => {
    const offset = new Intl.DateTimeFormat("en", {
        timeZone:     tz,
        timeZoneName: "shortOffset",
    })
    .formatToParts()
    .find((p) => p.type === "timeZoneName")?.value ?? "";

    return `${tz.replace(/_/g, " ")}  (${offset})`;
};