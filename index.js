//imports
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");


var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Wesley_1989",
    database: "company_db"
  });
  // connect to the mysql server and sql database
  connection.connect(function(err) {
    if (err) throw err;
    runSearch;
});
// start of the inquirer prompts
function runSearch() {
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        Choices: [
         "add to company",
         "view company", 
         "update employee records",
         "edit company records", // do i need if i can view update and delete some where else
         "delete from the company",
         "exit"],
         name: "action"
    }).then(function (input) {
		console.log('User selected ' + input.action);

		
        if (input.action === 'add to company') {
            
            addToCompany();

		} else if (input.action === 'view company ') {
			
			viewCompany();

		} else if (input.action === 'update records') {
			
			updateCompany();

		} else if(input.action === "edit company records") {
			
            editCompany();
        
        } else if (input.action === "delete from the company") {
            
            deleteFromCompany();

		}  else if(input.action === 'exit') {
           
            connection.end();
        }
	}) 
}
// function to select what to add to the company
function addToCompany() {
  inquirer.prompt([{
      type: "list",
      message: "what would you like to add",
      choices: [
          "department",
          "role",
          "employee"
      ],
      name: "add_type"
  }]).then(function (input) {
    console.log('User selected ' + input.add_type);

    
    if (input.add_type === 'department') {
        adddepartment();

    } else if (input.add_type === 'roles') {
        addroles();

    } else if (input.add_type === 'employee') {
        addEmployee();
    }
})

}
// function to add an employee to the company
function addEmployee() {
    inquirer.prompt([{
        type: "input",
        message: "enter employee's first name",
        name: "first_name"
    },
    {   type: "input",
        message: "enter employee's last name",
        name: "last_name"
    },
    {
        type: "input",
        message: "what is the employees role id number",
        name: "roleID"
    },
    {
        type: "input",
        message: "what is the managers id number",
        name: "managersID"

    }]).then(function(answer){
        connection.query("INSERT INTO employee (first_name, last_name, role_id, managers_id) VALUES (?, ?, ?, ?)", [answer.first_name, answer.last_name, answer.roleID, answer.managersID] , function(err, res) {
        if (err) throw err;
        console.table(res + "employee added")
        runSearch();
    })
})
}
// function to add depatments to the company
function adddepartment() {
    inquirer.prompt9([{
        type: "input",
        message: "what department would you like to add",
        name: "department"

    }]).then(function(answer){
            connection.query("INSERT INTO department (name) VALUES (?)", [answer.department] , function(err, res) {
            if (err) throw err;
            console.table(res + "department added")
            runSearch();
    })
    })
}
// function to add a role to the company
function addroles() {
    inquirer.prompt([{
        type: "input",
        message: "what role would you like to add",
        name: "role"
    },
    {
        type: "input",
        message: "What is the salary of this role",
        name: "salary"
    },
    {
        type: "input",
        message: "what is the departments id",
        name: "department_id"
    }]).then(function(answer){
        connection.query("INSERT INTO role (title, salary, depatment_id) VALUES (?, ?, ?)", [answer.role, answer.salary, answer.department_id], function(err, res) {
            if (err) throw err;
            console.log(res + "role added")
            runSearch();
        })
    })
}
// function to select how you want to view the company information
function viewCompany() {
    inquirer.prompt([{
        type: "list",
        message: "how would you like to view the company?",
        choices: ["by department", "by the roles", "by employees", "view department budgets"],
        name: "view_type"
    }]).then(function (input) {
        console.log('User selected ' + input.view_type);
    
        
        if (input.view_type === 'by department') {
            byDepartment();
    
        } else if (input.view_type === 'by the roles') {
            byRoles();
    
        } else if (input.view_type === 'by employees') {
            byEmployee();

        } else if (input.view_type === 'view department budgets') {
            viewBudget();
        }
    })
}
// query results by department
function byDepartment() {
    connection.query("SELECT * FROM department", function(err, res) {
      if (err) throw err;
      console.table(res);
      runSearch();
    })
}
// query results by roles
function byRoles() {
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
      })
}
// query results by employees
function byEmployee(){
    connection.query("SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id", function(err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
      })
}
function byManager() {
    
}
// query results by departments showing budget
function viewBudget() {

}
// function to select what you would like to update
function updateCompany() {
    inquirer.prompt([{
        type: "list",
        message: "what would you like to update?",
        choices: [
            "employee",
            "managers"
        ],
        name: "updateChoice"
    }]).then(function (input) {
        console.log('User selected ' + input.updateChoice);
    
        
        if (input.updateChoice === 'employee') {
           updateEmployee();
    
        } else if (input.updateChoice === 'managers') {
            updateManagers();
        }
    })
}
// function to update the employye by first and last name
function updateEmployee() {
    inquirer.prompt([{
        type: "input",
        message: "which employee would you like to update, first name please",
        name: "employNameFirst"
    },
    {
        type: "input",
        message: "last name please",
        name: "employNameLast"
    },
    {
        type: "input",
        message: "what role would you like them to be in now?",
        name: "updateRole"

    }]).then(function(answer) {
        connection.query("UPDATE SET role_id= ? WHERE first_name= ? AND last_name= ?", [answer.updateRole, answer.employnameFirst, answer.employnameLast], function(err, res) {
            if (err) throw err;
            console.table(res + "updated employee")
            runSearch();
        })
    })

}
// function to updat ethe managers information
function updateManagers() {

}
// function for deleting information form the company
function deleteFromCompany() {
    inquirer.prompt([{
        type: "list",
        message: "what information would you like to delete",
        choices: [
            "role",
            "employee",
            "department"
        ],
        name: "deleteChoice"
    }]).then(function (input) {
        console.log('User selected ' + input.deleteChoice);
    
        
        if (input.deleteChoice === 'employee') {
           deleteEmployee();
    
        } else if (input.deleteChoice === 'role') {
            deleteRole();

        } else if (input.deleteChoice === 'department') {
            deleteDepartment();
        }
    })
}
// function to delete employee
function  deleteEmployee() {
    inquirer.prompt([{

        type: "input",
        message: "what is there role id?",
        name: "roleId"

    }]).then(function(answer) {
        connection.query("DELETE FROM employee WHERE role_Id= ?", [answer.roleId], function(err, res) {
            if (err) throw err;
            console.table(res + "deleted employee")
            runSearch();
        })
    })

}
// function to delete a role
function deleteRole() {
    inquirer.prompt([{

        type: "input",
        message: "what is the role id?",
        name: "roleId"

    }]).then(function(answer) {
        connection.query("DELETE FROM role WHERE id= ?", [answer.roleId], function(err, res) {
            if (err) throw err;
            console.table(res + "deleted role")
            runSearch();
        })
    })

}

// function to delete a department
function deleteDepartment() {
    inquirer.prompt([{

        type: "input",
        message: "what is there department id?",
        name: "departmentId"

    }]).then(function(answer) {
        connection.query("DELETE FROM department WHERE id= ?", [answer.departmentId], function(err, res) {
            if (err) throw err;
            console.table(res + "deleted department")
            runSearch();
        })
    })

}

// function editCompany() {

// }