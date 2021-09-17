import { Log } from "./log";

export interface SignupEmployee {
    name: string,
    email: string,
    department: string,
    password: string
    confirmPassword: string
}

export interface SignupEmployeeErrors {
    name: string,
    email: string,
    department: string,
    password: string
    confirmPassword: string
}

export interface SigninEmployee {
    email: string,
    password: string
}

export interface SigninEmployeeErros {
    email: string,
    password: string
}

export interface UserTokenPayload {
    id: number,
    email: string
    userType: 'employee' | 'admin'
}

export interface CreateEmployee {
    name: string,
    email: string,
    department: string,
    password: string
}

export interface Employee {
    id: number
    name: string,
    email: string,
    department: string,
    password: string
}

export interface EmployeeDashboardData {
    profile: Employee,
    logs: Log[]
}