import jwt from "jsonwebtoken"
import { deflateSync } from "zlib"
import { config } from "../config/config"
import { EmployeeModel } from "../models/employee"
import { LogModel } from "../models/log"
import { CreateEmployee, Employee, EmployeeDashboardData } from "../types/employee"
import { UserTokenPayload } from "../types/types"
import { CreateLog, EditLog, Log } from "../types/log"
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
    const logs = await EmployeeService.getLogs(id)
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

const getLogs = async (id: number): Promise<Log[]> => {
    return LogService.find({ employeeId: id })
}

const createLog = async (createLog: CreateLog): Promise<boolean> => {
    return LogService.create(createLog)
}

const editLog = async (editLog: EditLog): Promise<boolean> => {
    const log: Log = await LogService.findOne(editLog.id)
    const createdDate = (new Date(log.createdDate))
    const todayDate = (new Date())

    if ((createdDate.getFullYear() != todayDate.getFullYear())
        || (createdDate.getMonth() != todayDate.getMonth())
        || (createdDate.getDay() != todayDate.getDay())
    ) {
        return false
    }
    return await LogService.edit(editLog)
}

export const EmployeeService = {
    signin,
    signup,
    getDashboard,
    generateToken,
    decodeToken,
    getLogs,
    createLog,
    editLog
}