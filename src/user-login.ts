const { By, until } = require('selenium-webdriver')
const userLoginAction = async (driver:object, username:string, password:string) => {
  let loggedIn
  const partnerButton = await driver.wait(until.elementLocated(By.id('partner-button')), 5000)

  partnerButton.click()

  const inputs = await driver.wait(until.elementsLocated(By.css('input')))

  if (!loggedIn) {
    /**
     * @note .sendKeys() appends the input value.
     * At this time, our login forms do not clear
     * after successful submission. If previously
     * logged in, just click login button.
     *
     */
    await inputs[0].sendKeys(username)
    await inputs[1].sendKeys(password)
    loggedIn = true
  }

  await driver.wait(until.elementLocated(By.css('#submit-save'))).click()

  await driver.wait(until.elementLocated(By.css('#primary-logo')))
}

module.exports = userLoginAction;
