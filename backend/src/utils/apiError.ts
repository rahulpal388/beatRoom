


export class apiError extends Error {

    statusCode: number;
    details: any;

    constructor(statusCode: number, message: string, details: any) {
        super(message);
        this.statusCode = statusCode;
        this.details = details

        Error.captureStackTrace(this);
    }



}