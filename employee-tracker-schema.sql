drop database if exists emp_trackerDB;
create database emp_trackerDB;
use emp_trackerDB;
create table department (
  id int not null auto_increment,
  name varchar(30),
  primary key (id)
);
create table role (
  id int auto_increment not null,
  title varchar(30),
  salary decimal,
  department_id int,
  primary key (id),
  foreign key (department_id) references role(id)
);
create table employees (
  id int auto_increment not null,
  first_name varchar(30),
  last_name varchar(30),
  role_id int,
  manager_id int,
  primary key (id),
  foreign key (role_id) references role(id),
  foreign key (manager_id) references role(id)
);
select
  *
from
  department;
select
  *
from
  role;
select
  *
from
  employee;