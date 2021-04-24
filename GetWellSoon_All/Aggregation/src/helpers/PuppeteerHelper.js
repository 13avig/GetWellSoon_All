const puppeteer = require('puppeteer');

class PuppeteerHelper {
  constructor(props) {
    this.browser = null;
  }

  async getBrowserInstance() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({ headless: true, timeout: 60000 });
    }
    return this.browser; 
  }

  async getNewPage() {
    await this.getBrowserInstance();
    const page = await this.browser.newPage();
    page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"); // TODO::need to fetch this randomly
    return page;
  }
}


module.exports = PuppeteerHelper;
