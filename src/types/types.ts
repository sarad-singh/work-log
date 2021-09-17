export interface UserTokenPayload {
    id: number,
    email: string
    userType: 'employee' | 'admin'
}

export type Token = string