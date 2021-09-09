import { Request, RequestHandler, Response } from "express";
import { EmployeeService } from "../services/employee";

const signup: RequestHandler = (req: Request, res: Response) => {
    try {
        res.send(req.body)
    } catch (err) {
        console.log("Error with employee signup.")
        console.log(err)
    }
}

const signin: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const employee = await EmployeeService.signin(email, password)
        if (employee)
            return res.render('employee/dashboard', { data: employee })
        return res.render('employee/signin', { errorMessage: "Ceredentials didn't match", data: { email, password } })
    } catch (err) {
        console.log("Error with employee signin.")
        console.log(err)
    }
}

export const employeeController = {
    signin,
    signup
}