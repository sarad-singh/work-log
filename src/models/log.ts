import { Department } from "../constansts/department"
import { db } from "../database/db"
import { CreateLog, EditLog, Log, LogSearchParameter } from "../types/log"
import { SqlResultObject } from "../types/types"
import { CommentModel } from "./comment"

const create = async (createLog: CreateLog): Promise<boolean> => {
    const query = "INSERT INTO `log` SET ?"
    const date = new Date()
    const result: SqlResultObject = await db.query(query, [{ ...createLog, createdDate: date }])
    return (result.insertId) ? true : false
}

const find = async (param?: { key: "id" | "employeeId", value: number }): Promise<Log[]> => {
    let whereClause: string = ""
    if (param) {
        whereClause = `WHERE log.${param.key}=${param.value}`
    }
    const query = `SELECT 
    log.id AS id, log.title, log.description, log.createdDate, log.employeeId, 
    employee.name AS employeeName,  
    employee.email AS employeeEmail,
    employee.department AS employeeDepartment
    FROM log JOIN employee ON employee.id=employeeId 
    ${whereClause}
    ORDER BY createdDate DESC`

    const results: {
        id: number,
        title: string,
        description: string,
        createdDate: Date,
        employeeId: number,
        employeeName: string,
        employeeEmail: string,
        employeeDepartment: Department
    }[] = await db.query(query, [])

    let logs: Log[] = []
    for (let i = 0; i < results.length; i++) {
        const log = results[i]
        let comments = await CommentModel.find(log.id)
        const newLog: Log = {
            id: log.id,
            title: log.title,
            description: log.description,
            createdDate: log.createdDate,
            employee: {
                id: log.employeeId,
                name: log.employeeName,
                email: log.employeeEmail,
                department: log.employeeDepartment
            },
            comments
        }
        logs.push(newLog)
    }
    return logs
}

const findOne = async (id: number): Promise<Log> => {
    const logs: Log[] = await find({ key: "id", value: id })
    return logs[0]
}

const edit = async ({ id, ...updates }: EditLog): Promise<boolean> => {
    const query = "UPDATE `log` SET ? WHERE ?"
    const result: SqlResultObject = await db.query(query, [updates, { id }])
    return (result.affectedRows) ? true : false
}

const remove = async (id: number): Promise<boolean> => {
    const query = "DELETE FROM `log` WHERE ?"
    const result: SqlResultObject = await db.query(query, [{ id }])
    return (result.affectedRows) ? true : false
}

const search = async (searchParameter?: LogSearchParameter): Promise<Log[]> => {
    let whereClause: string = ""
    if (searchParameter) {
        whereClause = " WHERE "
        if (searchParameter.id) {
            whereClause += `log.id=${searchParameter.id} and `
        }
        if (searchParameter.title) {
            whereClause += `log.title LIKE '%${searchParameter.title}%' and `
        }
        if (searchParameter.createdDate) {
            whereClause += `log.createdDate LIKE '%${searchParameter.createdDate}%' and `
        }
        if (searchParameter.employeeName) {
            whereClause += `employee.name LIKE '%${searchParameter.employeeName}%' and `
        }
        if (searchParameter.department) {
            whereClause += `employee.department LIKE '%${searchParameter.department}%' and `
        }
        if (searchParameter.employeeId) {
            whereClause += `employee.id=${searchParameter.employeeId} and `
        }
        whereClause += `log.id>=0`
    }
    const query = `SELECT 
    log.id AS id, log.title, log.description, log.createdDate, log.employeeId, 
    employee.name AS employeeName,  
    employee.email AS employeeEmail,
    employee.department AS employeeDepartment
    FROM log JOIN employee ON employee.id=employeeId 
    ${whereClause}
    ORDER BY createdDate DESC`

    const results: {
        id: number,
        title: string,
        description: string,
        createdDate: Date,
        employeeId: number,
        employeeName: string,
        employeeEmail: string,
        employeeDepartment: Department
    }[] = await db.query(query, [])

    let logs: Log[] = []
    for (let i = 0; i < results.length; i++) {
        const log = results[i]
        let comments = await CommentModel.find(log.id)
        const newLog: Log = {
            id: log.id,
            title: log.title,
            description: log.description,
            createdDate: log.createdDate,
            employee: {
                id: log.employeeId,
                name: log.employeeName,
                email: log.employeeEmail,
                department: log.employeeDepartment
            },
            comments
        }
        logs.push(newLog)
    }
    return logs
}

export const LogModel = {
    create,
    find,
    search,
    findOne,
    edit,
    remove
}