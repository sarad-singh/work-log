import express from "express"
import { adminController } from "../controllers/admin"

const router = express.Router()

router.get('/signin', adminController.getSignin)
router.get('/dashboard', adminController.getDashboard)

export const adminRouter = router