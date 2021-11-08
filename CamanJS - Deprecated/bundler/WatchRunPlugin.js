const path = require("path");
var fs = require("fs");

class WatchRunPlugin {
  constructor() {
    this.lastViewEdited = path.resolve(__dirname, "../src/index.hbs");
  }
  apply(compiler) {
    compiler.hooks.watchRun.tap("WatchRun", (comp) => {
      try {
        if (comp.modifiedFiles) {
          const changedFiles = Array.from(
            comp.modifiedFiles,
            (file) => `${file}`
          ).join("");
          if (changedFiles === path.resolve(__dirname, "../src/partials")) {
            console.log("===============================");
            console.log("FILES CHANGED:", changedFiles);
            console.log("===============================");
            fs.readFile(this.lastViewEdited, (err, buf) => {
              fs.writeFile(this.lastViewEdited, buf.toString(), (err) => {
                if (err) console.log(err);
                console.log("Successfully Written to File.");
              });
            });
          } else {
            if (path.extname(changedFiles) === ".hbs") {
              this.lastViewEdited = changedFiles;
            }
          }
        }
      } catch (err) {
        console.log("ERRR:", err);
      }
    });
  }
}

module.exports = WatchRunPlugin;
