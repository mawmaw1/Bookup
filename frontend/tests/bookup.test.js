const {Builder, By, Key, until} = require('selenium-webdriver');


let driver


beforeAll(async () => {
    try{
        driver = await new Builder().forBrowser('chrome').usingServer('http://localhost:4444/wd/hub').build();
        await driver.get('http://51.15.255.3:8085/')
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