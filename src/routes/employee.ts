import express from "express"
import { UserType } from "../constansts/userTypes"
import { employeeController } from "../controllers/employee"
import { authenticate, authorizeEmployeeForLog } from "../middlewares/auth/auth"
import { parseParamId } from "../middlewares/parser"
import { employeeValidation } from "../middlewares/validations/employee/employee"
import { logValidation } from "../middlewares/validations/log/log"

const router = express.Router()

router.get("/signin",
    employeeController.getSignin)

router.get("/dashboard",
    authenticate(UserType.EMPLOYEE),
    employeeController.getDashboard)

router.get("/create/log",
    authenticate(UserType.EMPLOYEE),
    employeeController.getCreateLog)

router.get("/edit/log/:id",
    parseParamId("id", "/employee/dashboard"),
    authenticate(UserType.EMPLOYEE),
    authorizeEmployeeForLog,
    employeeController.getEditLog)

router.get("/view/log/:id",
    parseParamId("id", "/employee/dashboard"),
    authenticate(UserType.EMPLOYEE),
    authorizeEmployeeForLog,
    employeeController.getLog)

router.get("/auth/logout",
    authenticate(UserType.EMPLOYEE),
    employeeController.logout)

router.post("/auth/signin",
    employeeValidation.signin,
    employeeController.signin)

router.get("/search/log",
    authenticate(UserType.EMPLOYEE),
    employeeValidation.searchLog,
    employeeController.searchLog
)

router.post("/create/log",
    authenticate(UserType.EMPLOYEE),
    logValidation.createLog,
    employeeController.createLog)

router.post("/edit/log/:id",
    parseParamId("id", "/employee/dashboard"),
    authenticate(UserType.EMPLOYEE),
    authorizeEmployeeForLog,
    logValidation.editLog,
    employeeController.editLog
)

export const employeeRouter = router
