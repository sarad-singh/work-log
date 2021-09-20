import { Department } from "../constansts/department"
import { db } from "../database/db"
import { CreateLog, EditLog, Log } from "../types/log"
import { SqlResultObject } from "../types/types"
import { CommentModel } from "./comment"

const create = async (createLog: CreateLog): Promise<boolean> => {
    const query = "INSERT INTO `LOG` SET ?"
    const date = new Date()
    const result: SqlResultObject = await db.query(query, [{ ...createLog, createdDate: date }])
    return (result.insertId) ? true : false
}

const find = async (param?: { key: 'id' | 'employeeId', value: number }): Promise<Log[]> => {
    let whereClause: string = ''
    if (param) {
        whereClause = `WHERE log.${param.key}=${param.value}`
    }
    const query = `SELECT 
    log.id AS id, log.title, log.description, log.createdDate, log.employeeId, 
    employee.name AS employeeName,  
    employee.email AS employeeEmail,
    employee.department AS employeeDepartment
    FROM LOG JOIN employee ON employee.id=employeeId 
    ${whereClause}
    ORDER BY createdDate DESC`

    const result: {
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
    for (let i = 0; i < result.length; i++) {
        const log = result[i]
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
    const logs = await find({ key: 'id', value: id })
    return logs[0]
}

const edit = async ({ id, ...updates }: EditLog): Promise<boolean> => {
    const query = "UPDATE `LOG` SET ? WHERE ?"
    const result: SqlResultObject = await db.query(query, [updates, { id }])
    return (result.affectedRows) ? true : false
}

const remove = async (id: number): Promise<boolean> => {
    const query = "DELETE FROM `LOG` WHERE ?"
    const removeComments: Promise<boolean> = CommentModel.remove({ logId: id })
    const removeLog: Promise<SqlResultObject> = db.query(query, [{ id }])
    const result = await Promise.all([removeComments, removeLog])
    return (result[1].affectedRows) ? true : false
}

export const LogModel = {
    create,
    find,
    findOne,
    edit,
    remove
}