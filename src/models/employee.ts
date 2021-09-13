import { Department } from "../constansts/department";
import { db } from "../database/db";
import { CreateEmployee, Employee } from "../types/employee";

const findAll = async (): Promise<Employee[]> => {
    const query = "SELECT * FROM  `EMPLOYEE`"
    const result: Employee[] = await db.query(query)
    return result
}

const findOne = async (param: { id: string } | { email: string }): Promise<Employee> => {
    const query = "SELECT * FROM  `EMPLOYEE` WHERE ?"
    const result: Employee[] = await db.query(query, [param])
    return result[0]
}

const create = async (employee: CreateEmployee): Promise<boolean> => {
    const query = `INSERT INTO \`EMPLOYEE\` SET ?`
    const result = await db.query(query, [employee])
    return (result.insertId) ? true : false
}

export const EmployeeModel = {
    findAll,
    findOne,
    create
}
