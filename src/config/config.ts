import dotenv from 'dotenv'
dotenv.config()

const env = process.env

export const config = {
    port: env.PORT || 3000
}