USE employees_db;

INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("HR"),
       ("Finance"); 

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Manager", 250000, 1), 
       ("Account Executive", 200000, 1),
       ("Engineering Manager", 250000, 2),
       ("Developer", 200000, 2),
       ("HR Partner", 100000, 3),
       ("Analyst", 150000, 4);     

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("John", "Smith", 1, NULL),
       ("Bob", "Patterson", 2, 1),
       ("Juan", "Martinez", 3, NULL),
       ("Mike", "Thompson", 4, 3),
       ("Jane", "Doe", 5, NULL),
       ("Jacky", "Chen", 6, NULL);