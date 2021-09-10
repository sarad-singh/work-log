import express, { Request, Response } from 'express'
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

app.get('/', (req: Request, res: Response) => {
    return res.render('index')
})
app.listen(config.port, () => {
    return console.log(`App started on port: ${config.port}`)
})
