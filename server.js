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
                break;

            case "Update employee role":
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

                break;
            case "Employee":

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
                    console.log(res.affectedRows +  "added\n");
                    startPrompt();
                }
            );
        })
    
}