const { Builder } = require('selenium-webdriver');

/**
 * @todo refactor and cleanup
 * 
 */

const clickRandomLink = () => {

  const simulateClick = elem => {
  
    var evt = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
  
    var canceled = !elem.dispatchEvent(evt);

  }
  const links = document.querySelectorAll('a')
  const randomIndex = Math.floor(Math.random() * (links.length - 1) + 1)
  simulateClick(links[randomIndex])

}

const clickRandomTarget = elem => {
  setInterval(async () => {
    const keyword = 'beta'
    let riverId = 0
    let testUrl = `https://beta.americanwhitewater.org/content/River/detail/id/${riverId}/`
    await driver.get(testUrl);

    let currentUrl
    let currentTitle
    try {
      currentUrl = await driver.getCurrentUrl()
      currentTitle = await driver.getTitle()
    } catch (error) {
      console.log('error :', error);
    }

    try {
      if (currentUrl && currentUrl.includes(keyword) && currentTitle && currentTitle.includes('Whitewater')) {
        await driver.executeScript(clickRandomLink)
      } else {
        await driver.get(testUrl);
      }
    } catch (err) {
      console.log('err :', err);
    }

    riverId = riverId + 1

    console.log('riverId :', riverId);

  }, 5000);
}

(async function errorMine() {
  
  try {

    let driver = await new Builder().forBrowser('chrome').build();
    let i = 0

    /**
     * load 'every' river in the db just to be sure the 
     * frontend is handling all possible api responses 
     * and each river loads properly.
     * 
     */
    if (i < 6000) {
      setInterval(async () => {
        let testUrl = `http://127.0.0.1:7070/#/river-detail/${i}/main`
        await driver.get(testUrl);
        i++
      }, 3000);
  }
  
    

  } catch (error) {
    console.log('error :', error);
    process.exit()
  }

})();