import { Test, driverWait } from "../index.js"; 

const faileExample = new Test({
    name: "fail example test",
    category: "example category"
})

faileExample.createTest(async (driver, passed, failed) => {
    await driver.get('https://www.google.com')

    await driverWait()

    failed('reason for failing example')
})

export default faileExample