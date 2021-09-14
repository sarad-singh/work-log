import { db } from "../database/db"
import { CreateLog, EditLog, Log } from "../types/log"

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
    const query = "DELETE * FROM `LOG` WHERE ?"
    const result = await db.query(query, [{ id }])
    return (result.deleteId) ? true : false
}


export const LogModel = {
    create,
    find,
    findOne,
    edit,
    remove
}