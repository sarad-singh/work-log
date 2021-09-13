import { db } from "../database/db"
import { CreateLog, Log } from "../types/log"

let insert = "INSERT INTO `log` (`id`, `title`, `description`, `createdDate`, `employeeId`) VALUES (NULL, 'Add feature A', 'feature A...', '2021-09-13 05:04:01.000000', '19');"

const create = async (createLog: CreateLog): Promise<boolean> => {
    const query = "INSERT INTO `LOG` SET ?"
    const result = await db.query(query, [createLog])
    return (result.insertId) ? true : false
}

const find = async (param: { id: number } | { employeeId: number }): Promise<Log[]> => {
    const query = "SELECT * FROM `LOG` WHERE ?"
    const result: Log[] = await db.query(query, [param])
    return result
}

const findOne = async (param: { id: number } | { employeeId: number }): Promise<Log> => {
    const query = "SELECT * FROM `LOG` WHERE ?"
    const result: Log[] = await db.query(query, [param])
    return result[0]
}

const remove = async (id: number): Promise<boolean> => {
    const query = "SELECT * FROM `LOG` WHERE ?"
    const result = await db.query(query, [{ id }])
    return (result.deleteId) ? true : false
}


export const LogModel = {
    create,
    find,
    findOne,
    remove
}