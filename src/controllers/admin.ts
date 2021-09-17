import { RequestHandler } from "express"
import { Request, Response } from "express"

const getSignin: RequestHandler = (req: Request, res: Response) => {
    return res.render('admin/signin')
}

const getDashboard: RequestHandler = (req: Request, res: Response) => {
    return res.render('admin/dashboard')
}

export const adminController = {
    getSignin,
    getDashboard
}