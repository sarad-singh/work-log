import { NextFunction, Request, RequestHandler, Response } from "express"
import { UserType } from "../../constansts/userTypes"
import { EmployeeService } from "../../services/employee"
import { LogService } from "../../services/log"
import { UserTokenPayload } from "../../types/employee"

const checkToken = (userType: UserType.ADMIN | UserType.EMPLOYEE): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.token as string
            if (!token || typeof token !== 'string') {
                return res.render(`${userType}/signin`, { errorMessage: "Please signin" })
            }

            const payload: UserTokenPayload | null = await EmployeeService.decodeToken(token)
            if (!payload || (payload != null && payload.userType !== userType)) {
                return res.render(`${userType}/signin`, { errorMessage: "Please signin" })
            }

            next()
        } catch (err) {
            console.log("Error in check token middleware")
            console.log(err)
            return res.render(`${userType}/signin`, { errorMessage: "Invalid token. Please signin" })
        }
    }
}

const authorizeEmployeeForTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token as string
        const payload = await EmployeeService.decodeToken(token) as UserTokenPayload
        const employeeId = payload.id
        const logId: number = parseInt(req.params.id)
        const log = await LogService.findOne(logId)
        if (log.employeeId !== employeeId) {
            return res.render(`employee/dashboard`, { errorMessage: "Not authorized" })
        }
        next()
    } catch (err) {
        console.log("Error in authorizeEmployeeForTask middleware")
        console.log(err)
        return res.render(`employee/dashboard`, { errorMessage: "Invalid token. Please signin" })
    }
}

export const authMiddleware = {
    checkToken,
    authorizeEmployeeForTask
}