import express, { Request, Response, Router } from "express";
import { employeeController } from "../controllers/employee";

const router = express.Router()

// page routes
router.get('/signup', (req: Request, res: Response) => {
    res.render('employee/signup')
})
router.get('/signin', (req: Request, res: Response) => {
    res.render('employee/signin')
})

// server routes
router.post('/auth/signin', employeeController.signin)
router.post('/auth/signup', employeeController.signup)

export const employeeRouter = router
