import dotenv from 'dotenv'
dotenv.config()

export const config = {
    port: process.env.PORT,
    db: {
        host: process.env.DB_HOST,
        port: (process.env.DB_PORT) ? parseInt(process.env.DB_PORT) : 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        otions: {
            expiresIn: 24 * 60 * 60 * 1000,
            noTimestamp: true,
        }
    },
    cookieAge: 24 * 60 * 60 * 1000
}