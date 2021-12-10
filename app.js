const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
// Arrays to push all employees to after they have been prompted by the user
const employeesArray = [];
const idArray = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

function teamQuestions() {
  function createManager() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'managerName',
        message: 'What is the manager name?'
      },
      {
        type: 'input',
        name: 'managerId',
        message: 'What is the manager ID?'
      },
      {
        type: 'input',
        name: 'managerEmail',
        message: 'What is the manager email?'
      },
      {
        type: 'input',
        name: 'managerOfficeNumber',
        message: 'What is the manager office number?'
      }
    ])
    .then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      employeesArray.push(manager)
      console.log(employeesArray)
      otherMembers();
    })
  }

  function otherMembers() {
    inquirer.prompt([
      {
        type: 'list',
        name: 'teamChoice',
        message: 'Which type of team member would you like to add?',
        choices: [
          'Engineer',
          'Intern',
          'Done'
        ]
      }
    ]).then(userSelect => {
      switch(userSelect.teamChoice) {
        case 'Engineer':
          addEngineer();
          break;
        case 'Intern':
          addIntern();
          break;
        default:
          buildHtml();
      }
    });
  }

  function addEngineer() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'engineerName',
        message: 'What is the engineer name?'
      },
      {
        type: 'input',
        name: 'engineerId',
        message: 'What is the engineer ID?'
      },
      {
        type: 'input',
        name: 'engineerEmail',
        message: 'What is the engineer email?'
      },
      {
        type: 'input',
        name: 'engineerGithub',
        message: 'What is the engineer GitHub?'
      }
    ])
      .then(answers => {
        const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
        employeesArray.push(engineer)
        console.log(employeesArray)
        otherMembers();
      })
  }

  // write function to add Intern
  function addIntern() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'internName',
        message: 'What is the intern name?'
      },
      {
        type: 'input',
        name: 'internId',
        message: 'What is the intern ID?'
      },
      {
        type: 'input',
        name: 'internEmail',
        message: 'What is the intern email?'
      },
      {
        type: 'input',
        name: 'internGithub',
        message: 'What is the intern GitHub?'
      }
    ])
      .then(answers => {
        const engineer = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internGithub);
        employeesArray.push(intern)
        console.log(employeesArray)
        otherMembers();
      })
  }

  // Write Function to Build HTML File


  createManager();
}

teamQuestions();
