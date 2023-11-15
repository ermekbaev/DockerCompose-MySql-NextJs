CREATE USER 'root'@'172.23.0.3' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON users.* TO 'root'@'172.23.0.3';
FLUSH PRIVILEGES;


CREATE DATABASE IF NOT EXISTS users;

USE users;


CREATE TABLE IF NOT EXISTS departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255)
);

-- INSERT INTO departments (name) VALUES
--   ('HR'),
--   ('IT'),
--   ('Finance');

    INSERT INTO departments (name)
SELECT * FROM (SELECT 'HR') AS tmp
WHERE NOT EXISTS (
    SELECT name FROM departments WHERE name = 'HR'
) LIMIT 1;

    INSERT INTO departments (name)
SELECT * FROM (SELECT 'IT') AS tmp
WHERE NOT EXISTS (
    SELECT name FROM departments WHERE name = 'IT'
) LIMIT 1;

    INSERT INTO departments (name)
SELECT * FROM (SELECT 'Finance') AS tmp
WHERE NOT EXISTS (
    SELECT name FROM departments WHERE name = 'Finance'
) LIMIT 1;

CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255)
);

-- INSERT INTO roles (name) VALUES
--   ('Junior'),
--   ('Middle'),
--   ('Senior'),
--   ('intern');


  INSERT INTO roles (name)
SELECT * FROM (SELECT 'Junior') AS tmp
WHERE NOT EXISTS (
    SELECT name FROM roles WHERE name = 'Junior'
) LIMIT 1;

INSERT INTO roles (name)
SELECT * FROM (SELECT 'Middle') AS tmp
WHERE NOT EXISTS (
    SELECT name FROM roles WHERE name = 'Middle'
) LIMIT 1;

INSERT INTO roles (name)
SELECT * FROM (SELECT 'Senior') AS tmp
WHERE NOT EXISTS (
    SELECT name FROM roles WHERE name = 'Senior'
) LIMIT 1;

INSERT INTO roles (name)
SELECT * FROM (SELECT 'intern') AS tmp
WHERE NOT EXISTS (
    SELECT name FROM roles WHERE name = 'intern'
) LIMIT 1;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  number VARCHAR(255),
  address VARCHAR(255),
  email VARCHAR(255),
  department_id INT,
  role_id INT,
  FOREIGN KEY (department_id) REFERENCES departments(id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);