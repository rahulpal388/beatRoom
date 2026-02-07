

export function PaginationSlice(data: any[], limit: number, page: number): any[] {
    return data.slice(
        Number(page) * Number(limit),
        (Number(page) + 1) * Number(limit)
    );
}