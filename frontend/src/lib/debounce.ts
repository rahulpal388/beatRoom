


export function Debounce(fn: (text: string) => Promise<void>, delay: number) {

    let timer: ReturnType<typeof setTimeout> | null = null;
    console.log("inside dobouncing")

    return (search: string) => {
        if (timer) clearTimeout(timer);
        console.log("inside return function")
        timer = setTimeout(async () => {
            console.log("calling API function")
            await fn(search);
        }, delay);

    }

}