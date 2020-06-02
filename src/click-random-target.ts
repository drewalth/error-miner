const { Builder, By, until } = require("selenium-webdriver");
import userLogin = require("./user-login");
import chalk = require("chalk");
/**
 *
 * @param {string} element
 */
const clickElement = (): void => {
  /**
   * custom event to simulate user click
   *
   * @param {*} elem target element to click
   */

  interface SimulateClick {
    dispatchEvent: (event: Event) => boolean;
  }

  function simulateClick(elem: SimulateClick): void {
    /* eslint-disable-next-line no-undef */
    const evt = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    /* eslint-disable-next-line no-unused-vars */
    const canceled = !elem.dispatchEvent(evt);
  }

  /**
   * click targets, either a <a> or <button> tag
   */
  const targets = ["a", "button"];
  const element = targets[Math.round(Math.random())];

  /**
   * find all targets in document then pass a random
   * target to click
   */
  const links = document.querySelectorAll(element);
  const randomIndex = Math.floor(Math.random() * (links.length - 1) + 1);

  simulateClick(links[randomIndex]);
};

interface Options {
  url: string;
  username: string;
  password: string;
  client: string;
  browsers: string[];
  loopLimit: number;
  interval: number;
}

/**
 *
 * @param {object} options user provided options defaults set in app.js
 */
const clickRandomTarget = (options: Options): void => {
  options.browsers.forEach(async (browser: string) => {
    const driver = await new Builder().forBrowser(browser).build();

    console.log(chalk.white(`${browser} started.`));

    await driver.get(options.url);

    await userLogin(driver, options.username, options.password);

    let numberOfLoops = 0;
    if (numberOfLoops === options.loopLimit) {
      driver.quit();
      return;
    }

    setInterval(async () => {
      await driver.wait(until.elementLocated(By.css("body")));

      const currentUrl = await driver.getCurrentUrl();
      console.log(chalk.white(`${browser}: ${currentUrl}`));

      /**
       * check to see if the crawler logged itself out,
       * if so, log back in!
       */
      try {
        const authLayout = await driver.findElement(By.css("#login"));
        if (authLayout)
          await userLogin(driver, options.username, options.password);
      } catch {
        console.log(chalk.green("|"));
      }

      /**
       * check to see if clicked an external link
       * if so, reload provided url
       */
      try {
        if (currentUrl.includes(options.client)) {
          await driver.executeScript(clickElement);
        } else {
          await driver.get(options.url);
        }
      } catch {
        console.log(chalk.red("Failed to execute script."));
      }

      numberOfLoops++;
    }, options.interval);
  });
};

export = clickRandomTarget;
