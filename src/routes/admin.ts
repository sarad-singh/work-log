import express from "express"
import { UserType } from "../constansts/userTypes"
import { adminController } from "../controllers/admin"
import { authenticate } from "../middlewares/auth/auth"
import { parseParamId } from "../middlewares/parser"
import { adminValidation } from "../middlewares/validations/admin/admin"
import { commentValidation } from "../middlewares/validations/comment/comment"

const router = express.Router()

router.get("/signin",
    adminController.getSignin)

router.get("/dashboard",
    authenticate(UserType.ADMIN),
    adminController.getDashboard
)
router.post("/auth/signin",
    adminValidation.signin,
    adminController.signin
)
router.get("/auth/logout",
    authenticate(UserType.ADMIN),
    adminController.logout
)
router.get("/create/employee",
    authenticate(UserType.ADMIN),
    adminController.getCreateEmployee)

router.post("/create/employee",
    authenticate(UserType.ADMIN),
    adminValidation.createEmployee,
    adminController.createEmployee)

router.get("/view/employees",
    authenticate(UserType.ADMIN),
    adminController.getEmployees)

router.get("/delete/employee/:id",
    parseParamId("id", "/admin/view/employees"),
    authenticate(UserType.ADMIN),
    adminController.deleteEmployee)

router.get("/view/log/:id",
    parseParamId("id", "/admin/dashboard"),
    authenticate(UserType.ADMIN),
    adminController.getLog
)
router.post("/comment/log/:id",
    parseParamId("id", "/admin/dashboard"),
    authenticate(UserType.ADMIN),
    commentValidation.createComment,
    adminController.createComment
)
router.get("/delete/log/:id",
    parseParamId("id", "/admin/dashboard"),
    authenticate(UserType.ADMIN),
    adminController.deleteLog
)
export const adminRouter = router