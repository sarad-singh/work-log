import express from "express"
import { UserType } from "../constansts/userTypes"
import { adminController } from "../controllers/admin"
import { authenticate } from "../middlewares/auth/auth"
import { adminValidationMiddleware } from "../middlewares/validations/admin/admin"

const router = express.Router()

router.get('/signin', adminController.getSignin)

router.get('/dashboard',
    authenticate(UserType.ADMIN),
    adminController.getDashboard
)
router.post('/auth/signin',
    adminValidationMiddleware.signin,
    adminController.signin
)
router.get('/auth/logout',
    authenticate(UserType.ADMIN),
    adminController.logout
)
router.get('/view/log/:id',
    authenticate(UserType.ADMIN),
    adminController.viewLog
)
router.post('/feedback/log/:id',
    authenticate(UserType.ADMIN),
    adminController.createComment
)
router.get('/delete/log/:id',
    authenticate(UserType.ADMIN),
    adminController.deleteLog
)
export const adminRouter = router