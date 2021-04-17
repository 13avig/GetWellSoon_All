const express = require('express');
const app = express();
const puppeteer = require("puppeteer");
let browser;


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
    await page.goto("https://clinicaltrials.gov/ct2/results", { timeout: 60000 });
    await page.waitForSelector('#theDataTable tbody');
    try {
        let counter = 2;
        while (true) {
            data = [];
            let reviewsElems = await page.$$('#theDataTable .odd td:nth-child(4),#theDataTable .even td:nth-child(4)');
            await extractTrials(reviewsElems, data);
            let nextPageLink = await page.$('#theDataTable_next span');
/*
            query = `INSERT INTO urls (url_id, url_name) VALUES (?, ?);`
            for (i = 0; i < data.length; i++) {
                con.query(query, [(counter - 2) * 10 + i + 1, data[i].link], function (err, res) {
                    if (err) throw err;

                })
            }
            con.commit;
            console.log("The database has been updated.");
            */

            if (counter > 31500) {
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
        obj.link = await trial.$eval('a', a => a.href);
        data.push(obj);
    }
}

async function execute() {
    try {
        await launchBrowserInstance();
        await getNewPage();
        await getAllTrials();
        return res.send({code: "success"});
    } catch (e) {
        return res.send({code: "failed, try again"});
    }

}

exports = module.exports = app;