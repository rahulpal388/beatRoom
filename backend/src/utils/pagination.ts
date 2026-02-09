


export function pagination<T>(data: T[], limit: string, page: string): T[] {

    const num_limit = Math.max(Number(limit) || 1, 1);
    const num_page = Math.max(Number(page) || 1, 1);
    const start = (num_limit - 1) * num_page;
    const end = start + num_limit;
    return data.slice(start, end);
}