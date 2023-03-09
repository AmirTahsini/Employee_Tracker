USE employees_db;

INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("HR"),
       ("Finance"); 

INSERT INTO roles (department_id, title, salary)
VALUES (1, "Account Executive", 200000),
       (1, "Sales Manager", 250000),
       (2, "Developer", 200000),
       (2, "Engineering Manager", 250000),
       (3, "HR Partner", 100000),
       (4, "Analyst", 150000);     

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Smith", 1, NULL),
       (2, "Bob", "Patterson", 1),
       (3, "Juan", "Martinez", NULL),
       (4, "Mike", "Thompson", 3),
       (5, "Jane", "Doe", NULL),
       (6, "Jacky", "Chen", NULL);