const { Builder, By, Key, until } = require('selenium-webdriver');
//const chrome = require('selenium-webdriver/chrome');
require('dotenv').load();

let driver
const timeoutMs = 4000

beforeAll(async () => {
    try {

        driver = await new Builder().forBrowser('chrome').usingServer('http://localhost:4444/wd/hub').build();
        //driver = await new Builder().forBrowser('chrome').build()
        
        await driver.get(process.env.FRONTEND_URL || 'http://localhost:8080/')



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


test('#1 - Verify Postgres Query 1 ', async () => {
    try {
        let input = await driver.findElement(By.id('queryInput')).sendKeys('Copenhagen')
        let searchbutton = await driver.findElement(By.id('search-button')).click()
        await timeout(timeoutMs)
        let tbody = await driver.findElement(By.id('query1Table'))
        let rows = await tbody.findElements(By.xpath('.//tr'))
        expect(rows.length).toBeGreaterThan(0)
    }
    catch (e) {
        console.log(e)
    }

})

test('#2 - Verify Postgres Query 2 ', async () => {
    try {
        let query = await driver.findElement(By.id('selectQuery')).click()
        await driver.findElement(By.id('query2')).click()
        let input = await driver.findElement(By.id('queryInput')).sendKeys('Moby Dick')
        let searchbutton = await driver.findElement(By.id('search-button')).click()
        await timeout(timeoutMs)
        let tbody = await driver.findElement(By.id('query2Table'))
        let rows = await tbody.findElements(By.xpath('.//tr'))
        expect(rows.length).toBeGreaterThan(0)
    }
    catch (e) {
        console.log(e)
    }

})

test('#3 - Verify Postgres Query 3 ', async () => {
    try {
        let query = await driver.findElement(By.id('selectQuery')).click()
        await driver.findElement(By.id('query3')).click()
        let input = await driver.findElement(By.id('queryInput')).sendKeys('Lindsay')
        let searchbutton = await driver.findElement(By.id('search-button')).click()
        await timeout(timeoutMs)
        let tbody = await driver.findElement(By.id('query3Table'))
        let rows = await tbody.findElements(By.xpath('.//tr'))
        expect(rows.length).toBeGreaterThan(0)
    }
    catch (e) {
        console.log(e)
    }

})

test('#4 - Verify Postgres Query 4 ', async () => {
    try {
        let query = await driver.findElement(By.id('selectQuery')).click()
        await driver.findElement(By.id('query4')).click()
        let input = await driver.findElement(By.id('queryInput')).sendKeys('40.71427, -74.00597')
        let searchbutton = await driver.findElement(By.id('search-button')).click()
        await timeout(3000)
        let tbody = await driver.findElement(By.id('query4Table'))
        let rows = await tbody.findElements(By.xpath('.//tr'))
        expect(rows.length).toBeGreaterThan(0)
    }
    catch (e) {
        console.log(e)
    }

})

test('#5 - Verify Mongo Query 1 ', async () => {
    try {
        await timeout(timeoutMs)
        let mongo = await driver.findElement(By.id('mongo')).click()
        let input = await driver.findElement(By.id('queryInput')).sendKeys('Copenhagen')
        let searchbutton = await driver.findElement(By.id('search-button')).click()
        await timeout(timeoutMs)
        let tbody = await driver.findElement(By.id('query1Table'))
        let rows = await tbody.findElements(By.xpath('.//tr'))
        expect(rows.length).toBeGreaterThan(0)
    }
    catch (e) {
        console.log(e)
    }

})

test('#6 - Verify Mongo Query 2 ', async () => {
    try {
        let query = await driver.findElement(By.id('selectQuery')).click()
        await driver.findElement(By.id('query2')).click()
        let input = await driver.findElement(By.id('queryInput')).sendKeys('Moby Dick')
        let searchbutton = await driver.findElement(By.id('search-button')).click()
        await timeout(timeoutMs)
        let tbody = await driver.findElement(By.id('query2Table'))
        let rows = await tbody.findElements(By.xpath('.//tr'))
        expect(rows.length).toBeGreaterThan(0)
    }
    catch (e) {
        console.log(e)
    }

})

test('#7 - Verify Mogno Query 3 ', async () => {
    try {
        let query = await driver.findElement(By.id('selectQuery')).click()
        await driver.findElement(By.id('query3')).click()
        let input = await driver.findElement(By.id('queryInput')).sendKeys('Lindsay')
        let searchbutton = await driver.findElement(By.id('search-button')).click()
        await timeout(timeoutMs)
        let tbody = await driver.findElement(By.id('query3Table'))
        let rows = await tbody.findElements(By.xpath('.//tr'))
        expect(rows.length).toBeGreaterThan(0)
    }
    catch (e) {
        console.log(e)
    }

})

test('#8 - Verify Mongo Query 4 ', async () => {
    try {
        let query = await driver.findElement(By.id('selectQuery')).click()
        await driver.findElement(By.id('query4')).click()
        let input = await driver.findElement(By.id('queryInput')).sendKeys('40.71427, -74.00597')
        let searchbutton = await driver.findElement(By.id('search-button')).click()
        await timeout(3000)
        let tbody = await driver.findElement(By.id('query4Table'))
        let rows = await tbody.findElements(By.xpath('.//tr'))
        expect(rows.length).toBeGreaterThan(0)
    }
    catch (e) {
        console.log(e)
    }

})

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}