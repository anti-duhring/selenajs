import { Test, driverWait } from "../index.js"; 

const testFromAnotherCategoryExample = new Test({
    name: "pass example test",
    category: "another category"
})

testFromAnotherCategoryExample.createTest(async (driver, passed, failed) => {
    await driver.get('https://www.google.com')

    await driverWait()
})

export default testFromAnotherCategoryExample