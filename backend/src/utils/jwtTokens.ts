
import Jwt from "jsonwebtoken";



export const createAccessToken = (data: { email: string }) => {
    return Jwt.sign(data, process.env.JWT_SECRET!, { expiresIn: "15m" }); // valid for 15 min
}


export const createRefreshToken = (data: { email: string }) => {
    return Jwt.sign(data, process.env.JWT_SECRET!, { expiresIn: "7d" }); // valid for 7 days
}


export const verifyJwtToken = (data: { token: string }): {
    verify: boolean,
    data: {
        email: string
    } | null
} => {

    try {

        const token = Jwt.verify(data.token, process.env.JWT_SECRET!) as Jwt.JwtPayload;

        return {
            verify: true,
            data: {
                email: token.id
            }
        }



    } catch (error) {
        return {
            verify: false,
            data: null
        }

    }

}