import { db } from "../database/db"
import { Comment, CreateComment, EditComment } from "../types/comment"

const find = async (logId: number): Promise<Comment[]> => {
    const query = `SELECT 
    comment.id, comment.comment, comment.commentedOn,
    employee.id as commentorId,
    employee.name as  commentorName,
    employee.email as commentorEmail,
    employee.department as commentorDepartment
    FROM comment 
    JOIN employee ON employee.id = comment.commentedBy where ?`

    const result: Comment[] = await db.query(query, [{ logId }])
    return result
}

const findOne = async (id: number): Promise<Comment> => {
    const query = `SELECT 
    comment.id, comment.comment, comment.commentedOn,
    employee.id as commentorId,
    employee.name as  commentorName,
    employee.email as commentorEmail,
    employee.department as commentorDepartment
    FROM comment 
    JOIN employee ON employee.id = comment.commentedBy where ?`

    const result: Comment[] = await db.query(query, [{ id }])
    return result[0]
}

const create = async (createLog: CreateComment): Promise<boolean> => {
    const query = "INSERT INTO `COMMENT` SET ?"
    const result = await db.query(query, [createLog])
    return (result.insertId) ? true : false
}


const edit = async ({ id, ...updates }: EditComment): Promise<boolean> => {
    const query = "UPDATE `COMMENT` SET ? WHERE ?"
    const result = await db.query(query, [updates, { id }])
    return (result.affectedRows) ? true : false
}

const remove = async (id: number): Promise<boolean> => {
    const query = "DELETE FROM `COMMENT` WHERE ?"
    const result = await db.query(query, [{ id }])
    return (result.affectedRows) ? true : false
}

export const CommentModel = {
    find,
    findOne,
    create,
    edit,
    remove
}