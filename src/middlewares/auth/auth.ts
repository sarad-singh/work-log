import { NextFunction, Request, RequestHandler, Response } from "express"
import { EmployeeService } from "../../services/employee"

const checkToken = (tokenUser: 'admin' | 'employee'): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {

        const token: string = req.cookies.token
        if (!token || typeof token == 'string')
            return res.render(`/${tokenUser}/signin`, { errorMessage: "Please signin" })

        const payload: any = await EmployeeService.decodeToken(token)
        if (!payload[`${tokenUser}`])
            return res.render(`/${tokenUser}/signin`, { errorMessage: "Please signin" })

        next()
    }
}

export const authMiddleware = {
    checkToken
}