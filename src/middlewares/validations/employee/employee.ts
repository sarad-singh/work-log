import { NextFunction, Request, RequestHandler, Response } from "express"
import { SigninEmployee, SigninEmployeeErros } from "../../../types/employee"

const signin: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const signinEmployee: SigninEmployee = req.body
    const emailPattern = /^[\w.]+@[a-z]+\.[a-z]{2,3}$/i
    let errors: Partial<SigninEmployeeErros> = {}

    if (!emailPattern.test(signinEmployee.email)) {
        errors.email = "email must be valid email"
    }

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