"use strict";
var sass = require("node-sass");
var fs = require("fs");

console.log("Node Sass is watching for changes...");
fs.watch("assets/scss/style.scss", (event, filename) => {
     if (event === "change") {
         sass.render(
             {
                 file: "assets/scss/style.scss",
                 outputStyle: "expanded",
                 sourceComments: true
             },
             (error, scssData) => {
                 if (!error) {
                     // If there are no errors reading the data
                     fs.writeFile("assets/css/style.css", scssData.css, (err) => {
                         if (!error) {
                             // Print a message to the console so we know everything worked
                             console.log("Compiled!");
                         } else {
                             // Print an error message to the console
                             console.log("There was an error writing to the css file");
                         }
                     })
                 } else {
                     // Print an error message to the console
                     console.log("There was an error reading the Sass data");
                 }
             }
         );
     }
});
