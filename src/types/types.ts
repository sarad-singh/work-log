export interface SqlResultObject {
    fieldCount: number,
    affectedRows: number,
    insertId: number,
    serverStatus: number,
    warningCount: number,
    message: string
    protocol41: string,
    changedRows: number
}