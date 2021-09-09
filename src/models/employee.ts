import { Department } from "../constansts/department";
import { CreateEmployee, Employee } from "../types/employee";

const employee: Employee = {
    id: 1,
    name: "John Doe",
    email: "john.doe@gmail.com",
    password: "P@ssw0rd",
    department: Department.SE
}

let employees: Employee[] = [employee]


const findAll = async (): Promise<Employee[]> => {
    return employees
}

const findOne = async (email: string): Promise<Employee> => {
    return employee
}

const create = async (employee: CreateEmployee): Promise<Employee> => {
    let id = employees.length + 1
    let newEmployee: Employee = {
        id,
        ...employee
    }
    employees.push(newEmployee)
    return newEmployee
}

export const EmployeeModel = {
    findAll,
    findOne,
    create
}
