


export type IAuthUser = {
    username: string;
    userId: string;
    email: string;
    profile_image: string;
}


export type IAuthFormData = {
    username: string;
    email: string;
    password: string;
}

export type IAuthOtpVerifyData = IAuthFormData & {
    otp: string;
}

export type ILoginData = Omit<IAuthFormData, "username">;