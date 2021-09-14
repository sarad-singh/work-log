import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken';

import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { config } from './config/config'
import { db } from './database/db';
import { employeeRouter } from './routes/employee';

db.checkConnection()
const app = express()
app.set('view engine', 'hbs');

app.use(morgan('tiny'))
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use('/employee', employeeRouter)

app.get('/get', (req: Request, res: Response) => {
    if (!req.cookies.token)
        return res.render('index')

    console.log(req.cookies)
    let payload = jwt.verify(req.cookies.token, config.jwt.secret)
    console.log(JSON.parse(JSON.stringify(payload)))
    res.render('index')
})

app.listen(config.port, () => {
    console.log(`App started on port: ${config.port}`)
})
