use emp_trackerDB;
INSERT INTO
  department (name)
VALUES
  ("Sales"),
  ("Engineering"),
  ("Finance"),
  ("Law");
INSERT INTO
  role (title, salary, department_id)
VALUES
  ("Sales Lead", 80000, 1),
  ("Salesperson", 50000, 1),
  ("Lead Engineer", 100000, 2),
  ("Software Engineer", 80000, 2),
  ("Account Manager", 100000, 3),
  ("Accountant", 90000, 3),
  ("Legal Team Lead", 200000, 4),
  ("Lawyer", 190000, 4),
INSERT INTO
  employees (first_name, last_name, role_id)
VALUES
  ("Shawn", "Spencer", 1),
  ("Burton", "Guster", 2),
  ("Juliet", "O'Hara", 3),
  ("Carleton", "Lassiter", 4),
  ("Henry", "Spencer", 5),
  ("Karen", "Vick", 6),
  ("Buzz", "McNab", 7),
  ("Leslie", "Knope", 8),
  ("April", "Ludgate", 2),
  ("Ron", "Swanson", 4),
  ("Andy", "Dwyer", 6),
  ("Ann", "Perkins", 8),
  ("Ben", "Wyatt", 2),
  ("Tom", "Haverford", 4),
  ("Chris", "Traeger", 6),
  ("Jerry", "Gergich", 8);