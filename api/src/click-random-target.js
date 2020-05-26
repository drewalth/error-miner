const { Builder, By, until } = require('selenium-webdriver');

/**
 * 
 * @param {string} element 
 */
const clickElement = () => {
  /**
   * custom event to simulate user click
   * 
   * @param {*} elem target element to click
   */
  function simulateClick(elem) {
    const evt = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    const canceled = !elem.dispatchEvent(evt);
  }

  /**
   * click targets, either a <a> or <button> tag
   * @todo increase supported tags then add logic
   * which handles cases where none of the selected tags 
   * are found in the document
   */
  const targets = ['a','button']
  const element = targets[Math.round(Math.random())]

  /**
   * find all targets in document then pass a random
   * target to click
   */
  const links = document.querySelectorAll(element)
  const randomIndex = Math.floor(Math.random() * (links.length - 1) + 1)

  simulateClick(links[randomIndex])

}

/**
 * 
 * @param {string} url the url to be tested
 * @param {string} keywords list of keywords found in meta title or url to direct driver
 * @param {string} username login credentials
 * @param {string} password login credentials
 * @param {number} interval time between running crawl and click function
 */
const clickRandomTarget = async (url = '', keywords = '', username = '', password = '', interval = 5000) => {

  /**
   * split keyword list into array to check 
   * current page url and/or title.
   */
  const keywordsArr = keywords.split(',')

  /**
   * store the auth token for other browser instances
   * if the cookie is true, add to browser instance to 
   * avoid having to login every time.
   */
  let cookie;

  /**
   * create the browser instance
   * @todo turn into an array with a foreach to run crawl and click
   * in different browsers 
   * 
   * ie, const browsers = ['chrome','firefox','webkit']
   */
  const driver = await new Builder().forBrowser('chrome').build();

  /**
   * add cookie if available
   */
  if (cookie) {
    driver.manage().addCookie(cookie)
  }

  /**
   * load the provided url from the http request
   */
  await driver.get(url);

  /**
   * @note Monigle specific
   * 
   * To log into the app, first, need to click the partner button 
   * to reveal form.
   * 
   */
  let partnerButton = await driver.wait(until.elementLocated(By.id('partner-button')), 5000)

  partnerButton.click()

  let inputs = await driver.wait(until.elementsLocated(By.css("input")))

  await inputs[0].sendKeys(username)
  await inputs[1].sendKeys(password)

  await driver.wait(until.elementLocated(By.css("#submit-save"))).click()

  await driver.wait(until.elementLocated(By.css('#primary-logo')))
  
  /**
   * once logged in, store the cookie for following browser instances
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

      if (currentTitle && keywordsArr.indexOf(currentTitle) > -1) {
        await driver.executeScript(clickElement)
      } else {
        await driver.get(url);
      }
    } catch (err) {
      console.log('err :', err);
    }

  }, interval);
}

module.exports = clickRandomTarget