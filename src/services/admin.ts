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

const signin = async (email: string, password: string): Promise<Token | null> => {
    const user: Employee = await EmployeeModel.findOne({ email })
    if (!user || user.password !== password || !user.isAdmin) {
        return null
    }
    const token: Token = await AdminService.generateToken(user.id, user.email)
    console.log(user)
    return token
}

const generateToken = async (id: number, email: string): Promise<Token> => {
    const token: Token = jwt.sign({ id, email, userType: 'admin' }, config.jwt.secret, config.jwt.otions)
    return token
}

const decodeToken = async (token: Token): Promise<UserTokenPayload | null> => {
    const stringPayload = jwt.verify(token, config.jwt.secret)
    const payload: UserTokenPayload = JSON.parse(JSON.stringify(stringPayload))
    if (!payload.id || !payload.email) {
        return null
    }
    return payload
}

const getDashboard = async (): Promise<AdminDashboardData> => {
    const logs: DetailedLog[] = await LogService.findAll()
    return { logs }
}

const viewLog = async (logId: number): Promise<{ log: Log, comments: Comment[] }> => {
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
    generateToken,
    decodeToken,
    viewLog,
    createComment
}