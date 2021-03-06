import { NextFunction, Request, RequestHandler, Response } from "express"
import { Department, Departments } from "../../../constansts/department"
import { FlashMessage } from "../../../constansts/flashMessage"
import { EmployeeModel } from "../../../models/employee"
import { SigninAdmin, SigninAdminErrors } from "../../../types/admin"
import { CreateEmployee, CreateEmployeeErrors } from "../../../types/employee"

const signin: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const signinAdmin: SigninAdmin = req.body
    const emailPattern = /^[\w.]+@[a-z]+\.[a-z]{2,3}$/i
    let errors: Partial<SigninAdminErrors> = {}

    if (!emailPattern.test(signinAdmin.email)) {
        errors.email = "email must be valid email"
    }
    if (!signinAdmin.email) {
        errors.email = "email is required"
    }
    if (!signinAdmin.password) {
        errors.password = "password is required"
    }
    if (Object.keys(errors).length) {
        return res.render("admin/signin", { data: signinAdmin, errors })
    }

    next()
}

const createEmployee: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const createEmployee: CreateEmployee = req.body
    const emailPattern = /^[\w.]+@[a-z]+\.[a-z]{2,3}$/i
    let errors: Partial<CreateEmployeeErrors> = {}

    if (!createEmployee.name) {
        errors.name = "name is required"
    }
    if (!createEmployee.email) {
        errors.email = "email is required"
    }
    if (!emailPattern.test(createEmployee.email)) {
        errors.email = "email must be valid email"
    } else {
        const employee = await EmployeeModel.findOne({ email: createEmployee.email })
        if (employee) {
            errors.email = "Already regiestered with email"
        }
    }
    if (!createEmployee.department) {
        errors.department = "deparment is required"
    }
    if (!Departments.includes(createEmployee.department as Department)) {
        errors.department = "deparment is not valid"
    }
    if (createEmployee.password.length < 8) {
        errors.password = "password must have atleast 8 characters"
    }
    if (!createEmployee.password) {
        errors.password = "password is required"
    }
    if (createEmployee.confirmPassword !== createEmployee.password) {
        errors.confirmPassword = "password and confirm password must match"
    }
    if (!createEmployee.confirmPassword) {
        errors.confirmPassword = "confirm password is required"
    }
    if (!(createEmployee.isAdmin === "1" || createEmployee.isAdmin === "0")) {
        errors.isAdmin = "Invalid value provided"
    }
    if (Object.keys(errors).length) {
        return res.render("admin/create-employee", {
            data: {
                employee: req.body,
                departments: Departments
            },
            errors
        })
    }

    next()
}

const searchLog: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const searchParameters = ["title", "department", "createdDate", "employeeId"]
    const providedSearchParameters = Object.keys(req.query)
    let emptySearchParameters = 0
    let invalidParameter = false

    if (providedSearchParameters.length) {
        providedSearchParameters.forEach(key => {
            const isValidKey = searchParameters.includes(key)
            if (!isValidKey) {
                invalidParameter = true
            }
            if (req.query[key] == "") {
                emptySearchParameters++
            }
        })
    }
    if (invalidParameter) {
        req.flash(FlashMessage.ERROR, "Invalid search parameter provided")
        return res.redirect("/admin/search/log")
    }
    if (emptySearchParameters === searchParameters.length) {
        req.flash(FlashMessage.ERROR, "Provide atleast one search parameter")
        return res.redirect("/admin/search/log")
    }
    next()
}

export const adminValidation = {
    signin,
    createEmployee,
    searchLog
}