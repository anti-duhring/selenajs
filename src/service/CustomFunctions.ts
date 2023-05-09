import { Locator, WebElement, until } from "selenium-webdriver"
import { execSync } from "child_process"
import os from 'os'
import { existsSync, promises } from "fs"

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

async function waitUntilFindAndSendKeys(
    locator: Locator,
    keys: string,
    timeout: number = 1000
) {
    const element: WebElement = await this.wait(
        until.elementLocated(locator),
        timeout
    )

    await this.wait(
        until.elementIsEnabled(element),
        timeout
    )

    await element.sendKeys(keys)

    return element
}

async function waitUntilDownloadComplete(
    fileName: string, 
    downloadDir = `${os.homedir}\\Downloads`, 
    timeout = 10000
) {
    let elapsedTime = new Date();

    async function waitForFileToDownload(
      callbackWhenCompleted: (isError: boolean) => void,
    ) {
      if (!existsSync(downloadDir)) await promises.mkdir(downloadDir, { recursive: true });
      const downloadPath = `${downloadDir.replace(/\\/g,'/')}/${fileName}`;
  
      const now = new Date();

      // Reference: https://stackoverflow.com/a/13894670
      
      const hasPassedTimeout = (now.getTime() - elapsedTime.getTime()) / 1000 > timeout;
      if (hasPassedTimeout) callbackWhenCompleted(true);
      else if (existsSync(downloadPath)) callbackWhenCompleted(false);
      
      // Reference: https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick

      else process.nextTick(() => waitForFileToDownload(callbackWhenCompleted));
    }
  
    return new Promise((resolve, reject) => {
      void waitForFileToDownload.bind(this)((isError) => {
        if (isError) reject({ message: 'Download timeout has been reached' });
        else resolve(undefined);
      });
    });
}

export {
    waitUntilFind,
    waitUntilFindAndClick,
    waitUntilFindAndSendKeys,
    waitUntilDownloadComplete
}