drop database if exists emp_trackerDB;
create database emp_trackerDB;

use emp_trackerDB;

create table department (
	id int not null auto_increment,
    name varchar(30) not null,
    primary key (id)
);

create table role (
	id int not null auto_increment,
    title varchar(30) not null,
    salary decimal(10, 2) not null,
    department_id int default 0,
    primary key (id)
);

create table employee (
	id int not null auto_increment,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int default 0,
    manager_id int default 0,
    primary key (id)
);

select * from department;
select * from role;
select * from employee;