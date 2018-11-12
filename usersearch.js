//   * Create a `UserSearch` constructor. It should accept a user's name and location as arguments, and store the value of `Date.now()` in a `date` property. We will format the timestamp when we display it.

//   * Objects returned by the `UserSearch` constructor should also have a `getWeather` method, which should log or return the weather in the user's location.

//   * Test your UserSearch constructor by feeding it dummy data for now.

const weather = require("weather-js");
const moment = require("moment");
let date = moment().format("MMMM Do YYYY, h:mm:ss a");

let UserSearch = function(name, city) {
  this.name = name;
  this.city = city;
  //this.usersLog = [];
  this.date = date;

  this.forecast = function() {
    weather.find({ search: city, degreeType: "F" }, function(err, result) {
      if (err) console.log(err);

      console.log(
        `\n${result[0].location.name} \nTemperature: ${
          result[1].current.temperature
        } degrees fahrenheit \n${date}`
      );
      
    }); 
  };
};

module.exports = UserSearch;
