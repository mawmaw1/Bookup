const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');


let driver


beforeAll(async () => {
    try{
        driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().headless())
        .build();
        await driver.get('http://localhost:8080/')
    }
    catch(e){
        console.log(e)
    }
    
})

afterAll(async () => {
    try {
        await driver.quit();
        console.log("driver is shot")
        
    }
    catch(e){
        console.log(e)
    }
})


test('#1 - Verify something ', async () => {
    try{
        let searchbutton = await driver.findElement(By.id('search-button')).click()
        expect(searchbutton).toHaveBeenCalled
    }
    catch(e){
        console.log(e)
    }

})