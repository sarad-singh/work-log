import e from "connect-flash"
import { db } from "../database/db"
import { CreateEmployee, Employee } from "../types/employee"
import { SqlResultObject } from "../types/types"

const find = async (): Promise<Employee[]> => {
    const query = "SELECT * FROM  `EMPLOYEE`"
    const employees: Employee[] = await db.query(query)
    return employees
}

const findOne = async (param: { id: number } | { email: string }): Promise<Employee> => {
    const query = "SELECT * FROM  `EMPLOYEE` WHERE ?"
    const employees: Employee[] = await db.query(query, [param])
    return employees[0]
}

const create = async (employee: CreateEmployee): Promise<boolean> => {
    const query = "INSERT INTO `EMPLOYEE` SET ?"
    const result: SqlResultObject = await db.query(query, [employee])
    return (result.insertId) ? true : false
}

const remove = async (id: number): Promise<boolean> => {
    const query = "DELETE FROM `EMPLOYEE` WHERE ?"
    const result: SqlResultObject = await db.query(query, [{ id }])
    return (result.affectedRows) ? true : false
}

export const EmployeeModel = {
    find,
    findOne,
    create,
    remove
}
