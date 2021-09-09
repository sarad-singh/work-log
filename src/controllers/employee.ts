import { Request, RequestHandler, Response } from "express";

const signup: RequestHandler = (req: Request, res: Response) => {
    try {
        res.send(req.body)
    } catch (err) {
        console.log("Error with employee signup.")
        console.log(err)
    }
}

const signin: RequestHandler = (req: Request, res: Response) => {
    try {
        res.send(req.body)
    } catch (err) {
        console.log("Error with employee signin.")
        console.log(err)
    }
}

export const employeeController = {
    signin,
    signup
}