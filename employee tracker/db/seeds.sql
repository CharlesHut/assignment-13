\c employeetrackerdb
insert into department(name) values 
('sales'),
('IT'),
('HR');
insert into role (title,salary,department_id) values
('salesperson',85000,1),
('ITperson',90000,2),
('HRperson',40000,3);
insert into employee (first_name, last_name, role_id, manager_id) values
('jerry','epstein',3,NULL),
('jeffery','springer',1,NULL),
('Rock','johnson',2,NULL);
