import { LogModel } from "../models/log"
import { CreateLog, EditLog, Log } from "../types/log"

const create = async (createLog: CreateLog): Promise<boolean> => {
    return LogModel.create(createLog)
}

const find = async (param?: { key: 'id' | 'employeeId', value: number }): Promise<Log[]> => {
    return LogModel.find(param)
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
    edit,
    remove
}