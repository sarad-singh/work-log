import express, { Request, Response, Router } from "express";

const router = express.Router()

// page routes
router.get('/signup', (req: Request, res: Response) => {
    res.render('employee/signup')
})
router.get('/signin', (req: Request, res: Response) => {
    res.render('employee/signin')
})

// server routes
router.post('/auth/signin', (req: Request, res: Response) => {
    console.log(req.body)
    res.json(req.body)
})
router.post('/auth/signup', (req: Request, res: Response) => {
    console.log(req.body)
    res.json(req.body)
})
export const employeeRouter = router
