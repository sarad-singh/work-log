import express, { Request, Response, Router } from "express";
import { UserType } from "../constansts/userTypes";
import { employeeController } from "../controllers/employee";
import { authMiddleware } from "../middlewares/auth/auth";
import { employeeValidationMiddleware } from "../middlewares/validations/employee/employee";
import { logValidationMiddleware } from "../middlewares/validations/log/log";
import { LogService } from "../services/log";
import { Log } from "../types/log";

const router = express.Router()

router.get('/signup', employeeController.getSignup)

router.get('/signin', employeeController.getSignin)

router.get('/dashboard',
    authMiddleware.checkToken(UserType.EMPLOYEE),
    employeeController.dashboard)

router.get('/create-log',
    authMiddleware.checkToken(UserType.EMPLOYEE),
    employeeController.getCreateLog)

router.get('/edit-log/:id',
    authMiddleware.checkToken(UserType.EMPLOYEE),
    authMiddleware.authorizeEmployeeForTask,
    employeeController.getEditLog)

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
