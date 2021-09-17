import { NextFunction, Request, RequestHandler, Response } from "express";
import { SigninAdmin, SigninAdminErrors } from "../../../types/admin";

const signin: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const signinAdmin: SigninAdmin = req.body
    let errors: Partial<SigninAdminErrors> = {}

    if (!signinAdmin.email) {
        errors.email = 'email is required'
    }
    if (!signinAdmin.password) {
        errors.password = 'password is required'
    }
    if (Object.keys(errors).length) {
        return res.render('admin/signin', { data: signinAdmin, errors })
    }

    next()
}

export const adminValidationMiddleware = {
    signin
}