import { Request, RequestHandler, Response } from "express";
import { config } from "../config/config";
import { EmployeeService } from "../services/employee";
import { LogService } from "../services/log";
import { CreateEmployee, UserTokenPayload } from "../types/employee";
import { CreateLog } from "../types/log";

const signup: RequestHandler = async (req: Request, res: Response) => {
    const { name, email, department, password } = req.body
    const createEmployee: CreateEmployee = { name, email, department, password }
    try {
        const result = await EmployeeService.signup(createEmployee)
        if (!result) {
            return res.render('employee/signup', { errorMessage: "Unable to signup", data: createEmployee })
        }
        return res.render('employee/signin', { successMessage: "Signup Successfull. Please login." })
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
        if (!employee) {
            return res.render('employee/signin', { errorMessage: "Ceredentials didn't match", data: { email, password } })
        }
        const token = await EmployeeService.generateToken(employee.id, employee.email)
        res.cookie('token', token, { maxAge: config.cookieAge })
        return res.redirect('/employee/dashboard')
    } catch (err) {
        console.log("Error with employee signin.")
        console.log(err)
        return res.render('employee/signin', { errorMessage: "Server Error", data: { email, password } })
    }
}

const logout: RequestHandler = async (req: Request, res: Response) => {
    res.clearCookie("token")
    return res.redirect('/employee/signin')
}

const dashboard: RequestHandler = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token
        const payload = await EmployeeService.decodeToken(token)
        const dashboardData = await EmployeeService.getDashboard(payload!.email)
        if (!dashboardData) {
            return res.render('employee/signin', { errorMessage: "Please signin" })
        }
        return res.render('employee/dashboard', { data: dashboardData })
    } catch (err) {
        console.log("Error with employee signin.")
        console.log(err)
        return res.render('employee/signin', { errorMessage: "Server Error" })
    }
}

const createLog: RequestHandler = async (req: Request, res: Response) => {
    const token = req.cookies.token
    const payload = await EmployeeService.decodeToken(token) as UserTokenPayload
    const employeeId = payload.id
    const { title, description } = req.body
    const createLog: CreateLog = { title, description, createdDate: new Date(), employeeId }
    try {
        const result = await LogService.create(createLog)
        if (!result) {
            return res.render('employee/create-log', { errorMeassage: "Couldn't create log at moment", data: { createLog } })
        }
        return res.render('employee/create-log', { successMessage: "Log created successfully", data: {} })
    } catch (err) {
        console.log("Error with employee create-log.")
        console.log(err)
        return res.render('employee/create-log', { errorMessage: "Server Error", data: createLog })
    }
}

export const employeeController = {
    signin,
    signup,
    logout,
    dashboard,
    createLog
}