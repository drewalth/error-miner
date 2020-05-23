const { Builder, By, until } = require('selenium-webdriver');

const PROVIDED_URL = process.env.URL
const PROVIDED_USERNAME = process.env.USERNAME
const PROVIDED_PASSWORD = process.env.PASSWORD

const clickElement = (element: string = 'a') => {

  function simulateClick(elem) {

    const evt = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });

    const canceled = !elem.dispatchEvent(evt);

  }

  const links = document.querySelectorAll(element)
  const randomIndex = Math.floor(Math.random() * (links.length - 1) + 1)

  simulateClick(links[randomIndex])

}

const clickRandomTarget = async (url: string, keyword: string, interval: number = 5000) => {

  let cookie;

  const driver = await new Builder().forBrowser('chrome').build();


  if (cookie) {
    driver.manage().addCookie(cookie)
  }

  await driver.get(url);

  let partnerButton = await driver.wait(until.elementLocated(By.id('partner-button')), 5000)

  partnerButton.click()

  let inputs = await driver.wait(until.elementsLocated(By.css("input")))

  await inputs[0].sendKeys('')
  await inputs[1].sendKeys('')

  await driver.wait(until.elementLocated(By.css("#submit-save"))).click()
  
  /**
   * @todo add auth token
   */
  cookie = await driver.manage().getCookies()

  setInterval(async () => {

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
        await driver.executeScript(clickElement)
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


  clickRandomTarget('', '')

})();