import { Locator, WebDriver, WebElement } from "selenium-webdriver"

export interface SelenaDriver extends WebDriver
{
    waitUntilFind(locator: Locator, time?: number): Promise<WebElement>

    waitUntilFindAndClick(locator: Locator, time?: number): Promise<WebElement>

    waitUntilFindAndSendKeys(locator: Locator, keys: string, time?: number): Promise<void>

    waitUntilDownloadComplete( filename:  string, downloadDir?: string, timeout?: number): Promise<void>
}
