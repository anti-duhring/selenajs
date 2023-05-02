import { Builder, Locator, WebDriver, WebElement } from "selenium-webdriver";
export declare class SelenaDriverImpl {
    private builder;
    constructor(builder: Builder);
    createDriver(): Promise<SelenaDriver>;
}
export interface SelenaDriver extends WebDriver {
    waitUntilFind(locator: Locator): Promise<WebElement>;
}
