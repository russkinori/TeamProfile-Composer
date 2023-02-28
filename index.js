const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const Joi = require("joi");

const render = require("./src/page-template.js");

const OUTPUT_DIR = path.resolve("output");
const outputPath = path.join(OUTPUT_DIR, "team.html");



// TODO: Write Code to gather information about the development team members, and render the HTML file.

//Empty array to hold newly generated 
const employees = [];
//schema variable for validation usage
let schema = "";

//Function to generate the team manager
async function addManager() {
    console.log('Please enter the team manager\'s information:');
    let response = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Name:',
            //Validate name to alphabets
            validate: function (value) {
                schema = Joi.string().regex(/^[a-zA-Z]+$/).trim().min(3).max(30).required();
                const { error } = schema.validate(value);
                if (error) {
                    return "Please enter a name with a minimum of 3 characters using only letters.";
                }
                return true;
            },
        },
        {
            type: 'input',
            name: 'id',
            message: 'Employee ID:',
            //Validate employee id to a number 
            validate: function (value) {
                schema = Joi.number().integer().min(1).max(50).required();
                const { error } = schema.validate(value);
                if (error) {
                    return "Please enter a valid whole number between 1 and 50";
                }
                return true;
            },
        },
        {
            type: 'input',
            name: 'email',
            message: 'Email address:',
            //Validate the email address
            validate: function (value) {
                schema = Joi.string().email().required();
                const { error } = schema.validate(value);
                if (error) {
                    return "Please enter a valid email address.";
                }
                return true;
            },
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Office number:',
            //Validate office number to a number 
            validate: function (value) {
                schema = Joi.number().integer().min(1).max(10).required();
                const { error } = schema.validate(value);
                if (error) {
                    return "Please enter a valid whole number between 1 and 10";
                }
                return true;
            },
        },
    ])
    const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
    employees.push(manager);
    menu();
};

//Function to generate an engineer
async function addEngineer() {
    console.log('Please enter the engineer\'s information:');
    let response = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Name:',
            //Validate name to alphabets
            validate: function (value) {
                schema = Joi.string().regex(/^[a-zA-Z]+$/).trim().min(3).max(30).required();
                const { error } = schema.validate(value);
                if (error) {
                    return "Please enter a valid name using only letters";
                }
                return true;
            },
        },
        {
            type: 'input',
            name: 'id',
            message: 'Employee ID:',
            //Validate employee id to a number 
            validate: function (value) {
                schema = Joi.number().integer().min(1).max(50).required();
                const { error } = schema.validate(value);
                if (error) {
                    return "Please enter a whole number between 1 and 50";
                }
                return true;
            },
        },
        {
            type: 'input',
            name: 'email',
            message: 'Email address:',
            //Validate the email address
            validate: function (value) {
                schema = Joi.string().email().required();
                const { error } = schema.validate(value);
                if (error) {
                    return "Please enter a valid email.";
                }
                return true;
            },
        },
        {
            type: 'input',
            name: 'github',
            message: 'GitHub username:',
            //Validate github username to between 4 to 30 characters
            validate: function (value) {
                schema = Joi.string().trim().min(4).max(30).required();
                const { error } = schema.validate(value);
                if (error) {
                    return "Please enter a valid username containing 5 to 30 characters";
                }
                return true;
            },
        },
    ])
    const engineer = new Engineer(response.name, response.id, response.email, response.github);
    employees.push(engineer);
    menu();
};

//Function to generate and intern
async function addIntern() {
    console.log('Please enter the intern\'s information:');
    let response = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Name:',
            //Validate name to alphabets 
            validate: function (value) {
                schema = Joi.string().regex(/^[a-zA-Z]+$/).trim().min(3).max(30).required();
                const { error } = schema.validate(value);
                if (error) {
                    return "Please enter a valid name using only letters";
                }
                return true;
            },
        },
        {
            type: 'input',
            name: 'id',
            message: 'Employee ID:',
            //Validate employee id to a number 
            validate: function (value) {
                schema = Joi.number().integer().min(1).max(50).required();
                const { error } = schema.validate(value);
                if (error) {
                    return "Please enter a whole number between 1 and 50";
                }
                return true;
            },
        },
        {
            type: 'input',
            name: 'email',
            message: 'Email address:',
            //Validate the email. 
            validate: function (value) {
                schema = Joi.string().email().required();
                const { error } = schema.validate(value);
                if (error) {
                    return "Please enter a valid email.";
                }
                return true;
            },
        },
        {
            type: 'input',
            name: 'school',
            message: 'School:',
            //Validate school to between 3 to 30 characters
            validate: function (value) {
                schema = Joi.string().trim().min(3).max(30).required();
                const { error } = schema.validate(value);
                if (error) {
                    return "Please enter a valid school name";
                }
                return true;
            },
        },
    ])
    const intern = new Intern(response.name, response.id, response.email, response.school);
    employees.push(intern);
    menu();
};

//Function for team member options  
function menu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'Add an engineer',
                'Add an intern',
                'Finish building the team',
            ],
        },
    ]).then((response) => {
        switch (response.choice) {
            case 'Add an engineer':
                addEngineer();
                break;
            case 'Add an intern':
                addIntern();
                break;
            default:
                // Finish building the team
                const html = render(employees);
                fs.writeFile(outputPath, html, err => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('HTML file generated successfully!');
                    }
                });
                break;
        }
    });
};

addManager();
