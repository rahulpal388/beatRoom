import { v4 as uuid4 } from "uuid"


export const createRoomId = (): string => {

    return uuid4();


}
