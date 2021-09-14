import { Request, Response, NextFunction, RequestHandler } from "express";
import { EmployeeService } from "../../../services/employee";
import { CreateLog, CreateLogErrors, EditLog } from "../../../types/log";

const createLog: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { title, description } = req.body
    const token = req.cookies.token
    const payload = await EmployeeService.decodeToken(token)
    const employeeId = payload?.id as number
    const log: CreateLog = { title, description, employeeId }
    let errors: Partial<CreateLogErrors> = {}

    if (!log.title) {
        errors.title = "Title is required"
    }
    if (!log.description) {
        errors.description = "Description is required"
    }
    if (Object.keys(errors).length) {
        return res.render("employee/create-log", { data: req.body, errorMessage: "Error with validation", errors })
    }

    next()
}

const editLog: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { title, description } = req.body
    const id = parseInt(req.params.id)
    const log: EditLog = { id, title, description }
    let errors: Partial<CreateLogErrors> = {}

    if (!log.title) {
        errors.title = "Title is required"
    }
    if (!log.description) {
        errors.description = "Description is required"
    }
    if (Object.keys(errors).length) {
        return res.render(`employee/edit-log/${id}`, { data: req.body, errorMessage: "Error with validation", errors })
    }

    next()
}

export const logValidationMiddleware = {
    createLog,
    editLog
}