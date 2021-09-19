import { db } from "./db";

const employeeTable = "CREATE TABLE `work-log`.`employee` ( `id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `department` VARCHAR(255) NOT NULL , `email` VARCHAR(255) NOT NULL , `password` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`), UNIQUE `email` (`email`))"
const logTable = "CREATE TABLE `work-log`.`log` ( `id` INT NOT NULL AUTO_INCREMENT , `title` VARCHAR(255) NOT NULL , `description` TEXT NOT NULL , `createdDate` DATE NOT NULL, `employeeId` INT NOT NULL , PRIMARY KEY (`id`), INDEX `emplyeeId` (`employeeId`), FOREIGN KEY (`employeeId`) REFERENCES `employee` (`id`))"
const commentTable = "CREATE TABLE `work-log`.`comment` ( `id` INT NOT NULL AUTO_INCREMENT , `comment` TEXT NOT NULL , `createdDate` DATE NOT NULL, `adminId` INT NOT NULL , `logId` INT NOT NULL, PRIMARY KEY (`id`), INDEX `adminId` (`adminId`), INDEX `logId` (`logId`), FOREIGN KEY (`adminId`) REFERENCES `employee` (`id`), FOREIGN KEY (`logId`) REFERENCES `log` (`id`))"

const result = [db.query(employeeTable), db.query(logTable), db.query(commentTable)]

Promise.all(result).then(() => {
    console.log("Table creation success")
    process.exit()
}).catch(() => {
    console.log("Table creation failure")
    process.exit()
})