import clientAPI from "../baseUrlAxios";



export async function logoutUser(): Promise<boolean> {

    try {
        await clientAPI.get(`/auth/logout`);

        return true;
    } catch {
        return false;
    }


}