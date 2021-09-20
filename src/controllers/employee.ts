import { Request, RequestHandler, Response } from "express"
import { FlashMessage } from "../constansts/flashMessage"
import { EmployeeService } from "../services/employee"
import { LogService } from "../services/log"
import { CreateEmployee, EmployeeDashboardData } from "../types/employee"
import { CreateLog, EditLog, Log } from "../types/log"

const getSignup: RequestHandler = (req: Request, res: Response) => {
    return res.render("employee/signup", {
        errorMessage: req.flash(FlashMessage.ERROR),
        successMessage: req.flash(FlashMessage.SUCCESS),
    })
}

const getSignin: RequestHandler = (req: Request, res: Response) => {
    if (req.session.employee) {
        return res.redirect('/employee/dashboard')
    }
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
        const employeeId = req.session.employee!.id as number
        const dashboardData: EmployeeDashboardData = await EmployeeService.getDashboard(employeeId)
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
        const logId: number = req.resourceId as number
        const data: Log = await EmployeeService.getLog(logId)
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
        const { title, description }: { title: string, description: string } = req.body
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
    logout,
    createLog,
    editLog
}