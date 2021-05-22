const puppeteer = require('puppeteer');

class PuppeteerHelper {
  constructor(props) {
    this.browser = null;
  }

  async getBrowserInstance(isHeadless, timeout) {
    if (!this.browser) {
      this.browser = await puppeteer.launch({ headless: isHeadless, timeout });
    }
    return this.browser; 
  }

  async getNewPage(isHeadless=true, timeout=6000) {
    await this.getBrowserInstance(isHeadless, timeout);
    const page = await this.browser.newPage();
    page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"); // TODO::need to fetch this randomly
    return page;
  }
}


module.exports = PuppeteerHelper;
