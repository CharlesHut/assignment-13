const inquirer = require ("inquirer")
const {Pool} =require("pg")
const pool = new Pool ({
    user: 'postgres',
    password: '2poodles',
    host: 'localhost',
    database: 'employeetracker',
    port:5432
})
console.log("connected")

function menu(){
    inquirer.prompt([
        {
            name:"menu",
            message:"what would you like to do",
            type:"list",
            choices:["viewRoles","viewDepartments","viewEmployees","addRole","addDepartment","addEmployee","updateEmployeeRole", "exit"]
        }
    ])
    .then(answers=>{
        if (answers.menu==="viewRoles"){
            viewRoles()
           
        }
        if
        (answers.menu==="viewDepartments"){
            viewDepartments()
           
        }
        if (answers.menu==="viewEmployees"){
            viewEmployees()
           
        }
        if
        (answers.menu==="addRole"){
            addRole()
          
        }
        if (answers.menu==="addDepartment"){
            addDepartment()
     
        }
        if
        (answers.menu==="addEmployee"){
            addEmployee()
        
        }
        if (answers.menu==="updateEmployeeRole"){
            updateEmployeeRole()
       
        }
        if (answers.menu==="exit"){
            exit()

        }
    })
}

    function viewRoles(){
        pool.query("select * from role",(err, res)=>{
            if(err){
                throw err
            }
            console.table(res.rows)
            menu()
        })
    }
    function viewDepartments(){
        pool.query("select * from department",(err, res)=>{
            if(err){
                throw err
            }
            console.table(res.rows)
            menu()
        })
    }
    function viewEmployees(){
        pool.query("select * from employee",(err, res)=>{
            if(err){
                throw err
            }
            console.table(res.rows)
            menu()
        })
    }
    function addDepartment(){
        inquirer.prompt([
            {
                name:"department",
                message:"what is the name of the department you would like to add?",
                type:"input"
            }
        ])
        .then(answers=>{
            pool.query("insert into department (name) values ($1)",[answers.department],(err, res)=>{
                if(err){
                    throw err
                }
                console.log("department added")
                menu()
            })
        })
    }
    function addRole(){
        inquirer.prompt([
            {
                name:"title",
                message:"what is the title of the role you would like to add?",
                type:"input"
            },
            {
                name:"salary",
                message:"what is the salary of the role you would like to add?",
                type:"number"
            },
            {
                name:"department_id",
                message:"what is the department id of the role you would like to add?",
                type:"number"
            }
        ])
        .then(answers=>{
            pool.query("insert into role (title,salary,department_id) values ($1,$2,$3)",[answers.title,answers.salary,answers.department_id],(err, res)=>{
                if(err){
                    throw err
                }
                console.log("role added")
                menu()
            })
        })
    }
    function addEmployee(){
        inquirer.prompt([
            {
                name:"first_name",
                message:"what is the first name of the employee you would like to add?",
                type:"input"
            },
            {
                name:"last_name",
                message:"what is the last name of the employee you would like to add?",
                type:"input"
            },
            {
                name:"role_id",
                message:"what is the role id of the employee you would like to add?",
                type:"number"
            },
            {
                name:"manager_id",
                message:"what is the manager id of the employee you would like to add?",
                type: "input",
                default: 'null'
            }
        ])
        .then(answers=>{
            pool.query(`insert into employee (first_name, last_name, role_id, manager_id) values ('${answers.first_name}', '${answers.last_name}', ${answers.role_id}, ${answers.manager_id})`,(err, res)=>{
                if(err){
                    throw err
                }
                console.log("employee added")
                menu()
            })
        })
    }
    function updateEmployeeRole(){
        inquirer.prompt([
            {
                name:"employee_id",
                message:"what is the id of the employee you would like to update?",
                type:"number"
            },
            {
                name:"role_id",
                message:"what is the new role id of the employee you would like to update?",
                type:"number"
            }
        ])
        .then(answers=>{
            pool.query("update employee set role_id = $2 where id = $1",[answers.employee_id,answers.role_id],(err, res)=>{
                if(err){
                    throw err
                }
                console.log("employee role updated")
                menu()
            })
        })
    }
    function exit(){
        process.exit()
    }

    menu()
