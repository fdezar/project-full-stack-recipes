// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db/index.js");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
/* const helpers = require('handlebars-helpers')(); */

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config/index.js")(app);

const capitalize = require("./utils/capitalize.js");
const projectName = "project-full-stack-recipes";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

app.use(function (req, res, next) {
  if (req.session.currentUser) {
    res.locals.user = req.session.currentUser;
  }
  next();
});

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes.js");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes.js");
app.use("/auth", authRoutes);

const recipesRoutes = require("./routes/recipes.routes.js");
app.use("/recipes", recipesRoutes);

const commentRoutes = require("./routes/comment.routes.js");
app.use("/recipes", commentRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling/index.js")(app);

module.exports = app;
