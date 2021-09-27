# Worklog
## Daily updates manager

Rather than asking each employee manually about their daily updates. A single platform 
to centralize every one's daliy taks updates can be beneficial for future and time saving in present. Woklog is this centralized platform to manage employee's daily updates.

## Features
-   ##### Employee
    - Employee can post daily updates
    - Option to choose departments
    - Auto selected todays date & time
    - Signin to post daily updates
    - Edit daily updates of same day only
    - See feedbacks provided by admin
    
- ##### Admin
    - Admin can view everyone’s daily updates
    - Admin can delete daily updates
    - Admin can comment on daily updates to each employee

## Tech

Technologies used to create this application

- [node.js] 
- [typescript]
- [express]
- [mySQL]
- [Handlebars]

Other Dependencies
[hbs], [express-sessions], [cookie-parser], [morgan]

## Installation

Worklog requires [Node.js](https://nodejs.org/) to run. If not installed, install from nodejs.org
Confirm installation by following command in your terminal which outputs your installed node version.
```node -v```

After installing node
1. clone worklog repository
    ``` git clone https://github.com/sarad-singh/work-log.git ```
2. change directory to work-log
    ```cd work-log```
3. install all dependencies and devDependencies
    ```npm install```
4. compile typescript src into javascript
    ```npm run build ```
5. create database in mysql named 'worklog' or any
6. create .env file and add environment variables following .env.example file
7. migrate all tables into database and sample superadmin by running 
    ```npm run migrate```.
    Inserted superadmin: 
    email: superadmin@worklog.com
    password: P@ssw0rd
8. start app 
    ``` npm run start  ```

   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [typescript]: <https://www.typescriptlang.org/>
   [mySql]: https://www.mysql.com/
   [hbs]: https://www.npmjs.com/package/hbs
   [mysql2]: https://www.npmjs.com/package/mysql2
   [express-sessions]: https://www.npmjs.com/package/expresssessions
   [cookie-parser]: https://www.npmjs.com/package/cookieparser
   [morgan]: https://www.npmjs.com/package/morgan
   [handlebars]: https://handlebarsjs.com/
