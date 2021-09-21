import { EmployeeModel } from "../models/employee"
import { AdminDashboardData } from "../types/admin"
import { CreateComment } from "../types/comment"
import { Employee } from "../types/employee"
import { CommentService } from "./comment"
import { LogService } from "./log"
import { Log } from "../types/log"
import bcrypt from "bcrypt"

const signin = async (email: string, password: string): Promise<Employee | null> => {
    const employee: Employee = await EmployeeModel.findOne({ email })
    if (!employee) {
        return null
    }
    const matched = await bcrypt.compare(password, employee.password)
    if (!matched || !employee.isAdmin) {
        return null
    }
    return employee
}


const getDashboard = async (): Promise<AdminDashboardData> => {
    const logs: Log[] = await LogService.find()
    return { logs }
}

const getLog = async (logId: number): Promise<Log> => {
    return await LogService.findOne(logId)
}

const createComment = async (comment: string, commentedBy: number, logId: number): Promise<boolean> => {
    const createComment: CreateComment = {
        comment,
        commentedOn: new Date(),
        commentedBy,
        logId
    }
    return await CommentService.create(createComment)
}

export const AdminService = {
    signin,
    getDashboard,
    getLog,
    createComment
}