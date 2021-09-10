import { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { EmployeeService } from "../services/employee";
import { CreateEmployee } from "../types/employee";

const signup: RequestHandler = async (req: Request, res: Response) => {
    const { name, email, department, password } = req.body
    const createEmployee: CreateEmployee = { name, email, department, password }
    try {
        const employee = await EmployeeService.signup(createEmployee)
        if (employee)
            return res.render('employee/signin', { successMessage: "Signup Successfull. Please login." })
        return res.render('employee/signup', { errorMessage: "Unable to signup", data: createEmployee })
    } catch (err) {
        console.log("Error with employee signup.")
        console.log(err)
        return res.render('employee/signup', { errorMessage: "Server Error.", data: createEmployee })
    }
}

const signin: RequestHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const employee = await EmployeeService.signin(email, password)
        if (employee) {
            let payload = {
                id: employee.id,
                email: employee.email
            }
            let token = jwt.sign({ employee: payload }, config.jwt.secret, config.jwt.otions)
            res.cookie('token', token, { maxAge: config.cookieAge })
            return res.redirect('/employee/dashboard')
        }
        return res.render('employee/signin', { errorMessage: "Ceredentials didn't match", data: { email, password } })
    } catch (err) {
        console.log("Error with employee signin.")
        console.log(err)
        return res.render('employee/signin', { errorMessage: "Server Error", data: { email, password } })
    }
}

const logout: RequestHandler = async (req: Request, res: Response) => {
    res.clearCookie("token")
    res.redirect('/employee/signin')
}

const dashboard: RequestHandler = async (req: Request, res: Response) => {
    let stringPayload = jwt.verify(req.cookies.token, config.jwt.secret)
    let payload = JSON.parse(JSON.stringify(stringPayload))

    let data = await EmployeeService.profile(payload.employee.email)
    if (!data)
        res.render('employee/signin')
    res.render('employee/dashboard', { data })
}

export const employeeController = {
    signin,
    signup,
    logout,
    dashboard
}