export interface Comment {
    id: number,
    comment: string,
    commentedOn: Date,
    commentedBy: Number
    logId: number
}

export interface CreateComment {
    comment: string,
    commentedOn: Date,
    commentedBy: number,
    logId: number
}

export interface EditComment {
    id: number
    comment: string
}