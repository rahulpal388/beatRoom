import bcrypt from "bcrypt"


export const hashPassword = (password: string): string => {

    return bcrypt.hashSync(password, 12);

}


export const matchPassword = (password: string, hashPassword: string): boolean => {

    return bcrypt.compareSync(password, hashPassword);
}