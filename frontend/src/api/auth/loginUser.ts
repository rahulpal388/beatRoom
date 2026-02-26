import { IAuthFormData, IAuthUser, ILoginData } from "@/types/authType";
import api from "../baseUrlAxios";



export async function loginUser(data: ILoginData): Promise<IAuthUser | null> {

    try {
        return (await api.post('/auth/login', data)).data as IAuthUser;

    } catch (error) {
        return null;
    }

}