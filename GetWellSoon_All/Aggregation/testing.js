const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const app = express();
const mysql = require("mysql");
const rp = require("request-promise");
const $ = require("cheerio");

const con = mysql.createPool({
    host: "aa1cdzel25mr0ii.copyyfwxhyqv.us-east-1.rds.amazonaws.com",
    user: "root",
    password: "getwellsoon123",
    database: "ebdb"
});


const url = "https://clinicaltrials.gov/ct2/results";

rp(url)
  .then(function(html) {
    let $ = cheerio.load(html);
    let linkArray = [];
    let element;
    let j = 0;
    let json = {linkArray: ""}

    if (!error) {
        $("#theDataTable").filter(function () {

            let data = $(this);

            while (j < 100) {

                element = data.children().children().eq(j).children().eq(3).children();
                linkArray.push("https://clinicaltrials.gov" + element.attr("href"));
                j++;

            }

            json.linkArray = linkArray;

        });
        res.send(linkArray);
    }
  })
  .catch(function(err) {
    throw err;
  });

module.exports = urlParse;