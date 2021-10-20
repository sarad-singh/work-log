import { db } from "../database/db"
import { Comment, CreateComment, EditComment } from "../types/comment"
import { SqlResultObject } from "../types/types"

const find = async (logId: number): Promise<Comment[]> => {
    const query = `SELECT 
    comment.id, comment.comment, comment.commentedOn, comment.logId,
    employee.id as commentorId,
    employee.name as  commentorName,
    employee.email as commentorEmail,
    employee.department as commentorDepartment
    FROM comment 
    JOIN employee ON employee.id = comment.commentedBy 
    where ?
    ORDER BY commentedOn DESC`

    const results = await db.query(query, [{ logId }])
    const comments: Comment[] = []
    results.forEach((element: any) => {
        const comment: Comment = {
            id: element.id,
            comment: element.comment,
            commentedOn: element.commentedOn,
            commentor: {
                id: element.commentorId,
                email: element.commentorEmail,
                name: element.commentorName,
                department: element.commentorDepartment
            },
            logId: element.logId
        }
        comments.push(comment)
    })
    return comments
}

const findOne = async (logId: number): Promise<Comment> => {
    const comments: Comment[] = await find(logId)
    return comments[0]
}

const create = async (createLog: CreateComment): Promise<boolean> => {
    const query = "INSERT INTO `comment` SET ?"
    const result: SqlResultObject = await db.query(query, [createLog])
    return (result.insertId) ? true : false
}


const edit = async ({ id, ...updates }: EditComment): Promise<boolean> => {
    const query = "UPDATE `comment` SET ? WHERE ?"
    const result: SqlResultObject = await db.query(query, [updates, { id }])
    return (result.affectedRows) ? true : false
}

const remove = async (param: { id: number } | { logId: number }): Promise<boolean> => {
    const query = "DELETE FROM `comment` WHERE ?"
    const result: SqlResultObject = await db.query(query, [param])
    return (result.affectedRows) ? true : false
}

export const CommentModel = {
    find,
    findOne,
    create,
    edit,
    remove
}