import mysql from 'mysql2/promise'
import { config } from '../config/config';

const pool = mysql.createPool(config.db);

const query = async  <T>(query: string, values: any[] = []): Promise<T[]> => {
    const [result] = await pool.query(query, values)
    const data = JSON.parse(JSON.stringify(result)) as T[]
    return data
}

const checkConnection: () => void = async () => {
    pool.getConnection().then(() => {
        console.log(`Database Connection: Success`)
    }).catch(err => {
        console.log(`Database Connection: Failure`)
        console.log(err)
        process.exit(1)
    })
}

export const db = { query, checkConnection }