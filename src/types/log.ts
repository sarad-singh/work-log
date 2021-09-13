export interface CreateLog {
    title: string,
    description: string,
    createdDate: Date,
    employeeId: number
}
export interface Log extends CreateLog {
    id: number
}
