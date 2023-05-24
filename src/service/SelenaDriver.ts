import { Builder, Locator, WebDriver, WebElement, until } from "selenium-webdriver";
import { waitUntilDownloadComplete, waitUntilFind, waitUntilFindAndClick, waitUntilFindAndSendKeys } from "./CustomFunctions.js";

export class SelenaDriverImpl {
    private builder: Builder;

    constructor(builder: Builder) {
        this.builder = builder;
    }

    async createDriver() {
        const driver = await this.builder.build() as SelenaDriver;
        driver.waitUntilFind = waitUntilFind.bind(driver)
        driver.waitUntilFindAndClick = waitUntilFindAndClick.bind(driver)
        driver.waitUntilDownloadComplete = waitUntilDownloadComplete.bind(driver)
        driver.waitUntilFindAndSendKeys = waitUntilFindAndSendKeys.bind(driver)

        return driver;
    }
}

export interface SelenaDriver extends WebDriver
{
    waitUntilFind(locator: Locator, time?: number): Promise<WebElement>

    waitUntilFindAndClick(locator: Locator, time?: number): Promise<WebElement>

    waitUntilFindAndSendKeys(locator: Locator, keys: string, time?: number): Promise<void>

    waitUntilDownloadComplete( filename:  string, downloadDir?: string, timeout?: number): Promise<void>
}