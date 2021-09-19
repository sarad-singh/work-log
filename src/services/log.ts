import { LogModel } from "../models/log"
import { CreateLog, DetailedLog, EditLog, Log } from "../types/log"

const create = async (createLog: CreateLog): Promise<boolean> => {
    return LogModel.create(createLog)
}

const find = async (param: { id: number } | { employeeId: number }): Promise<Log[]> => {
    return LogModel.find(param)
}

const findAll = async (): Promise<DetailedLog[]> => {
    return LogModel.findAll()
}

const findOne = async (id: number): Promise<Log> => {
    return LogModel.findOne(id)
}

const edit = async (editLog: EditLog): Promise<boolean> => {
    return LogModel.edit(editLog)
}

const remove = async (id: number): Promise<boolean> => {
    return LogModel.remove(id)
}

export const LogService = {
    create,
    find,
    findOne,
    findAll,
    edit,
    remove
}