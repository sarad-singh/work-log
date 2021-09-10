import express, { Request, Response, Router } from "express";
import { employeeController } from "../controllers/employee";
import { authMiddleware } from "../middlewares/auth/auth";
import { employeeValidationMiddleware } from "../middlewares/validations/employee/employee";

const router = express.Router()

// page routes
router.get('/signup', (req: Request, res: Response) => { res.render('employee/signup') })
router.get('/signin', (req: Request, res: Response) => { res.render('employee/signin') })
router.get('/dashboard', authMiddleware.checkToken('employee'), employeeController.dashboard)

// server routes
router.post('/auth/signin', employeeValidationMiddleware.signin, employeeController.signin)
router.post('/auth/signup', employeeValidationMiddleware.signup, employeeController.signup)
router.get('/auth/logout', employeeController.logout)

export const employeeRouter = router
