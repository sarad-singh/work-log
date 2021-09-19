import express from "express"
import { UserType } from "../constansts/userTypes"
import { employeeController } from "../controllers/employee"
import { authenticate, authorizeEmployeeForTask } from "../middlewares/auth/auth"
import { parseParamId } from "../middlewares/parser"
import { employeeValidationMiddleware } from "../middlewares/validations/employee/employee"
import { logValidationMiddleware } from "../middlewares/validations/log/log"

const router = express.Router()

router.get('/signup', employeeController.getSignup)

router.get('/signin', employeeController.getSignin)

router.get('/dashboard',
    authenticate(UserType.EMPLOYEE),
    employeeController.getDashboard)

router.get('/create/log',
    authenticate(UserType.EMPLOYEE),
    employeeController.getCreateLog)

router.get('/edit/log/:id',
    parseParamId('id', '/employee/dashboard'),
    authenticate(UserType.EMPLOYEE),
    authorizeEmployeeForTask,
    employeeController.getEditLog)

router.get('/view/log/:id',
    parseParamId('id', '/employee/dashboard'),
    authenticate(UserType.EMPLOYEE),
    authorizeEmployeeForTask,
    employeeController.getLog)

router.get('/auth/logout',
    authenticate(UserType.EMPLOYEE),
    employeeController.logout)

router.post('/auth/signin',
    employeeValidationMiddleware.signin,
    employeeController.signin)

router.post('/auth/signup',
    employeeValidationMiddleware.signup,
    employeeController.signup)

router.post('/create/log',
    authenticate(UserType.EMPLOYEE),
    logValidationMiddleware.createLog,
    employeeController.createLog)

router.post('/edit/log/:id',
    parseParamId('id', '/employee/dashboard'),
    authenticate(UserType.EMPLOYEE),
    authorizeEmployeeForTask,
    logValidationMiddleware.editLog,
    employeeController.editLog
)

export const employeeRouter = router
