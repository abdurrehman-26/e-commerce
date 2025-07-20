export function formatDate(isoDate: string) {
    const date = new Date(isoDate);

    const formatted = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    });

    return formatted
}