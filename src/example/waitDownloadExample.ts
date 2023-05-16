import { By, until } from "selenium-webdriver";
import { Test, driverWait } from "../index.js"; 

const waitDownloadExample = new Test({
    name: "Wait download example",
    category: "another category"
})

waitDownloadExample.createTest(async (driver, passed, failed) => {
    await driver.get('https://testfiledownload.com/')

    await driver.waitUntilFindAndClick(
        By.css('a[href="https://speed.hetzner.de/100MB.bin"]')
    )

    await driver.waitUntilDownloadComplete('100MB.bin')

    await driver.get('https://google.com')

    await driver.sleep(5000)
})

export default waitDownloadExample