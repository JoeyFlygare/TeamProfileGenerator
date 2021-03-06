const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];

init();


function init() {
  createManager();

  function createManager() {
    inquirer.prompt(
      [
        {
          type: 'input',
          message: 'What is your managers name?',
          name: 'name'
        },
        {
          type: 'input',
          message: 'What is their employee id?',
          name: 'id'
        },
        {
          type: 'input',
          message: 'What is their office number?',
          name: 'officeNumber'
        },
        {
          type: 'input',
          message: 'What is the email for your manager?',
          name: 'email'
        }
      ]
    ).then(answer => {
      const manager = new Manager(answer.name, answer.id, answer.email, answer.officeNumber);
      teamMembers.push(manager);
      createTeam();
    })
  }

  function createTeam() {
    inquirer.prompt([
      {
        type: 'list',
        message: 'What type of employee would you like to add?',
        choices: ['Engineer', 'Intern', 'None'],
        name: 'employChoices'
      }
    ]).then(answers => {
      switch (answers.employChoices) {
        case 'Engineer':
          addEngineer();
          break;
        case 'Intern':
          addIntern();
          break;
        case 'None':
          buildTeam();
      }
    })
  }

  function addEngineer() {
    inquirer.prompt(
      [
        {
          type: 'input',
          message: 'What is your engineers name?',
          name: 'name'
        },
        {
          type: 'input',
          message: 'What is your employee id?',
          name: 'id'
        },
        {
          type: 'input',
          message: 'What is the email for your new engineer?',
          name: 'email'
        },
        {
          type: 'input',
          message: 'What is your engineers github profile?',
          name: 'github'
        }
      ]).then(answer => {
        const engineer = new Engineer(answer.name, answer.id, answer.email, answer.github);
        teamMembers.push(engineer);
        createTeam();
      })
  }

  function addIntern() {
    inquirer.prompt(
      [
        {
          type: 'input',
          message: 'What is your interns name?',
          name: 'name'
        },
        {
          type: 'input',
          message: 'What is your employee id?',
          name: 'id'
        },
        {
          type: 'input',
          message: 'What is the email for your new intern?',
          name: 'email'
        },
        {
          type: 'input',
          message: 'What school does you intern attend?',
          name: 'school'
        }
      ]).then(answer => {
        const intern = new Intern(answer.name, answer.id, answer.email, answer.school);
        teamMembers.push(intern);
        createTeam();
      })
  }

  buildTeam = () => {
    let html = render(teamMembers);
    fs.writeFile(outputPath, html, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Team HTML page has been created')
      }
    })
  }

}
