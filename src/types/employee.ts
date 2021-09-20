import { Log } from "./log";

export interface CreateEmployee {
    name: string,
    email: string,
    department: string,
    password: string,
    confirmPassword?: string,
    isAdmin: '0' | '1'
}

export interface CreateEmployeeErrors {
    name: string,
    email: string,
    department: string,
    password: string,
    confirmPassword: string,
    isAdmin: string
}

export interface SigninEmployee {
    email: string,
    password: string
}

export interface SigninEmployeeErros {
    email: string,
    password: string
}


export interface Employee {
    id: number
    name: string,
    email: string,
    department: string,
    password: string,
    isAdmin: boolean
}

export interface EmployeeDashboardData {
    profile: Employee,
    logs: Log[]
}