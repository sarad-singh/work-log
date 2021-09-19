import { RequestHandler } from "express"
import { Request, Response } from "express"
import { config } from "../config/config"
import { FlashMessage } from "../constansts/flashMessage"
import { AdminService } from "../services/admin"
import { LogService } from "../services/log"

const getSignin: RequestHandler = (req: Request, res: Response) => {
    return res.render('admin/signin')
}

const getDashboard: RequestHandler = async (req: Request, res: Response) => {
    try {
        const data = await AdminService.getDashboard()
        return res.render('admin/dashboard', {
            errorMessage: req.flash(FlashMessage.ERROR)[0],
            successMessage: req.flash(FlashMessage.SUCCESS)[0],
            data
        })
    } catch (err) {
        return res.render('admin/dashboard', { errorMessage: "Something went wrong." })
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

const createComment: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { comment } = req.body
        const logId = parseInt(req.params.id)
        const payload = await AdminService.decodeToken(req.cookies.adminToken)
        const adminId = payload?.id as number
        const result = await AdminService.createComment(comment, adminId, logId)
        if (!result) {
            req.flash(FlashMessage.ERROR, "Failed to add feedback")
            return res.redirect(`admin/view/log/${logId}`)
        }
        req.flash(FlashMessage.SUCCESS, "Feedback added successfully")
        return res.redirect(`/admin/view/log/${logId}`)
    } catch (err) {
        console.log(err)
        req.flash(FlashMessage.ERROR, "Server error")
        return res.redirect('/admin/dashboard')
    }
}

const viewLog: RequestHandler = async (req: Request, res: Response) => {
    try {
        const logId = parseInt(req.params.id)
        const data = await AdminService.viewLog(logId)
        return res.render('admin/log', {
            errorMessage: req.flash(FlashMessage.ERROR)[0],
            successMessage: req.flash(FlashMessage.SUCCESS)[0],
            data
        })
    } catch (err) {
        req.flash(FlashMessage.ERROR, "Server error")
        return res.redirect('/admin/dashboard')
    }
}

const deleteLog: RequestHandler = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const result = await LogService.remove(id)
        if (!result) {
            req.flash(FlashMessage.ERROR, "Failed to delete")
            return res.redirect('/admin/dashboard')
        }
        req.flash(FlashMessage.SUCCESS, "Deleted successfully")
        return res.redirect('/admin/dashboard')
    } catch (err) {
        req.flash(FlashMessage.ERROR, "Server error")
        return res.redirect('/admin/dashboard')
    }
}

export const adminController = {
    getSignin,
    getDashboard,
    signin,
    logout,
    createComment,
    viewLog,
    deleteLog
}