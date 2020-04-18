const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const port = 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  const params = { title: "Weather", name: "Gyanendra" };
  res.render("index", params);
});

app.get("/about", (req, res) => {
  const params = { title: "About Me", name: "Gyanendra" };
  res.render("about", params);
});
app.get("/help", (req, res) => {
  const params = { title: "Help", name: "Gyanendra", msg: "helping you out" };
  res.render("help", params);
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastdata) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastdata,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  const params = {
    title: "404",
    name: "Gyanendra",
    errorMessage: "Help article not found.",
  };
  res.render("404", params);
});
app.get("*", (req, res) => {
  const params = {
    title: "404",
    name: "Gyanendra",
    errorMessage: "Page not found.",
  };
  res.render("404", params);
});

app.listen(port, () => {
  console.log(`Successfully running on port ${port}.`);
});
