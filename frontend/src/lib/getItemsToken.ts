


export function getItemsToken(url: string): string {

    return url.split("/").at(-1) || ""



}