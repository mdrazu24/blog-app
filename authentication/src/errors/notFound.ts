import { CustomErrorHandler } from "../middlewares/customErrorHandler"

export class NotFound extends CustomErrorHandler {
    statusCode = 400;
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, NotFound.prototype);
    }

    serializeErrors() : any {
        return [{ message: this.message }];
    }

}