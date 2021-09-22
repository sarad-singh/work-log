import { NextFunction, Request, RequestHandler, Response } from "express"
import { FlashMessage } from "../../../constansts/flashMessage"
import { SigninEmployee, SigninEmployeeErros } from "../../../types/employee"

const signin: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const signinEmployee: SigninEmployee = req.body
    const emailPattern = /^[\w.]+@[a-z]+\.[a-z]{2,3}$/i
    let errors: Partial<SigninEmployeeErros> = {}

    if (!emailPattern.test(signinEmployee.email)) {
        errors.email = "email must be valid email"
    }

    if (!signinEmployee.email) {
        errors.email = "email is required"
    }
    if (!signinEmployee.password) {
        errors.password = "password is required"
    }
    if (Object.keys(errors).length) {
        return res.render("employee/signin", { data: signinEmployee, errors })
    }

    next()
}

const searchLog: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const searchParameters = ["title", "createdDate"]
    const providedSearchParameters = Object.keys(req.query)
    let providedEmptySearchParameters = 0

    if (providedSearchParameters.length) {
        providedSearchParameters.forEach(key => {
            const validKey = searchParameters.includes(key)
            if (!validKey) {
                req.flash(FlashMessage.ERROR, "Invalid search parameter key provided")
                return res.redirect("/employee/search/log")
            }
            if (req.query[key] == "") {
                providedEmptySearchParameters++
            }
        })
    }
    if (providedEmptySearchParameters === searchParameters.length) {
        req.flash(FlashMessage.ERROR, "Provide atleast one search parameter")
        return res.redirect("/employee/search/log")
    }
    next()
}

export const employeeValidation = {
    signin,
    searchLog
}