import jwt from "jsonwebtoken"
import { config } from "../config/config"
import { EmployeeModel } from "../models/employee"
import { CreateEmployee, Employee, EmployeeDashboardData, EmployeeTokenPayload } from "../types/employee"

const signin = async (email: string, password: string): Promise<Employee | null> => {
    let employee: Employee = await EmployeeModel.findOne(email)
    if (employee && employee.password == password)
        return employee
    return null
}

const signup = async (employee: CreateEmployee): Promise<boolean> => {
    return EmployeeModel.create(employee)
}

const profile = async (email: string): Promise<EmployeeDashboardData> => {
    const profile = await EmployeeModel.findOne(email)
    return { profile }
}

const generateToken = async (payload: EmployeeTokenPayload): Promise<string> => {
    const token = jwt.sign({ employee: payload }, config.jwt.secret, config.jwt.otions)
    return token
}

const decodeToken = async (token: string): Promise<EmployeeTokenPayload | null> => {
    let stringPayload = jwt.verify(token, config.jwt.secret)
    let payload = JSON.parse(JSON.stringify(stringPayload)) as EmployeeTokenPayload
    if (!payload.id || !payload.email)
        return null
    return payload
}

export const EmployeeService = {
    signin,
    signup,
    profile,
    generateToken,
    decodeToken
}