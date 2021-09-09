import { EmployeeModel } from "../models/employee"
import { CreateEmployee, Employee, SigninEmployee } from "../types/employee"

const signin = async (email: string, password: string): Promise<Employee | null> => {
    let employee: Employee = await EmployeeModel.findOne(email)
    if (employee && employee.password == password)
        return employee
    return null
}

const signup = async (employee: CreateEmployee): Promise<boolean> => {
    return EmployeeModel.create(employee)
}

export const EmployeeService = {
    signin,
    signup
}