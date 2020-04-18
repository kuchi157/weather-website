const request = require("request");
const key = "e83d71d0eada4141a88cb5aaaf33e494";
const forecast = (latitude, longitude, callback) => {
  const url = `https://api.weatherbit.io/v2.0/current?&lat=${latitude}&lon=${longitude}&key=${key}`;
  request({ url, json: true }, (error, { body } = response) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (body.error) {
      callback("Unable to find location.", undefined);
    } else {
      callback(
        undefined,
        `${body.data[0].weather.description}. It is currently ${body.data[0].temp} degree Celsius out. There is a ${body.data[0].precip}% chance of rain`
      );
    }
  });
};

module.exports = forecast;
