const PuppeteerHelper = require('../../helpers/PuppeteerHelper');

class ParseListing extends PuppeteerHelper {
  constructor(props) {
    super(props);
  }
  
  async execute() {
    let data = [];
    const page = await this.getNewPage();
    await page.goto("https://clinicaltrials.gov/ct2/results", { timeout: 60000 });
    // TODO:: [A] need to add the remaining logic
    await page.close();
    return data;
  }
}

module.exports = ParseListing;
