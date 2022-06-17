import { CustomErrorHandler } from "../middlewares/customErrorHandler";

export class AuthValidate extends CustomErrorHandler {
    statusCode = 400

    constructor(public message: string) {
        super(message);
            
            Object.setPrototypeOf(this, AuthValidate.prototype);
        }

    serializeErrors()  {
        return [{ message: this.message }];
    }
}