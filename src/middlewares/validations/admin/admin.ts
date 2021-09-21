import { NextFunction, Request, RequestHandler, Response } from "express"
import { Department, Departments } from "../../../constansts/department"
import { EmployeeModel } from "../../../models/employee"
import { SigninAdmin, SigninAdminErrors } from "../../../types/admin"
import { CreateEmployee, CreateEmployeeErrors } from "../../../types/employee"

const signin: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const signinAdmin: SigninAdmin = req.body
    let errors: Partial<SigninAdminErrors> = {}

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

export const adminValidation = {
    signin,
    createEmployee
}