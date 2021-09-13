import jwt from "jsonwebtoken"
import { config } from "../config/config"
import { EmployeeModel } from "../models/employee"
import { CreateEmployee, Employee, EmployeeDashboardData, UserTokenPayload } from "../types/employee"
import { LogService } from "./log"

const signin = async (email: string, password: string): Promise<Employee | null> => {
    const employee: Employee = await EmployeeModel.findOne({ email })
    if (employee && employee.password == password)
        return employee
    return null
}

const signup = async (employee: CreateEmployee): Promise<boolean> => {
    return EmployeeModel.create(employee)
}

const getDashboard = async (id: number): Promise<EmployeeDashboardData> => {
    const profile = await EmployeeModel.findOne({ id })
    const logs = await LogService.find({ employeeId: id })
    return { profile, logs }
}

const generateToken = async (id: number, email: string): Promise<string> => {
    const token = jwt.sign({ id, email, userType: 'employee' }, config.jwt.secret, config.jwt.otions)
    return token
}

const decodeToken = async (token: string): Promise<UserTokenPayload | null> => {
    const stringPayload = jwt.verify(token, config.jwt.secret)
    const payload: UserTokenPayload = JSON.parse(JSON.stringify(stringPayload))
    if (!payload.id || !payload.email) {
        return null
    }
    return payload
}

export const EmployeeService = {
    signin,
    signup,
    getDashboard,
    generateToken,
    decodeToken
}