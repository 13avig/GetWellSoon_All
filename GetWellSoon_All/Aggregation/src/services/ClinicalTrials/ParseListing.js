const PuppeteerHelper = require('../../helpers/PuppeteerHelper');
const { backendAPI } = require('../../utils/api');

class ParseListing extends PuppeteerHelper {
  constructor(props) {
    super(props);
  }

  async execute() {
    const page = await this.getNewPage();
    await page.goto('https://clinicaltrials.gov/ct2/results', { timeout: 60000 });
    await page.waitForSelector('#theDataTable tbody');

    try {
      while (true) {
        let urls = await page.$$eval('#theDataTable tbody tr[role=row] td a[href]', (elems) => elems.map(el => el.href));
        
        try {
          await backendAPI.post({ url: '/trials/add/1', data: { trialUrl: urls } });
        } catch (e) {
          // TODO:: send an alert in future
        }
        
        const nextButton = await page.$('#theDataTable_next');
        const isDisabled = await page.evaluate(el => el.className && el.className.includes('disabled'), nextButton);

        // if next page is disabled then break this loop
        if (isDisabled) {
          break;
        }

        await nextButton.click();

        // to wait till listing completely loaded 
        let opacity = 0.2;
        let attempt = 0;
        do {
          attempt += 1;
          await page.waitFor(3000); // default wait after the next click
          opacity = await page.evaluate(el => getComputedStyle(el).opacity, await page.$('#theDataTable'));
        } while(opacity != 1 || attempt < 5);
      }
    }
    catch (e) {
      await page.close();
      console.log(e);
      throw e;
    }

    await page.close();
  }
}

module.exports = ParseListing;
