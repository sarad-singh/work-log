import express, { Request, Response, Router } from "express";
import { UserType } from "../constansts/userTypes";
import { employeeController } from "../controllers/employee";
import { authMiddleware } from "../middlewares/auth/auth";
import { employeeValidationMiddleware } from "../middlewares/validations/employee/employee";
import { logValidationMiddleware } from "../middlewares/validations/log/log";
import { LogService } from "../services/log";
import { Log } from "../types/log";

const router = express.Router()

// page routes
router.get('/signup', (req: Request, res: Response) => { res.render('employee/signup') })
router.get('/signin', (req: Request, res: Response) => { res.render('employee/signin') })
router.get('/dashboard', authMiddleware.checkToken(UserType.EMPLOYEE), employeeController.dashboard)
router.get('/create-log', authMiddleware.checkToken(UserType.EMPLOYEE), (req: Request, res: Response) => {
    res.render('employee/create-log')
})
router.get('/edit-log/:id',
    authMiddleware.checkToken(UserType.EMPLOYEE),
    authMiddleware.authorizeEmployeeForTask,
    async (req: Request, res: Response) => {
        const logId: number = parseInt(req.params.id)
        const log: Log = await LogService.findOne(logId)
        console.log(log)
        res.render('employee/edit-log', { data: log })
    })

// server routes
router.post('/auth/signin',
    employeeValidationMiddleware.signin,
    employeeController.signin)

router.post('/auth/signup',
    employeeValidationMiddleware.signup,
    employeeController.signup)

router.get('/auth/logout',
    authMiddleware.checkToken(UserType.EMPLOYEE),
    employeeController.logout)

router.post('/log',
    authMiddleware.checkToken(UserType.EMPLOYEE),
    logValidationMiddleware.createLog,
    employeeController.createLog)

router.post('/log/:id',
    authMiddleware.checkToken(UserType.EMPLOYEE),
    authMiddleware.authorizeEmployeeForTask,
    logValidationMiddleware.editLog,
    employeeController.editLog
)

export const employeeRouter = router
