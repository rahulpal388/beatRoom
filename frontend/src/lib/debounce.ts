


export function Debounce(fn: (text: string) => Promise<void>, delay: number) {

    let timer: ReturnType<typeof setTimeout> | null = null;

    return (search: string) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(async () => {
            await fn(search);
        }, delay);

    }

}