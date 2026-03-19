export function formateDate(date_value: string): string {
    const date = new Date(date_value);

    return date.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

}