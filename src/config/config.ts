import dotenv from "dotenv"
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
    session: {
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: true
    },
    cookieAge: 24 * 60 * 60 * 1000,
    bcrypt: {
        saltRounds: 10
    }
}