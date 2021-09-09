import { db } from "./db";

const employeeTable = "CREATE TABLE `work-log`.`employee` ( `id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `department` VARCHAR(255) NOT NULL , `email` VARCHAR(255) NOT NULL , `password` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`), UNIQUE `email` (`email`))"

const result = [db.query(employeeTable)]


Promise.all(result).then(() => {
    console.log("Table creation success")
    process.exit()
}).catch(() => {
    console.log("Table creation failure")
    process.exit()
})