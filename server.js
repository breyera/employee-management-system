const mysql = require('mysql');
const inquirer = require('inquirer');
const conTable = require('console.table');
require('dotenv').config();
const fs = require('fs');

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PasSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) throw err;
    console.log(" /$$$$$$$$                      /$$                                           /$$$$$$$            /$$            \n| $$_____/                     | $$                                          | $$__  $$          | $$           \n| $$      /$$$$$$/$$$$  /$$$$$$| $$ /$$$$$$ /$$   /$$ /$$$$$$  /$$$$$$       | $$  \ $$ /$$$$$$ /$$$$$$   /$$$$$$\n| $$$$$  | $$_  $$_  $$/$$__  $| $$/$$__  $| $$  | $$/$$__  $$/$$__  $$      | $$  | $$|____  $|_  $$_/  |____  $$\n| $$__/  | $$ \  $$ \  $| $$  \  $| $| $$  \  $| $$  | $| $$$$$$$| $$$$$$$$      | $$  | $$ /$$$$$$$ | $$     /$$$$$$$\n| $$     | $$ | $$ | $| $$  | $| $| $$  | $| $$  | $| $$_____| $$_____/      | $$  | $$/$$__  $$ | $$ /$$/$$__  $$\n| $$$$$$$| $$ | $$ | $| $$$$$$$| $|  $$$$$$|  $$$$$$|  $$$$$$|  $$$$$$$      | $$$$$$$|  $$$$$$$ |  $$$$|  $$$$$$$\n|________|__/ |__/ |__| $$____/|__/\______/ \____   $$  \_______/\_______/       |_______/  \_______/  \___/   \_______/\n                      | $$                  /$$ | $$                                                             \n                      | $$                 | $$$$$$/                                                             \n                      |__/                  \______/                                                               \n");
    startEmpManager();
    updateServer();
});

function updateServer() {
    db.query("select * from role", (err, res) => {
        if (err) throw err;
        allRoles = res.map(role => ({ name: role.title, value: role.id }));
    })
    db.query("select * from department", (err, res) => {
        if (err) throw err;
        allDepartments = res.map(dept => ({ name: dept.name, value: dept.id }));
    })
    db.query("select * from employees", (err, res) => {
        if (err) throw err;
        allEmployees = res.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id }));
    })
};

function startEmpManager() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Departments",
          "View All Roles",
          "Add Employee",
          "Add Department",
          "Add Role",
          "Update Employee Role",
          "Exit"
        ]
      })
      .then( (answer) => {
        switch (answer.action) {
          case "View All Employees":
            viewAllEmployees();
            break;
  
          case "View All Departments":
            viewAllDepartments();
            break;
  
          case "View All Roles":
            viewAllRoles();
            break;
  
          case "Add Employee":
            addEmployee();
            break;
  
          case "Add Department":
            addDepartment();
            break;
  
          case "Add Role":
            addRole();
            break;
  
          case "Update Employee Role":
            updateEmployeeRole();
            break;
  
          case "Exit":
            db.end();
            break;
        }
      });
  }
  
  function viewAllEmployees() {
    console.log("   ");
    let query =
      "select employees.id, first_name as firstname, last_name as lastname, title as role, name as department, salary as salary from employees inner join role on employees.role_id = role.id inner join department on role.department_id = department.id;";
    db.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      startEmpManager();
    });
  }
  
  function viewAllDepartments() {
    console.log("   ");
    let query = "select id, name as department from department";
    db.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      startEmpManager();
    });
  }
  
  function viewAllRoles() {
    console.log("   ");
    let query =
      "select r.id, title as role, salary, name as department from role r left join department d on department_id = d.id";
    db.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      startEmpManager();
    });
  }
  
  function addEmployee() {
    updateServer();
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is their first name?"
        },
        {
          type: "input",
          name: "last_name",
          message: "What is their last name?"
        },
        {
          name: "role",
          type: "list",
          message: "What is their role?",
          choices: allRoles
        }
      ])
      .then( (answer) => {
        let query = db.query(
          "insert employees set ?",
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.role
          },
          (err, res) => {
            if (err) throw err;
            console.table("\nnew employee added.\n");
            startEmpManager();
          }
        );
      });
  }
  function addDepartment() {
    updateServer();
    inquirer
      .prompt([
        {
          type: "input",
          name: "new_department",
          message: "What department would you like to add?"
        }
      ])
      .then( (answer) => {
        let query = db.query(
          "insert into department set ?",
          {
            name: answer.new_department
          },
          (err, res) => {
            if (err) throw err;
            console.table("\nnew department added.\n");
            updateServer();
            startEmpManager();
          }
        );
      });
  }
  function addRole() {
    updateServer();
    inquirer
      .prompt([
        {
          type: "input",
          name: "new_role",
          message: "What role would you like to add?"
        },
        {
          type: "input",
          name: "new_salary",
          message: "What is the salary of this role?"
        },
        {
          name: "department",
          type: "list",
          message: "Which department does this role belong to?",
          choices: allDepartments
        }
      ])
      .then( (answer) => {
        let query = db.query(
          "insert into role set ?",
          {
            title: answer.new_role,
            salary: answer.new_salary,
            department_id: answer.department
          },
          (err, res) => {
            if (err) throw err;
            console.table("\nnew role added.\n");
            updateServer();
            startEmpManager();
          }
        );
      });
  }
  function updateEmployeeRole() {
    updateServer();
    inquirer
      .prompt([
        {
          name: "employee",
          type: "list",
          message: "Who would you like to update?",
          choices: allEmployees
        },
        {
          name: "role",
          type: "list",
          message: "What role does this employee have?",
          choices: allRoles
        }
      ])
      .then( (answer) => {
        let query = db.query(
          "update employees set ? where ?",
          [
            {
              role_id: answer.role
            },
            {
              id: answer.employee
            }
          ],
          (err, res) => {
            if (err) throw err;
            console.table("\nthis employee's role is updated.\n");
            updateServer();
            startEmpManager();
          }
        );
      });
  }

