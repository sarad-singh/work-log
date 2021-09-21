import { EmployeeModel } from "../models/employee"
import { CreateEmployee, Employee, EmployeeDashboardData } from "../types/employee"
import { CreateLog, EditLog, Log } from "../types/log"
import { LogService } from "./log"
import bcrypt from "bcrypt"
import { config } from "../config/config"

const signin = async (email: string, password: string): Promise<Employee | null> => {
    const employee: Employee = await EmployeeModel.findOne({ email })
    if (!employee) {
        return null
    }
    const matched = await bcrypt.compare(password, employee.password)
    if (!matched) {
        return null
    }
    return employee
}

const create = async (employee: CreateEmployee): Promise<boolean> => {
    const hashedPassword = await bcrypt.hash(employee.password, config.bcrypt.saltRounds)
    employee.password = hashedPassword
    return EmployeeModel.create(employee)
}

const getDashboard = async (id: number): Promise<EmployeeDashboardData> => {
    const employee: Promise<Employee> = EmployeeModel.findOne({ id })
    const logs: Promise<Log[]> = EmployeeService.getLogs(id)
    const result = await Promise.all([employee, logs])
    return {
        profile: result[0],
        logs: result[1]
    }
}

const getLogs = async (id: number): Promise<Log[]> => {
    return LogService.find({ key: 'employeeId', value: id })
}

const getLog = async (logId: number): Promise<Log> => {
    return await LogService.findOne(logId)
}

const createLog = async (createLog: CreateLog): Promise<boolean> => {
    return LogService.create(createLog)
}

const editLog = async (editLog: EditLog): Promise<boolean> => {
    const log: Log = await LogService.findOne(editLog.id)
    const createdDate = new Date(log.createdDate)
    const todayDate = new Date()

    if ((createdDate.getFullYear() !== todayDate.getFullYear())
        || (createdDate.getMonth() !== todayDate.getMonth())
        || (createdDate.getDay() !== todayDate.getDay())
    ) {
        return false
    }
    return await LogService.edit(editLog)
}

export const EmployeeService = {
    signin,
    create,
    getDashboard,
    getLogs,
    getLog,
    createLog,
    editLog
}