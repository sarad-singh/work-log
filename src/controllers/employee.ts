import { Request, RequestHandler, Response } from "express";
import { config } from "../config/config";
import { FlashMessage } from "../constansts/flashMessage";
import { EmployeeService } from "../services/employee";
import { LogService } from "../services/log";
import { CreateEmployee } from "../types/employee";
import { CreateLog, EditLog, Log } from "../types/log";

const getSignup: RequestHandler = (req: Request, res: Response) => {
    return res.render("employee/signup", {
        errorMessage: req.flash(FlashMessage.ERROR),
        successMessage: req.flash(FlashMessage.SUCCESS),
    })
}

const getSignin: RequestHandler = (req: Request, res: Response) => {
    console.log(req.session)
    return res.render("employee/signin", {
        errorMessage: req.flash(FlashMessage.ERROR),
        successMessage: req.flash(FlashMessage.SUCCESS),
    })
}

const getCreateLog: RequestHandler = (req: Request, res: Response) => {
    return res.render("employee/create-log", {
        errorMessage: req.flash(FlashMessage.ERROR),
        successMessage: req.flash(FlashMessage.SUCCESS),
    })
}

const getEditLog: RequestHandler = async (req: Request, res: Response) => {
    try {
        const logId = req.resourceId as number
        const log: Log = await LogService.findOne(logId)
        if (!log) {
            req.flash(FlashMessage.ERROR, "No log with such id")
            return res.redirect("/employee/dashboard")
        }
        return res.render("employee/edit-log", {
            errorMessage: req.flash(FlashMessage.ERROR),
            successMessage: req.flash(FlashMessage.SUCCESS),
            data: log
        })
    } catch (err) {
        req.flash(FlashMessage.ERROR, "Server error.")
        return res.redirect("/employee/dashboard")
    }
}

const getDashboard: RequestHandler = async (req: Request, res: Response) => {
    try {
        const dashboardData = await EmployeeService.getDashboard(req.session.employee!.id)
        if (!dashboardData) {
            req.flash(FlashMessage.ERROR, "Something went wrong")
            return res.redirect("employee/signin")
        }
        return res.render("employee/dashboard", {
            errorMessage: req.flash(FlashMessage.ERROR),
            successMessage: req.flash(FlashMessage.SUCCESS),
            data: dashboardData
        })
    } catch (err) {
        req.flash(FlashMessage.ERROR, "Server error")
        return res.redirect("/employee/dashboard")
    }
}

const getLog: RequestHandler = async (req: Request, res: Response) => {
    try {
        const logId = req.resourceId as number
        const data = await EmployeeService.getLog(logId)
        return res.render("employee/log", {
            errorMessage: req.flash(FlashMessage.ERROR)[0],
            successMessage: req.flash(FlashMessage.SUCCESS)[0],
            data
        })
    } catch (err) {
        req.flash(FlashMessage.ERROR, "Server error")
        return res.redirect("/admin/dashboard")
    }
}

const signup: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { name, email, department, password } = req.body
        const createEmployee: CreateEmployee = { name, email, department, password }
        const result = await EmployeeService.signup(createEmployee)
        if (!result) {
            return res.render("employee/signup", { errorMessage: "Unable to signup", data: createEmployee })
        }
        return res.render("employee/signin", { successMessage: "Signup Successfull. Please login." })
    } catch (err) {
        return res.render("employee/signup", { errorMessage: "Server Error.", data: req.body })
    }
}

const signin: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { email, password }: { email: string; password: string } = req.body
        const employee = await EmployeeService.signin(email, password)
        if (!employee) {
            return res.render("employee/signin", {
                errorMessage: "Ceredentials didn't match",
                data: req.body
            })
        }
        req.session.employee = {
            id: employee.id,
            email: employee.email
        }
        return res.redirect("/employee/dashboard")
    } catch (err) {
        req.flash(FlashMessage.ERROR, "Server error")
        return res.redirect("/employee/signin")
    }
}

const logout: RequestHandler = async (req: Request, res: Response) => {
    req.session.employee = undefined
    return res.redirect("/employee/signin")
}

const createLog: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { title, description }: { title: string, description: string } = req.body
        const employeeId: number = req.session.employee!.id
        const createLog: CreateLog = { title, description, employeeId }
        const result = await EmployeeService.createLog(createLog)
        if (!result) {
            req.flash(FlashMessage.ERROR, "Coundn't create log.")
            return res.redirect("/employee/dashboard")
        }
        req.flash(FlashMessage.SUCCESS, "Log created successfully")
        return res.redirect("/employee/dashboard")
    } catch (err) {
        req.flash(FlashMessage.ERROR, "Server error.")
        return res.redirect("/employee/dashboard")
    }
}

const editLog: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { title, description, createdDate }: { title: string, description: string, createdDate: Date } = req.body
        const logId = req.resourceId as number
        const editLog: EditLog = { id: logId, title, description }
        const result = await EmployeeService.editLog(editLog)
        if (!result) {
            req.flash(FlashMessage.ERROR, "Old logs cannot be edited")
            return res.redirect("/employee/dashboard")
        }
        req.flash(FlashMessage.SUCCESS, "Log edited successfully")
        return res.redirect("/employee/dashboard")
    } catch (err) {
        req.flash(FlashMessage.ERROR, "Server error.")
        return res.redirect("/employee/dashboard")
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