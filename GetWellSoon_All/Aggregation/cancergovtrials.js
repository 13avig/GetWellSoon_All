const express = require("express");
const app = express();
const mysql = require("mysql");
const puppeteer = require("puppeteer");
let browser;

var con = mysql.createConnection({
    host: "aa1cdzel25mr0ii.copyyfwxhyqv.us-east-1.rds.amazonaws.com",
    user: "root",
    password: "getwellsoon123",
    database: "ebdb"
});

async function launchBrowserInstance() {
    if (!browser) {
        browser = await puppeteer.launch({ headless: true, timeout: 60000 });
    }
    return browser;
}

async function getNewPage() {
    await launchBrowserInstance();
    let page = await browser.newPage();
    page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36");
    return page;
}

async function getAllTrials() {
    let data = [];
    let page = await getNewPage();
    await page.goto("https://www.cancer.gov/about-cancer/treatment/clinical-trials/search/r?q=&t=&a=&z=&rl=1", { timeout: 60000 });
    await page.waitForSelector("#theDataTable tbody");
    try {
        let counter = 2;
        let links = 0;
        while (true && links < 10) {
            data = [];
            let reviewsElems = await page.$$("#theDataTable .odd td:nth-child(4), #theDataTable .even td:nth-child(4)");
            await extractTrials(reviewsElems, data);
            let nextPageLink = await page.$("#theDataTable_next span");

            query = `INSERT INTO urls (url_id, url_name) VALUES (?, ?);`
            for (i = 0; i < data.length; i++) {
                con.query(query, [(counter - 2) * 10 + i + 1, data[i].link], function (err, res) {
                    if (err) throw err;

                })
            }
            con.commit;
            console.log("The database has been updated.");

            if (counter > 10    ) {
                break;
            }
            counter++;
            console.log(counter);
            await nextPageLink.click();
            await page.waitFor(1000);
        }

        con.release;

        await page.close();
    }
    catch (e) {
        console.log(e);
    }
    return data;
}

async function extractTrials(trialList, data) {
    for (const trial of trialList) {
        let obj = {};
        obj.link = await trial.$eval("a", a => a.href);
        data.push(obj);
    }
}

app.post("/cancergovurls", function (req, res) {

    getAllTrials();
});

app.listen(8080);

console.log("Started on port 8080");

exports = module.exports = app;