import { Department } from "../constansts/department";
import { db } from "../database/db";
import { CreateEmployee, Employee } from "../types/employee";

const employeee: Employee = {
    id: 1,
    name: "John Doe",
    email: "john.doe@gmail.com",
    password: "P@ssw0rd",
    department: Department.SE
}

let employees: Employee[] = [employeee]


const findAll = async (): Promise<Employee[]> => {
    return employees
}

const findOne = async (email: string): Promise<Employee> => {
    const query = `SELECT * FROM \`employee\` WHERE \`email\`="${email}"`
    let result: Employee[] = await db.query<Employee>(query)
    return result[0]
}

const create = async (employee: CreateEmployee): Promise<boolean> => {
    const query = `INSERT INTO \`employee\` (\`name\`, \`department\`, \`email\`, \`password\`) VALUES ("${employee.name}", "${employee.department}", "${employee.email}", "${employee.password}")`
    let result: Employee[] = await db.query<Employee>(query)
    return (result) ? true : false
}

export const EmployeeModel = {
    findAll,
    findOne,
    create
}
