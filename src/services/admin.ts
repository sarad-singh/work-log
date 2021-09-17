import jwt from 'jsonwebtoken'
import { config } from '../config/config'
import { EmployeeModel } from '../models/employee'
import { Employee } from '../types/employee'
import { Token, UserTokenPayload } from '../types/types'

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

export const AdminService = {
    signin,
    generateToken,
    decodeToken
}