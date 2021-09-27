export interface Comment {
    id: number,
    comment: string,
    commentedOn: Date,
    commentor: {
        id: number,
        email: string,
        name: string,
        department: string
    },
    logId: number
}

export interface CreateComment {
    comment: string,
    commentedOn: Date,
    commentedBy: number,
    logId: number
}
export interface CreateCommentErrors {
    comment: string
}

export interface EditComment {
    id: number
    comment: string
}