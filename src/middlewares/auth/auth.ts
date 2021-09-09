import { NextFunction, Request, RequestHandler, Response } from "express"
import jwt from 'jsonwebtoken'
import { config } from "../../config/config"

const checkToken = (tokenUser: 'admin' | 'employee'): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {

        if (!req.cookies.token)
            return res.redirect(`/${tokenUser}/signin`)

        let stringPayload = jwt.verify(req.cookies.token, config.jwt.secret)
        let payload = JSON.parse(JSON.stringify(stringPayload))

        if (!payload[`${tokenUser}`])
            return res.redirect(`/${tokenUser}/signin`)

        next()
    }
}

export const authMiddleware = {
    checkToken
}