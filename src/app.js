const { Builder } = require('selenium-webdriver');

const clickRandomTarget = async (url: string, keyword: string, interval: number = 5000) => {

  let driver = await new Builder().forBrowser('chrome').build();

  function clickRandom(url: string, element: string = 'a') {

    function simulateClick(target) {

      const event = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });

      const canceled = !target.dispatchEvent(event);

    }

    const links = document.querySelectorAll(element)
    const randomIndex = Math.floor(Math.random() * (links.length - 1) + 1)
    simulateClick(links[randomIndex])

  }

  setInterval(async () => {

    await driver.get(url);

    let currentUrl
    let currentTitle
    try {
      currentUrl = await driver.getCurrentUrl()
      currentTitle = await driver.getTitle()
    } catch (error) {
      console.log('error :', error);
    }

    try {
      if (currentUrl && currentUrl.includes(keyword)) {
        await driver.executeScript(clickRandom)
      } else {
        await driver.get(url);
      }
    } catch (err) {
      console.log('err :', err);
    }

  }, interval);
}

const openPages = async (pages: Array<string>, interval: number = 3000) => {

  let driver = await new Builder().forBrowser('chrome').build();
  let i = 0

  if (i < pages.length) {

    setInterval(async () => {

      await driver.get(pages[i]);

      i++

    }, interval);
  }

}

(async function errorMine() {


  clickRandomTarget('http://bain.localdev:8080/', 'bain')

})();