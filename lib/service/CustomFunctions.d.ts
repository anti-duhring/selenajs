import { Locator, WebElement } from "selenium-webdriver";
declare function waitUntilFind(locator: Locator, timeout?: number): Promise<WebElement>;
export { waitUntilFind };
