import jwt from 'jsonwebtoken'
import { config } from '../config/config'
import { EmployeeModel } from '../models/employee'
import { AdminDashboardData } from '../types/admin'
import { CreateComment } from '../types/comment'
import { Employee } from '../types/employee'
import { DetailedLog, Log } from '../types/log'
import { Token, UserTokenPayload } from '../types/types'
import { Comment } from '../types/comment'
import { CommentService } from './comment'
import { LogService } from './log'

const signin = async (email: string, password: string): Promise<Employee | null> => {
    const user: Employee = await EmployeeModel.findOne({ email })
    if (!user || user.password !== password || !user.isAdmin) {
        return null
    }
    return user
}


const getDashboard = async (): Promise<AdminDashboardData> => {
    const logs: DetailedLog[] = await LogService.findAll()
    return { logs }
}

const getLog = async (logId: number): Promise<{ log: Log, comments: Comment[] }> => {
    const result = await LogService.findOne(logId)
    const comments = await CommentService.findAll(logId)
    return {
        log: result,
        comments
    }
}

const createComment = async (comment: string, commentedBy: number, logId: number): Promise<boolean> => {
    const createComment: CreateComment = {
        comment,
        commentedOn: new Date(),
        commentedBy,
        logId
    }
    const result = await CommentService.create(createComment)
    return result
}

export const AdminService = {
    signin,
    getDashboard,
    getLog,
    createComment
}