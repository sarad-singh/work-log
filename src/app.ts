import express, { Request, Response } from 'express'
import { config } from './config/config'
import { employeeRouter } from './routes/employee';

export const app = express()
app.set('view engine', 'ejs');

app.get('/', (req: Request, res: Response) => {
    res.render('index')
})

app.use('/employee', employeeRouter)
app.listen(config.port, () => {
    console.log(`App started on port: ${config.port}`)
})
