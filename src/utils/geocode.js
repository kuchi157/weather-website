const request = require("request");
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiMTU3a3VjaGkiLCJhIjoiY2s4c2praXFyMDBkeTNkbXJzajhzODQ4ZCJ9.m8NUE5AqOaJ0C70TDTDpkQ&limit=1`;

  request({ url, json: true }, (error, { body } = response) => {
    if (error) {
      callback("unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
