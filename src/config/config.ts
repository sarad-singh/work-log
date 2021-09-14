export const config = {
    port: 3000,
    db: {
        host: 'localhost',
        port: 8889,
        user: 'root',
        password: 'root',
        database: 'work-log'
    },
    jwt: {
        secret: 'udga789Yhbhgu7IUHI7v78jbhBI7BJhi',
        otions: {
            expiresIn: 24 * 60 * 60 * 1000,
            noTimestamp: true,
        }
    },
    cookieAge: 24 * 60 * 60 * 1000
}