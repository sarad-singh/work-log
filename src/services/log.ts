import { LogModel } from "../models/log"
import { CreateLog } from "../types/log"

const create = async (createLog: CreateLog): Promise<boolean> => {
    return LogModel.create(createLog)
}

export const LogService = {
    create
}