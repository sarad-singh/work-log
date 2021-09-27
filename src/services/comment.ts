import { CommentModel } from "../models/comment"
import { Comment, CreateComment, EditComment } from "../types/comment"

const create = async (createComment: CreateComment): Promise<boolean> => {
    return CommentModel.create(createComment)
}

const find = async (logId: number): Promise<Comment[]> => {
    return CommentModel.find(logId)
}

const findOne = async (id: number): Promise<Comment> => {
    return CommentModel.findOne(id)
}

const edit = async (editLog: EditComment): Promise<boolean> => {
    return CommentModel.edit(editLog)
}

const remove = async (id: number): Promise<boolean> => {
    return CommentModel.remove({ id })
}

export const CommentService = {
    create,
    findOne,
    find,
    edit,
    remove
}