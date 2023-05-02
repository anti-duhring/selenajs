import { By, until } from "selenium-webdriver";
import { Test, driverWait } from "../index.js"; 

const testFromAnotherCategoryExample = new Test({
    name: "pass example test",
    category: "another category"
})

testFromAnotherCategoryExample.createTest(async (driver, passed, failed) => {
    await driver.get('https://www.google.com')

    const searchBox = await driver.waitUntilFind(
        By.css('textarea[name="q"]'),
        500
    )

    searchBox.sendKeys('selenajs')

    await driverWait()
})

export default testFromAnotherCategoryExample