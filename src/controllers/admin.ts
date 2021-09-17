import { RequestHandler } from "express"
import { Request, Response } from "express"
import { config } from "../config/config"
import { AdminService } from "../services/admin"
import { LogService } from "../services/log"

const getSignin: RequestHandler = (req: Request, res: Response) => {
    return res.render('admin/signin')
}

const getDashboard: RequestHandler = async (req: Request, res: Response) => {
    try {
        const data = await AdminService.getDashboard()
        return res.render('admin/dashboard', { data })
    } catch (err) {
        return res.render('admin/signin', { errorMessage: "Something went wrong." })
    }
}

const signin: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const token = await AdminService.signin(email, password)
        if (!token)
            return res.render('admin/signin', { errorMessage: "Ceredentials didn't match", data: req.body })

        res.cookie('adminToken', token, { maxAge: config.cookieAge })
        return res.redirect('/admin/dashboard')
    } catch (err) {
        return res.render('admin/signin', { errorMessage: "Server error.", data: req.body })
    }
}

const logout: RequestHandler = async (req: Request, res: Response) => {
    res.clearCookie("adminToken")
    return res.redirect('/admin/signin')
}

const deleteLog: RequestHandler = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        console.log(id)
        const result = await LogService.remove(id)
        const data = await AdminService.getDashboard()
        console.log(id, result)
        if (!result) {
            return res.render('admin/dashboard', { errorMessage: "Failed to delete", data })
        }
        return res.render('admin/dashboard', { successMessage: "Log deleted successfully", data })
    } catch (err) {
        console.log(err)
        const data = await AdminService.getDashboard()
        return res.render('admin/dashboard', { errorMessage: "Server Error", data })
    }
}

export const adminController = {
    getSignin,
    getDashboard,
    signin,
    logout,
    deleteLog
}