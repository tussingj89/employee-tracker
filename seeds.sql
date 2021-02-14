INSERT INTO department (name)
VALUES ("Human Resources"), ("R&D"), ("Engineering"), ("Accounting"), ("Sales");

INSERT INTO role (title, salary, department_id)
VALUE ("manager", 75000.00, 2), ("engineer", 52000, 3), ("accountant", 62500, 4), ("recruiter", 57500, 1), ("sales person", 85650, 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUE 
 ("John", "Smith", 2), 
 ("Bill", "Gates", 2), 
 ("Jack", "Tussing", 3), 
 ("Steve", "Jobs", 5), 
 ("Andrew", "Young", 4), 
 ("Bernie", "Sanders", 1), 
 ("Micheal", "Meyers", 1); 

 UPDATE `company_db`.`employee` SET `manager_id` = '1' WHERE (`id` > '1');
 
