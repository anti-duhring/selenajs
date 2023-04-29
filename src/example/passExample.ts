import { Test, driverWait } from "../index.js"; 

const passExample = new Test({
    name: "pass example test",
    category: "example category"
})

passExample.createTest(async (driver, passed, failed) => {
    await driver.get('https://www.google.com')

    await driverWait()
})

export default passExample