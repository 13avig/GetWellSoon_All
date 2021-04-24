const PuppeteerHelper = require('../../helpers/PuppeteerHelper');

class ParseListing extends PuppeteerHelper {
  constructor(props) {
    super(props);
  }

  async extractTrials(trialList, data) {
  for (const trial of trialList) {
      let obj = {};
      obj.link = await trial.$eval('a', a => a.href);
      data.push(obj);
  }
}
  
  async execute() {
    let data = [];
    const page = await this.getNewPage();
    await page.goto('https://clinicaltrials.gov/ct2/results', { timeout: 60000 });
    await page.waitForSelector('#theDataTable tbody');

    try {
      let counter = 2;
      while (true) {
        data = [];
        let reviewsElems = await page.$$('#theDataTable .odd td:nth-child(4),#theDataTable .even td:nth-child(4)');
        await this.extractTrials(reviewsElems, data);
        let nextPageLink = await page.$('#theDataTable_next span');

        if (counter > 31500) {
          break;
        }

        counter++;
        await nextPageLink.click();
        await page.waitFor(1000);
      }

      await page.close();
      return data;
    }
    catch (e) {
      console.log(e);
      await page.close();
      throw e;
    }
  }
}

module.exports = ParseListing;
