import { CustomErrorHandler } from "../middlewares/customErrorHandler";

export class BadRequest extends CustomErrorHandler {

    constructor(message: string, public statusCode = 400) { 
        super(message)

        this.statusCode = statusCode

        Object.setPrototypeOf(this, BadRequest.prototype);
    }
    serializeErrors()  { 
        return [{message : this.message}];
    }
}