const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'bootcamp2',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

function userPrompt() {
    inquirer.prompt ([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "view all departments",
                "view all roles",
                "view all employees",
                "add a department",
                "add a role",
                "add an employee",
                "update an employee role"
            ]
        }
    ])
    .then(answers => {
      if(answers.action === 'view all departments') {
        viewDepartments();
      } 
      else if(answers.action === 'view all roles') {
        viewRoles();
      }
      else if(answers.action === 'view all employees') {
        viewEmployees();
      }
      else if(answers.action === 'add a department') {
        addDepartment();
      }
      else if(answers.action === 'add a role') {
        addRole();
      }
      else if(answers.action === 'add an employee') {
        addEmployee();
      }
      else if(answers.action === 'updated an employee role') {
        updateEmployee();
      }
      
    })
}

function viewDepartments() {
    db.query('SELECT * FROM department', function (err, res) {
    if (err) throw err;    
    console.log('VIEW DEPARTMENTS');
    console.table(res);
    userPrompt();
});
}

function viewRoles() {
    db.query(
        'SELECT roles.id, roles.title, roles.salary, department.name AS department FROM roles LEFT JOIN department ON roles.department_id = department.id;', function (err, res) {
    if (err) throw err;    
    console.log('VIEW ROLES');
    console.table(res);
    userPrompt();
});
}

function viewEmployees() {
    db.query(
        'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;', function (err, res) {
    if (err) throw err;    
    console.log('VIEW EMPLOYEES');
    console.table(res);
    userPrompt();
});
}

function addDepartment() {
    inquirer.prompt ([
      
      {
        type: "input",
        name: "department",
        message: "What is the department name?"
      }

    ]).then(answers => {
        db.query('INSERT INTO department (name) VALUES ?', [answers.department], function (err, res) {
            if (err) throw err;    
            console.log('Department Added');
            console.table(res);
        })
      });
    }

function addRole() {
    db.query('SELECT * FROM department', function (err, res) {
        const departments = res.map(function (department){
            return {name: department.name, value: department.id}
        })
    inquirer.prompt ([
      
      {
        type: "input",
        name: "title",
        message: "What is the role name?"
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary?"
      },
      {
        type: "list",
        name: "department",
        message: "Which department does the role belong to?",
        choices: departments
      }

    ]).then(answers => {
        db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [answers.title, answers.salary, answers.department] , function (err, res) {
            if (err) throw err;    
            console.log('Department Added');
            console.table(res);
        })
      });
    })
    }
      
function addEmployee() {
    db.query('SELECT * FROM roles', function (err, res) {
        const roles = res.map(function (role){
            return {name: role.title, value: role.id}
        })
        db.query('SELECT * FROM employee', function (err, res) {
            const employees = res.map(function (employee){
                return {name: employee.first_name + " " + employee.last_name, value: employee.id}
            })
    inquirer.prompt ([
      
      {
        type: "input",
        name: "firstname",
        message: "What is the employee's first name?"
      },
      {
        type: "input",
        name: "lastname",
        message: "What is the employee's last name?"
      },
      {
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: roles
      },
      {
        type: "list",
        name: "manager",
        message: "Who is the employee's manager?",
        choices: employees
      }

    ]).then(answers => {
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [answers.firstname, answers.lastname, answers.role, answers.manager] , function (err, res) {
            if (err) throw err;    
            console.log('Department Added');
            console.table(res);
        })
      });
    })
    })
    }

/*GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database */