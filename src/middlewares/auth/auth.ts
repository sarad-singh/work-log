import { NextFunction, Request, RequestHandler, Response } from "express"
import { EmployeeService } from "../../services/employee"

const checkToken = (tokenUser: 'admin' | 'employee'): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.token as string
            if (!token || typeof token !== 'string') {
                return res.render(`${tokenUser}/signin`, { errorMessage: "Please signin" })
            }

            const payload: any = await EmployeeService.decodeToken(token)
            if (!payload[`${tokenUser}`]) {
                return res.render(`${tokenUser}/signin`, { errorMessage: "Please signin" })
            }

            next()
        } catch (err) {
            console.log("Error in check token middleware")
            console.log(err)
            return res.render(`${tokenUser}/signin`, { errorMessage: "Invalid token. Please signin" })
        }
    }
}

export const authMiddleware = {
    checkToken
}