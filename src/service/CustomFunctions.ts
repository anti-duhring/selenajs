import { Locator, WebElement, until } from "selenium-webdriver"

async function waitUntilFind(locator: Locator, timeout: number = 5000) {
    const element = await this.wait(
        until.elementLocated(locator),
        timeout
    )

    return element as WebElement
}

export {
    waitUntilFind
}