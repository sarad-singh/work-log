import { NextFunction, Request, RequestHandler, Response } from "express"
import { FlashMessage } from "../constansts/flashMessage"

export const parseParamId = (param: string, redirectRoute: string): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        const id: number = parseInt(req.params[param])
        if (isNaN(id)) {
            req.flash(FlashMessage.ERROR, 'Provided resource id not valid')
            return res.redirect(redirectRoute)
        }
        req.resourceId = id
        next()
    }
}