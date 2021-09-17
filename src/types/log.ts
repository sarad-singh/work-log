export interface CreateLog {
    title: string,
    description: string,
    employeeId: number
}
export interface CreateLogErrors {
    title: string,
    description: string
}

export interface EditLog {
    id: number,
    title: string,
    description: string
}

export interface EditLogErrors {
    title: string,
    description: string
}

export interface Log {
    id: number
    title: string,
    description: string,
    createdDate: Date,
    employeeId: number
}