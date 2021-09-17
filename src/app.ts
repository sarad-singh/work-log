import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { config } from './config/config'
import { registerHbsHelpers } from './config/hbs'
import { db } from './database/db';
import { employeeRouter } from './routes/employee';
import { adminRouter } from './routes/admin';

db.checkConnection()
const app = express()
app.set('view engine', 'hbs');
registerHbsHelpers()

app.use(morgan('tiny'))
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use('/employee', employeeRouter)
app.use('/admin', adminRouter)

app.get('/', (req: Request, res: Response) => {
    return res.render('index')
})
app.listen(config.port, () => {
    return console.log(`App started on port: ${config.port}`)
})
