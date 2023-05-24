import { Locator, WebElement } from "selenium-webdriver";
declare function waitUntilFind(locator: Locator, timeout?: number): Promise<WebElement>;
declare function waitUntilFindAndClick(locator: Locator, timeout?: number): Promise<WebElement>;
declare function waitUntilFindAndSendKeys(locator: Locator, keys: string, timeout?: number): Promise<WebElement>;
declare function waitUntilDownloadComplete(fileName: string, downloadDir?: string, timeout?: number): Promise<unknown>;
export { waitUntilFind, waitUntilFindAndClick, waitUntilFindAndSendKeys, waitUntilDownloadComplete };
