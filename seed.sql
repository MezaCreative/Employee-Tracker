INSERT INTO department (name)
values ( "Sales");

INSERT INTO department (name)
values ( "Engineering");

INSERT INTO department (name)
values ( "Legal");

INSERT INTO department (name)
values ( "Finance");

INSERT INTO role (title, salary, department_id)
values ("Sales Lead", 70000, 1);

INSERT INTO role (title, salary, department_id)
values ("Salesperson", 50000, 1);

INSERT INTO role (title, salary, department_id)
values("Lead Engineer", 75000, 2);

INSERT INTO role (title, salary, department_id)
values ("Software Engineer", 130000, 2);

INSERT INTO role (title, salary, department_id)
values ("Lawyer", 60000, 3);

INSERT INTO role (title, salary, department_id)
values ("Accountant", 55000, 4);


INSERT INTO employee (first_name, last_name, role_id)
values ("George", "Clooney", 1);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
values ("Ted", "Gracie", 2, 1);