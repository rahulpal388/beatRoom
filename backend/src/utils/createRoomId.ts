import { v4 as uuid4 } from "uuid"
import crypto from "crypto"

export const createRoomId = (): string => {

    return crypto.randomBytes(8).toString("hex");


}
