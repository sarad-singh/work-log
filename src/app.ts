import express, { Request, Response } from 'express'
import morgan from 'morgan';
import { config } from './config/config'
import { employeeRouter } from './routes/employee';

export const app = express()
app.set('view engine', 'hbs');

app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: false }))
app.use('/employee', employeeRouter)
app.get('/', (req: Request, res: Response) => {
    res.render('index')
})
app.listen(config.port, () => {
    console.log(`App started on port: ${config.port}`)
})
