const PuppeteerHelper = require('../../helpers/PuppeteerHelper');

class ParseListing extends PuppeteerHelper {
  constructor(props) {
    super();
  }

  async execute() {
    const page = await this.getNewPage();
    await page.goto('https://www.cancer.gov/about-cancer/treatment/clinical-trials/search/r?loc=0&rl=1', { timeout: 60000 });

    try {
      do {
        // to wait content get loaded completely
        await page.waitForSelector('.loader__pageheader', { hidden: true });
        let data = await page.$$eval('.results-page__list .results-list-item .results-list-item__title a[href]', (elems) => elems.map(el => el.href));
        // TODO::send API request

        // check presence of the Next button 
        const nextButton = await page.$x('(//div[@class="pager__arrow"][contains(., "Next >")])');
        if (!nextButton.length) break;

        await nextButton[0].click({ delay: 3000 });
      } while(true);
      await page.close();
    } catch (e) {
      console.log(e);
      await page.close();
      throw e;
    }
  }
}

module.exports = ParseListing;