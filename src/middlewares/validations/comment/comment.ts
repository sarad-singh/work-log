import { Request, Response, NextFunction, RequestHandler } from "express";
import { FlashMessage } from "../../../constansts/flashMessage";
import { EmployeeService } from "../../../services/employee";
import { CreateCommentErrors } from "../../../types/comment";
import { CreateLog, CreateLogErrors, EditLog } from "../../../types/log";

const createComment: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { comment }: { comment: string } = req.body
    let errors: Partial<CreateCommentErrors> = {}

    if (!comment) {
        errors.comment = "comment is required"
    }

    if (Object.keys(errors).length) {
        req.flash(FlashMessage.ERROR, "Comment is required")
        return res.redirect(`/admin/view/log/${req.params.id}`)
    }
    next()
}

export const commentValidation = {
    createComment,
}