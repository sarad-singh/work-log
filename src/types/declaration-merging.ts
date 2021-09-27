import "express-session"
import "express"

declare module "express-session" {
    interface SessionData {
        employee: {
            id: number,
            email: string
        },
        admin: {
            id: number,
            email: string
        }
    }
}

declare module "express" {
    interface Request {
        resourceId?: number
    }
}