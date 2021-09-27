import mysql from "mysql2/promise"
import { config } from "../config/config"

const pool = mysql.createPool(config.db)

const query = async (query: string, values: any[] = []) => {
    const [result] = await pool.query(query, values)
    const data = JSON.parse(JSON.stringify(result))
    return data
}

const checkConnection: () => void = async () => {
    pool.getConnection().then((connection) => {
        console.log(`Database Connection: Success`)
        connection.release()
    }).catch(err => {
        console.log(`Database Connection: Failure`)
        console.log(err)
        process.exit(1)
    })
}

export const db = { query, checkConnection }