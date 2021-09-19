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
        secret: process.env.JWT_SECRET || "f9bf78b9a18ce6d46a0cd2b0b86df9da",
        otions: {
            expiresIn: 24 * 60 * 60 * 1000,
            noTimestamp: true,
        }
    },
    session: {
        secret: 'D4F3C82BEBE5F8CD8AF39291C2A5E',
        resave: false,
        saveUninitialized: true
    },
    cookieAge: 24 * 60 * 60 * 1000
}