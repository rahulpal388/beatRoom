import api from "../baseUrlAxios";



export async function logoutUser(): Promise<boolean> {

    try {
        await api.get(`/auth/logout`);

        return true;
    } catch (error) {
        return false;
    }


}