import { Request, Response, NextFunction, RequestHandler } from "express"
import { FlashMessage } from "../../../constansts/flashMessage"
import { CreateCommentErrors } from "../../../types/comment"

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