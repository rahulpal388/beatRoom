import bcrypt from "bcrypt"


export const hashString = (planString: string): string => {

    return bcrypt.hashSync(planString, 12);

}


export const matchHash = (planString: string, hashString: string): boolean => {

    return bcrypt.compareSync(planString, hashString);
}