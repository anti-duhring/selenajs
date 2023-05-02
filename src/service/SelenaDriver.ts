import { Builder, Locator, WebDriver, WebElement, until } from "selenium-webdriver";
import { waitUntilFind } from "./CustomFunctions.js";

export class SelenaDriverImpl {
    private builder;

    constructor(builder: Builder) {
        this.builder = builder;
    }

    async createDriver() {
        const driver = await this.builder.build();
        driver.waitUntilFind = waitUntilFind.bind(driver)

        return driver as SelenaDriver;
    }
}

export interface SelenaDriver extends WebDriver
{
    waitUntilFind(locator: Locator, time?: number): Promise<WebElement>
}

