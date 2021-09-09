import { Request, RequestHandler, Response } from "express";
import { EmployeeService } from "../services/employee";
import { CreateEmployee, SignupEmployee } from "../types/employee";

const signup: RequestHandler = async (req: Request, res: Response) => {
    const createEmployee: CreateEmployee = req.body
    try {
        const employee = await EmployeeService.signup(createEmployee)
        if (employee)
            return res.render('employee/dashboard', { data: employee })
        return res.render('employee/signup', { errorMessage: "Unable to signup", data: createEmployee })
    } catch (err) {
        console.log("Error with employee signup.")
        console.log(err)
        return res.render('employee/signup', { errorMessage: "Server Error.", data: createEmployee })
    }
}

const signin: RequestHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const employee = await EmployeeService.signin(email, password)
        if (employee)
            return res.render('employee/dashboard', { data: employee })
        return res.render('employee/signin', { errorMessage: "Ceredentials didn't match", data: { email, password } })
    } catch (err) {
        console.log("Error with employee signin.")
        console.log(err)
        return res.render('employee/signin', { errorMessage: "Server Error", data: { email, password } })
    }
}

export const employeeController = {
    signin,
    signup
}