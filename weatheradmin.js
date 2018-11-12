const searchLog = require('./cli');

let WeatherAdmin = function(name, pass) {
    
  this.name = name;
  this.pass = pass;
  
  this.checkLog = function() {
    for (let i = 0; i < searchLog.length; i++) {
      console.log(`\n${searchLog[i].name}\n`);
      console.log(`\n${searchLog[i].date}\n`);
    }
  };
  this.checkCredentials = function() {
    console.log(
      `Your username is: ${this.name} \nYour password is: ${this.pass}`
    );
  };
};

module.exports = WeatherAdmin;
 