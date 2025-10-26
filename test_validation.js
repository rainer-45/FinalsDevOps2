require('chromedriver'); // load chromedriver
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function testForm() {
    // Chrome options
    let options = new chrome.Options();
    options.addArguments("--start-maximized");
    options.addArguments("--headless"); // Uncomment to run headless

    // Build driver
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        // Replace this with your page URL
        await driver.get('http://100.27.46.130:5500/public/');

        // click Play button
        let element = await driver.wait(
         until.elementIsVisible(driver.findElement(By.id('okBtn'))),
           5000
        );
        await element.click();

        // click cell 0
        await driver.findElement(By.id('cell0')).click()
       let cell =  await driver.findElement(By.id('cell0'));

        // check for out when clicked
        const output = (await cell.getText()).trim();
        console.log("output = " + output);
      if (output === "playerText") {
            console.log("Test Failed");
            //process.exit(1);
      } else if (output === "×") {
            console.log("Test Passed");
     } else {
            console.log("Unexpected value:", output); // optional fallback
    }
    } finally {
        await driver.sleep(500); // optional small delay
        await driver.quit();
    }
})();