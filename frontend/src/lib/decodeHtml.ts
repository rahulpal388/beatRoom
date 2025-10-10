
export const decodeHTML = (str: string) => new DOMParser().parseFromString(str, "text/html").documentElement.textContent;