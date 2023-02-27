import Manager from './lib/Manager.js';
import Engineer from './lib/Engineer.js';
import Intern from './lib/Intern.js';
import render from './src/page-template.js';
import inquirer from 'inquirer';
import Joi from "joi";
import path from "path";
import fs from "fs";

const OUTPUT_DIR = path.resolve("output");
const outputPath = path.join(OUTPUT_DIR, "team.html");



// TODO: Write Code to gather information about the development team members, and render the HTML file.

const employees = [];
let schema = "";

function addManager() {
    console.log('Please enter the team manager\'s information:');
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Name:',
            validate: function (value) {
                schema = Joi.string().trim().min(3).max(30).required();
                const { error } = schema.validate(value);
                if (error) {
                    return "Please enter a valid name.";
                }
                return true;
            },
        },
        {
            type: 'input',
            name: 'id',
            message: 'Employee ID:',
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
            validate: function (value) {
                schema = Joi.number().integer().min(1).max(10).required();
                const { error } = schema.validate(value);
                if (error) {
                    return "Please enter a valid whole number between 1 and 10";
                }
                return true;
            },
        },
    ]).then((response) => {
        const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
        employees.push(manager);
        menu();
    });
};

function addEngineer() {
    console.log('Please enter the engineer\'s information:');
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Name:',
            validate: function (value) {
                schema = Joi.string().trim().min(3).max(30).required();
                const { error } = schema.validate(value);
                if (error) {
                    return "Please enter a valid name";
                }
                return true;
            },
        },
        {
            type: 'input',
            name: 'id',
            message: 'Employee ID:',
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
            validate: function (value) {
                schema = Joi.string().trim().min(4).max(30).required();
                const { error } = schema.validate(value);
                if (error) {
                    return "Please enter a valid username containing 5 to 30 characters";
                }
                return true;
            },
        },
    ]).then((response) => {
        const engineer = new Engineer(response.name, response.id, response.email, response.github);
        employees.push(engineer);
        menu();
    });
};

function addIntern() {
    console.log('Please enter the intern\'s information:');
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Name:',
            validate: function (value) {
                schema = Joi.string().trim().min(3).max(30).required();
                const { error } = schema.validate(value);
                if (error) {
                    return "Please enter a valid name";
                }
                return true;
            },
        },
        {
            type: 'input',
            name: 'id',
            message: 'Employee ID:',
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
            validate: function (value) {
                schema = Joi.string().trim().min(3).max(30).required();
                const { error } = schema.validate(value);
                if (error) {
                    return "Please enter a valid school name";
                }
                return true;
            },
        },
    ]).then((response) => {
        const intern = new Intern(response.name, response.id, response.email, response.school);
        employees.push(intern);
        menu();
    });
};

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
