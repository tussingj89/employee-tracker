//imports
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");
var chalk = require("chalk");

let roleArr = [];
let deptArr = [];
let employeeArr = [];
let managerArr = [];

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password_location",
    database: "company_db"
  });
  // connect to the mysql server and sql database
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as Id" + connection.threadId)
    startApp();
    runSearch();
});
//sets arrays using connection query
function setList() {
connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push({name: res[i].title, id: res[i].id});
    }
    // console.table(roleArr)
})
connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      employeeArr.push({name: res[i].last_name, id: res[i].id});
    }
    // console.table(employeeArr)
})
connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      deptArr.push({name: res[i].name, id: res[i].id});
    }
    // console.table(deptArr)
})
connection.query("SELECT * FROM employee WHERE role_id= 2", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managerArr.push({name: res[i].last_name, id: res[i].id});
    }
    // console.table(managerArr)
})
}
function startApp() {
	console.log(
		chalk.blueBright(`
---------------------------------------------------------------------------------------                                                
     ________                          __                                              
    /        |                        /  |                                             
    $$$$$$$$/  _____  ____    ______  $$ |  ______   __    __   ______    ______       
    $$ |__    /     \/    \  /      \ $$ | /      \ /  |  /  | /      \  /      \      
    $$    |   $$$$$$ $$$$  |/$$$$$$  |$$ |/$$$$$$  |$$ |  $$ |/$$$$$$  |/$$$$$$  |     
    $$$$$/    $$ | $$ | $$ |$$ |  $$ |$$ |$$ |  $$ |$$ |  $$ |$$    $$ |$$    $$ |     
    $$ |_____ $$ | $$ | $$ |$$ |__$$ |$$ |$$ \__$$ |$$ \__$$ |$$$$$$$$/ $$$$$$$$/      
    $$       |$$ | $$ | $$ |$$    $$/ $$ |$$    $$/ $$    $$ |$$       |$$       |     
    $$$$$$$$/ $$/  $$/  $$/ $$$$$$$/  $$/  $$$$$$/   $$$$$$$ | $$$$$$$/  $$$$$$$/      
                            $$ |                    /  \__$$ |                         
                            $$ |                    $$    $$/                          
                            $$/                      $$$$$$/                           
     __       __                                                                       
    /  \     /  |                                                                      
    $$  \   /$$ |  ______   _______    ______    ______    ______    ______            
    $$$  \ /$$$ | /      \ /       \  /      \  /      \  /      \  /      \           
    $$$$  /$$$$ | $$$$$$  |$$$$$$$  | $$$$$$  |/$$$$$$  |/$$$$$$  |/$$$$$$  |          
    $$ $$ $$/$$ | /    $$ |$$ |  $$ | /    $$ |$$ |  $$ |$$    $$ |$$ |  $$/           
    $$ |$$$/ $$ |/$$$$$$$ |$$ |  $$ |/$$$$$$$ |$$ \__$$ |$$$$$$$$/ $$ |                
    $$ | $/  $$ |$$    $$ |$$ |  $$ |$$    $$ |$$    $$ |$$       |$$ |                
    $$/      $$/  $$$$$$$/ $$/   $$/  $$$$$$$/  $$$$$$$ | $$$$$$$/ $$/                 
                                               /  \__$$ |                              
                                               $$    $$/                               
                                                $$$$$$/                                                                    
-----------------------------------------------------------------------------------------
    `)
	);
    };
// start of the inquirer prompts
function runSearch() {
    setList(); 
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        choices: [
         "Add to company",
         "View company", 
         "Update records",
         "Delete from the company",
         "Exit"],
         name: "action"
    }).then(function (input) {
		console.log('User selected ' + input.action);

		
        if (input.action === 'Add to company') {
            
            addToCompany();

		} else if (input.action === 'View company') {
			
			viewCompany();

		} else if (input.action === 'Update records') {
			
			updateCompany();

        } else if (input.action === "Delete from the company") {
            
            deleteFromCompany();

		}  else if(input.action === 'Exit') {
           
            connection.end();
        }
	}) 
}
// function to select what to add to the company
function addToCompany() {
  inquirer.prompt([{
      type: "list",
      message: "What would you like to add?",
      choices: [
          "Department",
          "Role",
          "Employee"
      ],
      name: "add_type"
  }]).then(function (input) {
    console.log('User selected ' + input.add_type);

    
    if (input.add_type === 'Department') {
        adddepartment();

    } else if (input.add_type === 'Role') {
        addroles();

    } else if (input.add_type === 'Employee') {
        addEmployee();
    }
})

}
// function to add an employee to the company
function addEmployee() {
    inquirer.prompt([{
        type: "input",
        message: "Enter employee's first name",
        name: "first_name"
    },
    {   type: "input",
        message: "Enter employee's last name",
        name: "last_name"
    },
    {
        type: "list",
        message: "what is there role",
        choices: roleArr,
        name: "newrole"
    },
    {
        type: "list",
        message: "Who is the manager",
        choices: managerArr,
        name: "manager"
        

    }]).then(function(answer){

     let roleID1;
        for (i=0; i < roleArr.length; i++){
            if (answer.newrole == roleArr[i].name){
                roleID1 = roleArr[i].id;
            }
        }

        let manager;
        for (i=0; i < managerArr.length; i++){
            if (answer.manager == managerArr[i].name){
                manager = managerArr[i].id;
            }
            // console.log(manager)
        }
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.first_name, answer.last_name, roleID1, manager] , function(err, res) {
        if (err) throw err;
        console.table("employee added");
        runSearch();
    }) 
})
}
// function to add depatments to the company
function adddepartment() {
    inquirer.prompt([{
        type: "input",
        message: "What department would you like to add?",
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
        message: "What role would you like to add?",
        name: "role"
    },
    {
        type: "input",
        message: "What is the salary of this role?",
        name: "salary"
    },
    {
        type: "list",
        message: "What is the department for this role?",
        choices: deptArr,
        name: "department"

    }]).then(function(answer){
        
        for (i=0; i < deptArr.length; i++){
            if (answer.department == deptArr[i].name){
                department = deptArr[i].id;
            }
        }
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.role, answer.salary, department], function(err, res) {
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
        message: "Wow would you like to view the company?",
        choices: ["By Department", "By the Roles", "By Employees", " View Employees by Managers"],
        name: "view_type"
    }]).then(function (input) {
        console.log('User selected ' + input.view_type);
    
        
        if (input.view_type === 'By Department') {
            byDepartment();
    
        } else if (input.view_type === 'By the Roles') {
            byRoles();
    
        } else if (input.view_type === 'By Employees') {
            byEmployee();

        // } else if (input.view_type === 'view department budgets') {
        //     viewBudget();
        
        } else if (input.view_type === ' View Employees by Managers') {
            byManager();
        }
    })
}
// query results by department
function byDepartment() {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", function(err, res) {
      if (err) throw err;
      console.table(res);
      runSearch();
    })
}
// query results by roles
function byRoles() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
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
// query results by managers
function byManager() {
    connection.query("SELECT * FROM employee ORDER BY manager_id", function(err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
      })
}
// query results by departments showing budget
// function viewBudget() {
//        connection.query("SELECT department_id AS id department.name AS department SUM(salary) AS budget FROM  role JOIN department ON role.department_id = department.id GROUP BY  department_id;"), 
//        function(err, res) {
//        if (err) throw err;
//        console.table(res)
//        runSearch();
//        }

// }
// function to select what you would like to update
function updateCompany() {
    inquirer.prompt([{
        type: "list",
        message: "What would you like to update?",
        choices: [
            "Employee",
            "Managers"
        ],
        name: "updateChoice"
    }]).then(function (input) {
        console.log('User selected ' + input.updateChoice);
    
        
        if (input.updateChoice === 'Employee') {
           updateEmployee();
    
        } else if (input.updateChoice === 'Managers') {
            updateManagers();
        }
    })
}
// function to update the employye by first and last name
function updateEmployee() {
    // console.log(employeeArr)
    inquirer.prompt([{
        type: "list",
        message: "Which employee would you like to update?",
        choices: employeeArr,
        name: "employName"
    },
    {
        type: "list",
        message: "What is there new role id?",
        choices: roleArr,
        name: "role"

    }]).then(function(answer) {
        let employName;
        for (i=0; i < employeeArr.length; i++){
            if (answer.employName == employeeArr[i].name){
                employID = employeeArr[i].id;
            }
        }
     let roleID2;
        for (i=0; i < roleArr.length; i++){
            // console.log(answer.role + "  " + roleArr[i].name)
            if (answer.role == roleArr[i].name){
                roleID2 = roleArr[i].id;
            }
        }
        connection.query("UPDATE employee SET role_id= ? WHERE id= ?", [roleID2, employID], function(err, res) {
            if (err) throw err;
            console.log(roleID2)
            console.log(employID)
            console.table("updated employee")
            runSearch();
        })
    })

}
// function to updat ethe managers information
function updateManagers() {
    inquirer
    .prompt([{
      type: "list",
      message: "Please select the [EMPLOYEE] you'd like to update: ",
      choices: employeeArr,
      name: "employee"
    },
    {
      type: "list",
      message: "Please select the employee's updated MANAGER",
      choices: managerArr,
      name: "manager"
    }]).then(function(answer) {

        let employID;
        for (i=0; i < employeeArr.length; i++){
            if (answer.employee == employeeArr[i].name){
                employID = employeeArr[i].id;
            }
        }
        let managerID;
        for (i=0; i < managerArr.length; i++){
            if (answer.manager == managerArr[i].name){
                managerID = managerArr[i].id;
            }
        }
        connection.query("UPDATE employee SET manager_id= ? WHERE id= ?", [managerID, employID], function(err, res) {
            if (err) throw err;
            console.table("updated employee")
            runSearch();
        })
    })

}
    
// function for deleting information form the company
function deleteFromCompany() {
    inquirer.prompt([{
        type: "list",
        message: "What information would you like to delete",
        choices: [
            "Role",
            "Employee",
            "Department"
        ],
        name: "deleteChoice"
    }]).then(function (input) {
        console.log('User selected ' + input.deleteChoice);
    
        
        if (input.deleteChoice === 'Employee') {
           deleteEmployee();
    
        } else if (input.deleteChoice === 'Role') {
            deleteRole();

        } else if (input.deleteChoice === 'Department') {
            deleteDepartment();
        }
    })
}
// function to delete employee
function  deleteEmployee() {
    inquirer.prompt([{

        type: "list",
        message: "Which employee would you like to update?",
        choices: employeeArr,
        name: "fired"
    

    }]).then(function(answer) {
        connection.query("DELETE FROM employee WHERE last_name= ?", [answer.fired], function(err, res) {
            if (err) throw err;
            console.table("deleted employee")
            runSearch();
        })
    })

}
// function to delete a role
function deleteRole() {
    inquirer.prompt([{

            type: "list",
            message: "What role would you like to delete",
            choices: roleArr,
            name: "role1"
    

    }]).then(function(answer) {
        
        for (i=0; i < roleArr.length; i++){
            if (answer.role1 == roleArr[i].name){
                roleID = roleArr[i].id;
            }
        }
        connection.query("DELETE FROM role WHERE id= ?", [roleID], function(err, res) {
            if (err) throw err;
            console.table("deleted role")
            runSearch();
        })
    })

}
// function to delete a department
function deleteDepartment() {
    inquirer.prompt([{

        type: "list",
        message: "What is the department?",
        choices: deptArr,
        name: "department"

    }]).then(function(answer) {

        for (i=0; i < deptArr.length; i++){
            if (answer.department == deptArr[i].name){
                deptID = deptArr[i].id;
            }
        }
        connection.query("DELETE FROM department WHERE id= ?", [deptID], function(err, res) {
            if (err) throw err;
            console.table(res + "deleted department")
            runSearch();
        })
    })

}
