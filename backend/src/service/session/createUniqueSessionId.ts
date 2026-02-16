
import crypto from "crypto";

export function createUniqueSessionId(): string {
    return crypto.randomBytes(32).toString("hex");

}