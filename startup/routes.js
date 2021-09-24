const servers = require("../routes/servers");
const server = require("../routes/server");
const notfound = require("../routes/notfound");
const express = require("express");
const helmet = require("helmet");
const handlebars = require("express-handlebars");

module.exports = (app) => {
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(express.static("public"));
  app.set("view engine", "hbs");
  app.engine(
    "hbs",
    handlebars({
      layoutsDir: process.cwd() + "/views/layouts",
      extname: "hbs",
      helpers: {
        // Ref: https://stackoverflow.com/a/34252942
        ifNotEquals: (arg1, arg2, options) => {
          return arg1 !== arg2 ? options.fn(this) : options.inverse(this);
        },
      },
    })
  );

  app.use("/api/server", server); // Returns JSON
  app.use("/", servers); // Returns HTML
  app.use("/", notfound);
};
