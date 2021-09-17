import express from "express"
import { UserType } from "../constansts/userTypes"
import { adminController } from "../controllers/admin"
import { authMiddleware } from "../middlewares/auth/auth"
import { adminValidationMiddleware } from "../middlewares/validations/admin/admin"

const router = express.Router()

router.get('/signin', adminController.getSignin)
router.get('/dashboard',
    authMiddleware.checkToken(UserType.ADMIN),
    adminController.getDashboard)

router.post('/auth/signin',
    adminValidationMiddleware.signin,
    adminController.signin)
router.get('/auth/logout',
    authMiddleware.checkToken(UserType.ADMIN),
    adminController.logout
)
export const adminRouter = router