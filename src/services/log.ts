import { LogModel } from "../models/log"
import { CreateLog } from "../types/log"

const create = async (createLog: CreateLog): Promise<boolean> => {
    return LogModel.create(createLog)
}

const find = async (param: { id: number } | { employeeId: number }) => {
    return LogModel.find(param)
}

export const LogService = {
    create,
    find
}