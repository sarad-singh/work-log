import express, { Request, Response } from 'express'
import { config } from './config/config'

const app = express()
app.set('view engine', 'ejs');

app.get('/', (req: Request, res: Response) => {
    res.render('index')
})

app.listen(config.port, () => {
    console.log(`App started on port: ${config.port}`)
})

