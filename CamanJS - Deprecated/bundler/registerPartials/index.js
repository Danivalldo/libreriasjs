const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");

const registerPartials = () => {
  const partialsDir = path.resolve(__dirname, "../../src/partials");
  const filenames = fs.readdirSync(partialsDir);
  filenames.forEach(function (filename) {
    const matches = /^([^.]+).hbs$/.exec(filename);
    if (!matches) {
      return;
    }
    const name = matches[1];
    const template = fs.readFileSync(partialsDir + "/" + filename, "utf8");
    Handlebars.registerPartial(name, template);
  });
};

module.exports = registerPartials;
