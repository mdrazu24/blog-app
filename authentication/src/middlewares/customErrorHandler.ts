export abstract class CustomErrorHandler extends Error {
    abstract statusCode: number
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, CustomErrorHandler.prototype);
    }

    abstract serializeErrors(): { message: string, field?: string }[]

}