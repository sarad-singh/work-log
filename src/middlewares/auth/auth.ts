import { NextFunction, Request, RequestHandler, Response } from "express"
import { FlashMessage } from "../../constansts/flashMessage"
import { UserType } from "../../constansts/userTypes"
import { EmployeeService } from "../../services/employee"
import { LogService } from "../../services/log"
import { Log } from "../../types/log"
import { Token, UserTokenPayload } from "../../types/types"

const authenticate = (userType: UserType.ADMIN | UserType.EMPLOYEE): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.session[userType]
            if (!user) {
                req.flash(FlashMessage.ERROR, "Please Signin")
                return res.redirect(`/${userType}/signin`)
            }
            next()
        } catch (err) {
            req.flash(FlashMessage.ERROR, "Server error")
            return res.redirect(`/${userType}/signin`)
        }
    }
}

const authorizeEmployeeForTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const employeeId: number = req.session.employee!.id
        const logId: number = req.resourceId as number
        const log: Log = await LogService.findOne(logId)
        if (!log) {
            req.flash(FlashMessage.ERROR, "No such resource")
            return res.redirect("/employee/dashboard")
        }
        if (log.employeeId !== employeeId) {
            req.flash(FlashMessage.ERROR, "Not authorized")
            return res.redirect("/employee/dashboard")
        }
        next()
    } catch (err) {
        req.flash(FlashMessage.ERROR, "Server errror")
        return res.redirect("/employee/signin")
    }
}

export {
    authenticate,
    authorizeEmployeeForTask
}