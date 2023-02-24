const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const render = require('./lib/htmlRenderer');

const employees = [];

function addManager() {
    console.log('Please enter the team manager\'s information:');
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Name:',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Employee ID:',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Email address:',
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Office number:',
        },
    ]).then((response) => {
        const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
        employees.push(manager);
        menu();
    });
}

function addEngineer() {
    console.log('Please enter the engineer\'s information:');
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Name:',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Employee ID:',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Email address:',
        },
        {
            type: 'input',
            name: 'github',
            message: 'GitHub username:',
        },
    ]).then((response) => {
        const engineer = new Engineer(response.name, response.id, response.email, response.github);
        employees.push(engineer);
        menu();
    });
}

function addIntern() {
    console.log('Please enter the intern\'s information:');
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Name:',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Employee ID:',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Email address:',
        },
        {
            type: 'input',
            name: 'school',
            message: 'School:',
        },
    ]).then((response) => {
        const intern = new Intern(response.name, response.id, response.email, response.school);
        employees.push(intern);
        menu();
    });
}
