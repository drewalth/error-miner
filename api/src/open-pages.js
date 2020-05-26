const { Builder } = require('selenium-webdriver');

const openPages = async (pages, interval = 3000) => {

  let driver = await new Builder().forBrowser('chrome').build();
  let i = 0

  if (i < pages.length) {

    setInterval(async () => {

      await driver.get(pages[i]);

      i++

    }, interval);
  }

}

module.exports = openPages