const weather = require("weather-js");
const moment = require("moment");
const inquirer = require("inquirer");
const UserSearch = require("./usersearch");
const WeatherAdmin = require("./weatheradmin");
const searchLog = [];
const requireLetterAndNumber = value => {
  if (/\w/.test(value) && /\d/.test(value)) {
    return true;
  }
  return "Password need to have at least a letter and a number";
};
let date = moment().format("MMMM Do YYYY, h:mm:ss a");
let loggedIn;

function logIn() {
  inquirer
    .prompt([
      {
        name: "divert",
        message: "Please select your option from the following menu.",
        type: "rawlist",
        choices: ["Admin View", "User View"]
      }
    ])
    .then(function(answers) {
      if (answers.divert === "Admin View") {
        adminView();
      } else if (answers.divert === "User View") {
        newSearch();
      }
    });
}

function adminView() {
  let fromAdmin = true;
  loggedIn = true;
  inquirer
    .prompt([
      {
        name: "createUsername",
        message: "Please create a username."
      },
      {
        name: "createPass",
        message: "Please create a password",
        type: "password",
        validate: requireLetterAndNumber,
        mask: "*"
      }
    ])
    .then(function(answer) {
      let newAdmin = new WeatherAdmin(answer.createUsername, answer.createPass);

      newAdmin.checkCredentials();

     
      for (let i = 0; i < searchLog.length; i++) {
        console.log(`User: ${searchLog[i].name} \nDate Searched: ${searchLog[i].date} \nLocation: ${searchLog[i].city}`);
      }
      setTimeout(() => {
        redirectAdmin(fromAdmin);
      }, 2000);
    });
}

function newSearch() {
  let fromUser = true;
  inquirer
    .prompt([
      {
        name: "name",
        message: "Please enter your name."
      },
      {
        name: "location",
        message:
          "Please enter the the name of the city you would like weather info for. "
      }
    ])
    .then(function(answers) {
      let newSearch = new UserSearch(answers.name, answers.location);
      newSearch.forecast();
      searchLog.push(new UserSearch(answers.name, answers.location, date));
     

      setTimeout(() => {
        redirectUser(fromUser);
      }, 2000);
    });
}

function redirectUser(fromUser, fromAdmin, loggedIn) {
  // if (fromUser === true) {
  inquirer
    .prompt([
      {
        name: "confirm",
        message: "Would you like to lookup another city?",
        type: "confirm"
      }
    ])
    .then(function(answer) {
      if (answer.confirm === true) {
        console.log(searchLog);
        newSearch();
      } else {
        console.log(`Bye`);
        fromUser = false;
        logIn();
      }
    });
  
}

function redirectAdmin() {
  inquirer
    .prompt([
      {
        name: "confirm",
        message: "Return to main menu?",
        type: "confirm"
      }
    ])
    .then(function(answer) {
      if (answer.confirm === true) {
        // fromAdmin = false;
        logIn();
      } else {
        console.log("Goodbye!");
      }
    });
}


logIn();
module.exports = searchLog;
