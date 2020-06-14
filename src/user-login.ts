const { By, until } = require('selenium-webdriver')

/**
 * 
 * User Login
 * 
 * Incase the crawler logs itself out, use this to log back in!
 * 
 * @param driver selenium web driver instance
 * @param username of test user
 * @param password of test user
 */

const userLoginAction = async (driver, username: string, password: string) => {
  
  const loginTrigger = await driver.wait(until.elementLocated(By.id('#LOGIN-FORM-TRIGGER')), 5000)

  loginTrigger.click()

  const inputs = await driver.wait(until.elementsLocated(By.css('input')))

  await inputs[0].sendKeys(username) // fill username
  await inputs[1].sendKeys(password) // fill password

  await driver.wait(until.elementLocated(By.css('#SUBMIT-SAVE'))).click()

  await driver.wait(until.elementLocated(By.css('#ELEMENT-BEHIND-AUTH')))
}

export = userLoginAction;
