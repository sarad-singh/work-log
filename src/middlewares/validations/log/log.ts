import { Request, Response, NextFunction, RequestHandler } from "express";
import { EmployeeService } from "../../../services/employee";
import { CreateLog, CreateLogErrors, EditLog } from "../../../types/log";

const createLog: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { title, description } = req.body
    const employeeId: number = req.session.employee!.id
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
    const id = req.resourceId as number
    const log: EditLog = { id, title, description }
    let errors: Partial<CreateLogErrors> = {}

    if (!log.title) {
        errors.title = "Title is required"
    }
    if (!log.description) {
        errors.description = "Description is required"
    }
    if (Object.keys(errors).length) {
        return res.render(`employee/edit-log`, { data: req.body, errorMessage: "Error with validation", errors })
    }

    next()
}

export const logValidation = {
    createLog,
    editLog
}