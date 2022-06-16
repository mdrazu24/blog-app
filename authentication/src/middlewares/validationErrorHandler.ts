import { Request } from "express";
import { CustomErrorHandler } from "./customErrorHandler";
import { validationResult } from "express-validator";
export class ValidationErrorHandler extends CustomErrorHandler {
  statusCode = 400
  req : Request

 constructor(req : Request) {
    super("this is from validation error")

    this.req = req

    Object.setPrototypeOf(this, ValidationErrorHandler.prototype);
 }

  serializeErrors () : { message: string, field?: string }[] { 
    const results = validationResult(this.req)

    const errors = results.array().map(error => { 
        return { message: error.msg, field : error.param }
    })

    return errors
  }
}