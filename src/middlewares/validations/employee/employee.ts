import { NextFunction, Request, RequestHandler, Response } from "express";
import { SigninEmployee, SigninEmployeeErros, SignupEmployee, SignupEmployeeErrors } from "../../../types/employee";

const signup: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    let signupEmployee: SignupEmployee = req.body
    let errors: Partial<SignupEmployeeErrors> = {}

    if (!signupEmployee.name)
        errors.name = 'name is required'
    if (!signupEmployee.email)
        errors.name = 'email is required'
    if (!signupEmployee.email.includes('@'))
        errors.email = 'email must be valid email'
    if (!signupEmployee.department)
        errors.department = 'deparment is required'
    if (signupEmployee.password.length < 8)
        errors.password = 'password must have atleast 8 characters'
    if (!signupEmployee.password)
        errors.password = 'password is required'
    if (signupEmployee.confirmPassword !== signupEmployee.password)
        errors.confirmPassword = "password and confirm password must match"
    if (!signupEmployee.confirmPassword)
        errors.confirmPassword = 'confirm password is required'

    if (Object.keys(errors).length)
        return res.render('employee/signup', { data: signupEmployee, errors })

    next()
}

const signin: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    let signinEmployee: SigninEmployee = req.body
    let errors: Partial<SigninEmployeeErros> = {}


    if (!signinEmployee.email)
        errors.email = 'email is required'
    if (!signinEmployee.password)
        errors.password = 'password is required'

    if (Object.keys(errors).length)
        return res.render('employee/signin', { data: signinEmployee, errors })

    next()
}

export const employeeValidationMiddleware = {
    signup,
    signin
}