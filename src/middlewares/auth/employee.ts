import { NextFunction, Request, RequestHandler, Response } from "express"
import jwt from 'jsonwebtoken'
import { config } from "../../config/config"
import { EmployeeModel } from "../../models/employee"

const checkToken: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies.token)
        return res.redirect('/employee/signin')

    let stringPayload = jwt.verify(req.cookies.token, config.jwt.secret)
    let payload = JSON.parse(JSON.stringify(stringPayload))

    if (!payload.employee)
        return res.redirect('/employee/signin')

    next()
}

export const employeeAuthMiddleware = {
    checkToken
}