import { Request, RequestHandler, Response } from "express";
import { config } from "../config/config";
import { FlashMessage } from "../constansts/flashMessage";
import { EmployeeService } from "../services/employee";
import { LogService } from "../services/log";
import { CreateEmployee } from "../types/employee";
import { CreateLog, EditLog, Log } from "../types/log";

const getSignup: RequestHandler = (req: Request, res: Response) => {
    return res.render('employee/signup')
}

const getSignin: RequestHandler = (req: Request, res: Response) => {
    return res.render('employee/signin')
}

const getCreateLog: RequestHandler = (req: Request, res: Response) => {
    return res.render('employee/create-log')
}

const getEditLog: RequestHandler = async (req: Request, res: Response) => {
    try {
        const logId = req.id as number
        const log: Log = await LogService.findOne(logId)
        if (!log) {
            req.flash(FlashMessage.ERROR, 'No log with such id')
            return res.render('employee/dashboard')
        }
        return res.render('employee/edit-log', { data: log })
    } catch (err) {
        req.flash(FlashMessage.ERROR, 'Server error.')
        return res.render('employee/dashboard')
    }
}

const getDashboard: RequestHandler = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token
        const payload = await EmployeeService.decodeToken(token)
        const dashboardData = await EmployeeService.getDashboard(payload!.id)
        if (!dashboardData) {
            return res.render('employee/signin', { errorMessage: "Please signin" })
        }
        return res.render('employee/dashboard', { data: dashboardData })
    } catch (err) {
        return res.render('employee/signin', { errorMessage: "Server Error" })
    }
}

const getLog: RequestHandler = async (req: Request, res: Response) => {
    try {
        const logId = parseInt(req.params.id)
        const data = await EmployeeService.getLog(logId)
        return res.render('employee/log', {
            errorMessage: req.flash(FlashMessage.ERROR)[0],
            successMessage: req.flash(FlashMessage.SUCCESS)[0],
            data
        })
    } catch (err) {
        req.flash(FlashMessage.ERROR, "Server error")
        return res.redirect('/admin/dashboard')
    }
}

const signup: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { name, email, department, password } = req.body
        const createEmployee: CreateEmployee = { name, email, department, password }
        const result = await EmployeeService.signup(createEmployee)
        if (!result) {
            return res.render('employee/signup', { errorMessage: "Unable to signup", data: createEmployee })
        }
        return res.render('employee/signin', { successMessage: "Signup Successfull. Please login." })
    } catch (err) {
        return res.render('employee/signup', { errorMessage: "Server Error.", data: req.body })
    }
}

const signin: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const employee = await EmployeeService.signin(email, password)
        if (!employee) {
            return res.render('employee/signin', { errorMessage: "Ceredentials didn't match", data: { email, password } })
        }
        const token = await EmployeeService.generateToken(employee.id, employee.email)
        res.cookie('token', token, { maxAge: config.cookieAge })
        return res.redirect('/employee/dashboard')
    } catch (err) {
        return res.render('employee/signin', { errorMessage: "Server Error", data: req.body })
    }
}

const logout: RequestHandler = async (req: Request, res: Response) => {
    res.clearCookie("token")
    return res.redirect('/employee/signin')
}

const createLog: RequestHandler = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token
        const payload = await EmployeeService.decodeToken(token)
        const employeeId = payload!.id
        const { title, description } = req.body
        const createLog: CreateLog = { title, description, employeeId }
        const result = await EmployeeService.createLog(createLog)
        if (!result) {
            return res.render('employee/create-log', {
                errorMeassage: "Couldn't create log at moment",
                data: { createLog }
            })
        }
        return res.render('employee/create-log', { successMessage: "Log created successfully", data: {} })
    } catch (err) {
        console.log(err)
        return res.render('employee/create-log', { errorMessage: "Server Error", data: req.body })
    }
}

const editLog: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const { title, description, createdDate } = req.body
        const logId: number = parseInt(id)
        const editLog: EditLog = { id: logId, title, description }
        const result = await EmployeeService.editLog(editLog)
        if (!result) {
            return res.render(`employee/edit-log`, {
                errorMessage: "Couldn't edit log at moment",
                data: { id, title, description, createdDate }
            })
        }
        return res.render(`employee/edit-log`, {
            successMessage: "Log edited successfully",
            data: { id, title, description, createdDate }
        })
    } catch (err) {
        return res.render(`employee/edit-log`, {
            errorMessage: "Server Error",
            data: { id, ...req.body }
        }
        )
    }
}


export const employeeController = {
    getSignin,
    getSignup,
    getDashboard,
    getCreateLog,
    getEditLog,
    getLog,
    signin,
    signup,
    logout,
    createLog,
    editLog
}