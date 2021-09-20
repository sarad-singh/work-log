import { Log } from "./log"

export interface SigninAdmin {
    email: string,
    password: string
}

export interface SigninAdminErrors {
    email: string,
    password: string
}

export interface Admin {
    id: number
    name: string,
    email: string,
    department: string,
    password: string,
    isAdmin: boolean
}

export interface AdminDashboardData {
    logs: Log[]
}