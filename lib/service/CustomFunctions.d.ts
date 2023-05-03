import { Locator, WebElement } from "selenium-webdriver";
declare function waitUntilFind(locator: Locator, timeout?: number): Promise<WebElement>;
declare function waitUntilFindAndClick(locator: Locator, timeout?: number): Promise<WebElement>;
export { waitUntilFind, waitUntilFindAndClick };
