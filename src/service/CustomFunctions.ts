import { Locator, WebElement, until } from "selenium-webdriver"
import { execSync } from "child_process"
import os from 'os'
import { existsSync, mkdirSync } from "fs"
import path from "path"

async function waitUntilFind(
    locator: Locator, 
    timeout: number = 1000
) {
    const element = await this.wait(
        until.elementLocated(locator),
        timeout
    )

    return element as WebElement
}

async function waitUntilFindAndClick(
    locator: Locator, 
    timeout: number = 1000
) {
    const element = await this.wait(
        until.elementLocated(locator),
        timeout
    )

    await this.wait(
        until.elementIsEnabled(element),
        timeout
    )

    await element.click()

    return element as WebElement
}

async function waitUntilDownloadComplete(
    downloadDir: string,
    filename: string,
    timeout: number = 10000
) {
    if (!existsSync(downloadDir)) {
        mkdirSync(downloadDir, { recursive: true });
    }

    const downloadPath = os.platform() === 'win32' ? downloadDir : path.join(downloadDir, filename);

    await this.wait(async function() {
        return existsSync(downloadPath);
    }, timeout);
}

export {
    waitUntilFind,
    waitUntilFindAndClick
}