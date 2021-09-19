import { db } from "../database/db"
import { CreateLog, EditLog, Log, DetailedLog } from "../types/log"
import { CommentModel } from "./comment"

const create = async (createLog: CreateLog): Promise<boolean> => {
    const query = "INSERT INTO `LOG` SET ?"
    const date = new Date()
    const result = await db.query(query, [{ ...createLog, createdDate: date }])
    return (result.insertId) ? true : false
}

const find = async (param: { id: number } | { employeeId: number }): Promise<Log[]> => {
    const query = "SELECT * FROM `LOG` WHERE ?"
    const result: Log[] = await db.query(query, [param])
    return result
}

const findAll = async (): Promise<DetailedLog[]> => {
    const query = `SELECT 
    log.id, log.title, log.description, log.createdDate, 
    employee.id as employeeId,
    employee.name as employeeName,
    employee.email as employeeEmail,
    employee.department as employeeDepartment
    FROM log 
    JOIN employee ON log.employeeId = employee.id 
    ORDER BY createdDate DESC`

    const result: {
        id: number
        title: string,
        description: string,
        createdDate: Date,
        employeeId: number,
        employeeEmail: string,
        employeeName: string,
        employeeDepartment: string
    }[] = await db.query(query, [])

    let formatedResult: DetailedLog[] = []
    for (let i = 0; i < result.length; i++) {
        const log = result[i]
        const { id, title, description, createdDate } = log
        let comments = await CommentModel.find(id)
        const newLog: DetailedLog = {
            id,
            title,
            description,
            createdDate,
            employee: {
                id: log.employeeId,
                name: log.employeeName,
                email: log.employeeEmail,
                department: log.employeeDepartment
            },
            comments
        }
        formatedResult.push(newLog)
    }
    return formatedResult
}

const findOne = async (id: number): Promise<Log> => {
    const query = "SELECT * FROM `LOG` WHERE ?"
    const result: Log[] = await db.query(query, [{ id }])
    return result[0]
}

const edit = async ({ id, ...updates }: EditLog): Promise<boolean> => {
    const query = "UPDATE `LOG` SET ? WHERE ?"
    const result = await db.query(query, [updates, { id }])
    return (result.affectedRows) ? true : false
}

const remove = async (id: number): Promise<boolean> => {
    const query = "DELETE FROM `LOG` WHERE ?"
    const result = await db.query(query, [{ id }])
    return (result.affectedRows) ? true : false
}

export const LogModel = {
    create,
    find,
    findOne,
    findAll,
    edit,
    remove
}