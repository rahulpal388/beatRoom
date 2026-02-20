

function checkEnv(): string {
    const API = process.env.NEXT_PUBLIC_API_URL;
    if (!API) {
        throw new Error("Provide NEXT_PUBLIC_API_URL");
    }

    return API;

}

export const api = checkEnv();

