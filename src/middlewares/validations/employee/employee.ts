import { NextFunction, Request, RequestHandler, Response } from "express"
import { SigninEmployee, SigninEmployeeErros } from "../../../types/employee"

const signin: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const signinEmployee: SigninEmployee = req.body
    let errors: Partial<SigninEmployeeErros> = {}

    if (!signinEmployee.email) {
        errors.email = 'email is required'
    }
    if (!signinEmployee.password) {
        errors.password = 'password is required'
    }
    if (Object.keys(errors).length) {
        return res.render('employee/signin', { data: signinEmployee, errors })
    }

    next()
}

export const employeeValidation = {
    signin
}