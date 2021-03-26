// Esteban Meza
// @MezaCreative
//NOTE: Not many comments these functions are self-explanatory
const inquirer = require("inquirer");
const mysql = require ("mysql");

const connection = mysql.createConnection({
    host: "localhost",

    port:3306,

    user: "root",
    password: "root",
    database: "employees_db",
});

connection.connect((err) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    startPrompt();
});

function startPrompt() {
    inquirer.prompt({
        name: "firstAction",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "Add a department, role, or employee",
            "View a department, role, or employee",
            "Update employee role",
            "End"
        ]
    })
    .then ((answer) => {
        switch (answer.firstAction) {
            case "Add a department, role, or employee":
                add();
                break;

            case "View a department, role, or employee":
                view();
                break;

            case "Update employee role":
                update();
                break;

            case "End":
                console.log("goodbye!")
                connection.end();
                break;

        }
    })
}

function add() {
    inquirer.prompt({
        name: "addType",
        type:"list",
        message: "Which would you like to add?",
        choices: ["Department", "Role", "Employee"]
    })
    .then((answer) => {
        switch (answer.addType) {
            case "Department":
                addDepartment();
                break;
            case "Role":
                addRole();
                break;
            case "Employee":
                addEmployee();
                break;  
        }
    })
}

function addDepartment() {
    inquirer.prompt([
        {
        name: "departmentName",
        type: "input",
        message: "Enter the Department name."
        }])
        .then((answer) => {
            console.log("Insterting... " + answer.departmentName + "\n");
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.departmentName,
                },
                function(err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows +  "department(s) added\n");
                    startPrompt();
                }
            );
        })
    
}
function addRole() {
    inquirer.prompt([
        {
            name: "roleName",
            type:"input",
            message: "Enter the name of the role."
        },
        {
            name: "roleSalary",
            type:"input",
            message: "What is the salary for such role?"
        },
        {
        name: "roleDepartment",
        type: "input",
        message: "What is the roles department?"
         }
    ])
        .then((answer) => {
            console.log("Inserting role....\n......\n.......\n");
            connection.query(
                "INSERT INTO role set ?",
                {
                    title: answer.roleName,
                    salary: answer.roleSalary,
                    department_id: answer.roleDepartment
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows +  " role(s) added!\n");
                    startPrompt();
                }
            )
        })
}

function addEmployee(){
    inquirer.prompt([
        {
        name: "employeeFirstName",
        type: "input",
        message: "Enter the Employee's first name?"
        },
        {
            name: "employeeLastName",
            type: "input",
            message: "Enter the Employee's last name?"
        },
        {
            name: "employeeId",
            type: "input",
            message: "Enter the Employee's role Id?"
        },
        {
            name: "employeeMan",
            type: "input",
            message: "Enter the Employee's Manager Id?"
        },
    ])
        .then((answer) => {
            console.log("Insterting Employee info ......\n .....\n.......\n");
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.employeeFirstName,
                    last_name: answer.employeeLastName,
                    role_id: answer.employeeId,
                    manager_id: answer.employeeMan
                },
                function(err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows +  " employee(s) added!\n");
                    startPrompt();
                }
            );
        })
}

function view() {
    inquirer.prompt({
        name: "viewType",
        type:"list",
        message: "Which would you like to view?",
        choices: ["Department", "Role", "Employee"]
    })
    .then((answer) => {
        switch (answer.viewType) {
            case "Department":
                console.log("before");
                viewDepartment();
                break;
            case "Role":
                viewRole();
                break;
            case "Employee":
                viewEmployee();
                break;  
        }
    })
}

function viewDepartment() {
        connection.query("SELECT * FROM department;",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            startPrompt();
        }
        )
}

function viewRole(){
    connection.query("SELECT * FROM role;",
    function (err, res) {
        if (err) throw err;
        console.table(res);
        startPrompt();
    }
    )
}
function viewEmployee() {
    connection.query("SELECT * FROM employee;",
    function (err, res) {
        if (err) throw err;
        console.table(res);
        startPrompt();
    }
    )
}

function update(){
    inquirer.prompt({
        name: "updatePerson",
        type: "intput",
        message: "Please enter the Id number for the person being updated."
    },
        {
        name: "updateType",
        type:"list",
        message: "What would you like to update?",
        choices: ["Employee Role", "Employee Manager"]
    },
    )
    .then((answer) => {
        
        switch (answer.updateType) {
            case "Employee Role":
                const newRole = findID(answer.updateType);
                console.log( "Employee Role is " + newRole);
                startPrompt();
                break;
            case "Employee Manager":
                const newMan = findID(answer.updateType);
                console.log("Employee Manager is " + newMan);
                startPrompt();
                break;
        }
    })
    
}

function findID(type) {
    inquirer.prompt({
        name: "idNum",
        type: "input",
        message: "Please enter the " + type + " Id Number."
    })
    .then((answer) => {
        return answer.idNum;
    })
}