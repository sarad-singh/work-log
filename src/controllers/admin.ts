import { RequestHandler } from "express"
import { Request, Response } from "express"
import { Department, Departments } from "../constansts/department"
import { FlashMessage } from "../constansts/flashMessage"
import { AdminService } from "../services/admin"
import { EmployeeService } from "../services/employee"
import { LogService } from "../services/log"
import { AdminDashboardData } from "../types/admin"
import { CreateEmployee, Employee } from "../types/employee"

const getSignin: RequestHandler = (req: Request, res: Response) => {
    if (req.session.admin) {
        return res.redirect("/admin/dashboard")
    }
    return res.render("admin/signin", {
        errorMessage: req.flash(FlashMessage.ERROR),
        successMessage: req.flash(FlashMessage.SUCCESS),
    })
}

const getDashboard: RequestHandler = async (req: Request, res: Response) => {
    try {
        const data: AdminDashboardData = await AdminService.getDashboard()
        return res.render("admin/dashboard", {
            errorMessage: req.flash(FlashMessage.ERROR)[0],
            successMessage: req.flash(FlashMessage.SUCCESS)[0],
            data
        })
    } catch (err) {
        console.log(err)
        req.flash(FlashMessage.ERROR, "Server error")
        return res.redirect("/admin/signin")
    }
}

const signin: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { email, password }: { email: string, password: string } = req.body
        const employee = await AdminService.signin(email, password)
        if (!employee) {
            return res.render("admin/signin", {
                errorMessage: "Ceredentials didn't match",
                data: req.body
            })
        }
        req.session.admin = {
            id: employee.id,
            email: employee.email
        }
        return res.redirect("/admin/dashboard")
    } catch (err) {
        req.flash(FlashMessage.ERROR, "Server error")
        return res.redirect("/admin/signin")
    }
}

const logout: RequestHandler = async (req: Request, res: Response) => {
    req.session.admin = undefined
    return res.redirect("/admin/signin")
}

const getEmployees: RequestHandler = async (req: Request, res: Response) => {
    try {
        const employees: Employee[] = await AdminService.getEmployees()
        return res.render("admin/employees", {
            errorMessage: req.flash(FlashMessage.ERROR),
            successMessage: req.flash(FlashMessage.SUCCESS),
            data: {
                employees
            }
        })
    } catch (err) {
        req.flash(FlashMessage.ERROR, "Server error")
        return res.redirect("/admin/dashboard")
    }
}

const deleteEmployee: RequestHandler = async (req: Request, res: Response) => {
    try {
        const employeeId = req.resourceId as number
        const loggedAdminId = req.session.admin!.id
        const result = await AdminService.deleteEmployee(employeeId, loggedAdminId)
        if (!result) {
            req.flash(FlashMessage.ERROR, "Failed to delete")
            return res.redirect("/admin/view/employees")
        }
        req.flash(FlashMessage.SUCCESS, "Deleted successfully")
        return res.redirect("/admin/view/employees")
    } catch (err) {
        console.log(err)
        req.flash(FlashMessage.ERROR, "Server error")
        return res.redirect("/admin/dashboard")
    }
}

const getCreateEmployee: RequestHandler = async (req: Request, res: Response) => {
    const departments: Department[] = Departments
    return res.render("admin/create-employee", {
        errorMessage: req.flash(FlashMessage.ERROR),
        successMessage: req.flash(FlashMessage.SUCCESS),
        data: {
            departments
        }
    })
}

const createEmployee: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { name, email, department, password, isAdmin } = req.body
        const createEmployee: CreateEmployee = { name, email, department, password, isAdmin }
        const result = await EmployeeService.create(createEmployee)
        const departments: Department[] = Departments
        if (!result) {
            return res.render("admin/create-employee", {
                errorMessage: "Unable to signup",
                data: {
                    employee: req.body,
                    departments
                }
            })
        }
        req.flash(FlashMessage.SUCCESS, "Employee created successfully")
        return res.redirect("/admin/dashboard")
    } catch (err) {
        req.flash(FlashMessage.ERROR, "Server error")
        return res.redirect("/admin/dashboard")
    }
}

const createComment: RequestHandler = async (req: Request, res: Response) => {
    try {
        const comment: string = req.body.comment
        const logId = req.resourceId as number
        const adminId = req.session.admin!.id
        const result = await AdminService.createComment(comment, adminId, logId)
        if (!result) {
            req.flash(FlashMessage.ERROR, "Failed to add feedback")
            return res.redirect(`/admin/view/log/${logId}`)
        }
        req.flash(FlashMessage.SUCCESS, "Feedback added successfully")
        return res.redirect(`/admin/view/log/${logId}`)
    } catch (err) {
        req.flash(FlashMessage.ERROR, "Server error")
        return res.redirect("/admin/dashboard")
    }
}

const getLog: RequestHandler = async (req: Request, res: Response) => {
    try {
        const logId = parseInt(req.params.id)
        const data = await AdminService.getLog(logId)
        return res.render("admin/log", {
            errorMessage: req.flash(FlashMessage.ERROR),
            successMessage: req.flash(FlashMessage.SUCCESS),
            data
        })
    } catch (err) {
        req.flash(FlashMessage.ERROR, "Server error")
        return res.redirect("/admin/dashboard")
    }
}

const deleteLog: RequestHandler = async (req: Request, res: Response) => {
    try {
        const id = req.resourceId as number
        const result = await LogService.remove(id)
        if (!result) {
            req.flash(FlashMessage.ERROR, "Failed to delete")
            return res.redirect("/admin/dashboard")
        }
        req.flash(FlashMessage.SUCCESS, "Deleted successfully")
        return res.redirect("/admin/dashboard")
    } catch (err) {
        console.log(err)
        req.flash(FlashMessage.ERROR, "Server error")
        return res.redirect("/admin/dashboard")
    }
}

export const adminController = {
    getSignin,
    getDashboard,
    signin,
    logout,
    getEmployees,
    deleteEmployee,
    getCreateEmployee,
    createEmployee,
    createComment,
    getLog,
    deleteLog
}