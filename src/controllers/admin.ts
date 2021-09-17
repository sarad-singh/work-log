import { RequestHandler } from "express"
import { Request, Response } from "express"
import { config } from "../config/config"
import { AdminService } from "../services/admin"

const getSignin: RequestHandler = (req: Request, res: Response) => {
    return res.render('admin/signin')
}

const getDashboard: RequestHandler = async (req: Request, res: Response) => {
    const data = await AdminService.getDashboard()
    console.log(data)
    return res.render('admin/dashboard', { data })
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

export const adminController = {
    getSignin,
    getDashboard,
    signin,
    logout
}