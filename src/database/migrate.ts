import { Department } from "../constansts/department"
import { Employee } from "../types/employee"
import { db } from "./db";

const allQueries = async (): Promise<void> => {
    const employeeTable = `CREATE TABLE employee ( id INT NOT NULL AUTO_INCREMENT , name VARCHAR(255) NOT NULL , department VARCHAR(255) NOT NULL , email VARCHAR(255) NOT NULL , password VARCHAR(255) NOT NULL, isAdmin TINYINT(1), PRIMARY KEY (id), UNIQUE email (email))`
    const logTable = `CREATE TABLE log ( id INT NOT NULL AUTO_INCREMENT , title VARCHAR(255) NOT NULL , description TEXT NOT NULL , createdDate DATETIME NOT NULL, employeeId INT NOT NULL , PRIMARY KEY (id), INDEX emplyeeId (employeeId), FOREIGN KEY (employeeId) REFERENCES employee (id))`
    const commentTable = `CREATE TABLE comment ( id INT NOT NULL AUTO_INCREMENT , comment TEXT NOT NULL , commentedOn DATETIME NOT NULL, commentedBy INT NOT NULL , logId INT NOT NULL, PRIMARY KEY (id), INDEX adminId (adminId), INDEX logId (logId), FOREIGN KEY (adminId) REFERENCES employee (id), FOREIGN KEY (logId) REFERENCES log (id))`
    const insertAdmin = `INSERT INTO employee SET ?`

    const admin: Employee = {
        id: 1,
        name: "Super Admin",
        password: "P@ssw0rd",
        email: "superadmin@worklog.com",
        department: Department.PROJECT_MANAGEMENT,
        isAdmin: true
    }
    await db.query(employeeTable)
    await db.query(logTable)
    await db.query(commentTable)
    await db.query(insertAdmin, [admin])
}

allQueries().then(() => {
    console.log("Migration success")
    process.exit()
}).catch((err) => {
    console.log(err)
    console.log("Migration failure")
    process.exit()
})