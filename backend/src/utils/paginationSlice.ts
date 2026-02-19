

export function PaginationSlice<T>(data: T[], limit: number, page: number): T[] {
    return data.slice(
        Number(page) * Number(limit),
        (Number(page) + 1) * Number(limit)
    );
}