import { Builder, Locator, WebDriver, WebElement, until } from "selenium-webdriver";
import { waitUntilFind, waitUntilFindAndClick } from "./CustomFunctions.js";
import { SelenaDriver } from "../@types/SelenaDriver.js";

export class SelenaDriverImpl {
    private builder: Builder;

    constructor(builder: Builder) {
        this.builder = builder;
    }

    async createDriver() {
        const driver = await this.builder.build() as SelenaDriver;
        driver.waitUntilFind = waitUntilFind.bind(driver)
        driver.waitUntilFindAndClick = waitUntilFindAndClick.bind(driver)

        return driver;
    }
}
