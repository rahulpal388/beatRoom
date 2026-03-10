import axios from "axios";
import { cookies } from "next/headers";


const serverApiFunction = async () => {
    const cookie = await cookies();
    const cookiesHeader = cookie.getAll().map(c => `${c.name}=${c.value}`).join("; ")
    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            Cookie: cookiesHeader
        }
    });
}


export default serverApiFunction;