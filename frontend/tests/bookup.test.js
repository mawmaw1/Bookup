const { Builder, By, Key, until } = require('selenium-webdriver');
//const chrome = require('selenium-webdriver/chrome');
require('dotenv').load();

let driver
const timeoutMs = 4000

beforeAll(async () => {
    try {

        driver = await new Builder().forBrowser('chrome').usingServer('http://localhost:4444/wd/hub').build();
        await driver.get(process.env.FRONTEND_URL || 'http://localhost:8080/')
       // driver = await new Builder().forBrowser('chrome').usingServer('http://localhost:4444/wd/hub').build();
        //driver = await new Builder().forBrowser('chrome').build()
        
        //await driver.get('http://docker.for.mac.host.internal:8080/')
        //await driver.get('http://localhost:8080/')
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    }
    catch (e) {
        console.log(e)
    }

})

afterAll(async () => {
    try {
        await driver.quit();
        console.log("driver is shot")

    }
    catch (e) {
        console.log(e)
    }
})


test('#1 - Verify something ', async () => {
    try {
        let input = await driver.findElement(By.id('queryInput')).sendKeys('Copenhagen')
        let searchbutton = await driver.findElement(By.id('search-button')).click()
        await timeout(timeoutMs)
        let tbody = await driver.findElement(By.id('rowtbody'))
        let rows = await tbody.findElements(By.xpath('.//tr'))
        expect(rows.length).toBe(101)
    }
    catch (e) {
        console.log(e)
    }

})

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}