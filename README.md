# SelenaJS

`SelenaJS` is a lightweight testing framework for Node.js, designed to simplify the creation and execution of end-to-end tests. With `SelenaJS`, you can easily define and organize your tests, and execute them in a reliable and repeatable way.

## Index
- [Installation](#installation)
- [Requirements](#requirements)
- [Usage](#usage)
    - [Creating tests](#creating-tests)
    - [Running tests](#running-tests)
- [Test Function](#test-function)
- [SelenaDriver](#selenadriver)

## Installation
To use `SelenaJS`, you need to install it through npm. Open a terminal window and type:
```bash
npm install selenajs
```

## Requirements
To run `SelenaJS` or any Selenium test/automation you may need to install a [driver](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/) compatible with your browser to allow it to be automated.

## Usage
To use `SelenaJS` in your project, you need to create one or more tests and add them to a `Selena` instance. You can then call the `run()` method to execute the tests in the instance.

Here's an example of how to use Selena to execute a simple test:
```javascript
import { Test, Selena } from "selenajs";

const test = new Test({
    name: "Example Test",
    category: "Example Category"
});

test.createTest(async (driver, passed, failed) => {
    await driver.get("https://www.google.com");
    const title = await driver.getTitle();
    if (title === "Google") {
        passed();
    } else {
        failed(`Unexpected title: ${title}`);
    }
});

const selena = new Selena();
selena.addAllTests([test]);
selena.run();
```

In this example, we create a new `Test` object and give it a name and category. We then define a test function that uses a Selenium WebDriver instance to navigate to `https://www.google.com` and retrieve the page title. If the title is `"Google"`, the test is considered to have passed. Otherwise, the test fails with an error message.

We then create a Selena instance and add the test to it using the `addAllTests()` method. Finally, we call `run()` to execute all the tests in the instance.

## Creating Tests
To create a new test in Selena, you need to create a new `Test` object and give it a name and category. You can then define a test function that uses a SelenaDriver instance to perform one or more actions, and call the `passed()` or `failed()` methods to indicate whether the test has passed or failed.

Here's an example of how to create a new test in Selena:
```javascript
const test = new Test({
    name: "Example Test",
    category: "Example Category"
});

test.createTest(async (driver, passed, failed) => {
    // Use the SelenaDriver instance to perform actions here
    // Call passed() if the test passes, or failed() if it fails
    // If failed() is not called, the test will be considered passed
});
```

Properties that you can pass into `Test` constructor:
- `name: string`: A name to identify your test. - **Required**
- `category: string`: A category name for grouping the test together with other tests.
- `config: object`: A custom object to be consumed in your test. You can get this object using the method `Test.getConfig()`.
- `builder: Builder`: A [Builder](https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_Builder.html) instance for selenium-webdriver. 
    - **Default**: `new Builder().forBrowser('chrome')`. 
    - **Note**: The builder instance has to be passed without `.build()` method because this method will be automatically called when the test starts running.

Methods that you can use with you `Test` instance:
- `Test.createTest(test: TTestFunction): void`: This method is used to create a new test into your `Test` instance.
    - **Ex**: 
    ```javascript
    test.createTest(async (driver, passed, failed) => {
        await driver.get("https://www.google.com");
        const title = await driver.getTitle();
        if (title === "Google") {
            passed();
        } else {
            failed(`Unexpected title: ${title}`);
        }
    });
    ```
    - This method receive an async function as parameter, which is exaplained in details down below, on the topic about [`Test Function`](#test-function).
- `Test.runTest(): Promise<TLog>`: This method can be used to run this single test.
- `Test.getLog(): TLog`: Get the log after the test has finished.
- `Test.getConfig(): object`: Get the config object that has been passed in `Test` constructor.
- `Test.getCategory(): string`: Get the name of the category of this test.
- `Test.getName(): string`: Get the name of this test.

## Running Tests
To run your tests, you need to create a new instance of `Selena` object. This object provides a `CLI` that makes it easy to manage your tests. You can add all tests inside it using the method `.addAllTests()`.
Ex:
```javascript
import { Test, Selena } from "selenajs";

const test = new Test({
    name: "Example Test",
    category: "Example Category"
});

test.createTest(async (driver, passed, failed) => {
    await driver.get("https://www.google.com");
    const title = await driver.getTitle();
    if (title === "Google") {
        passed();
    } else {
        failed(`Unexpected title: ${title}`);
    }
});

const selena = new Selena();
selena.addAllTests([test]);
selena.run();
```

The `CLI` provided by `Selena` allows you to run a single test, all tests, or tests from a specific category. Once the tests have finished running, Selena provides a report that displays how many tests were executed, how many tests passed, and how many tests failed.

Methods that you can use with you `Selena` instance:
- `Selena.addTest(test: Test): void`: Add a single test into your `Selena` instance.
- `Selena.addAllTests(tests: Test[]): void`: Add multiple tests into your `Selena` instance.
- `Selena.getLogs(): TLog[]`: Get the log from all tests after it has finished.
- `Selena.run(): void`: Initiate your tests, providing a `CLI`.

Using `SelenaJS`, you can streamline your testing process by running multiple tests at once and quickly identifying which tests have passed or failed. The report provided by Selena helps you to pinpoint any issues or bugs in your code and make necessary changes to improve your software's functionality.

## Test Function
The `Test Function` is an async function passed as a parameter of the `Test.createTest()` method, and it is inside that function where your test has to be. Ex:
```javascript
const testFunction = async (driver, passed, failed) => {
    await driver.get("https://www.google.com");
    const title = await driver.getTitle();
    if (title === "Google") {
        passed();
    } else {
        failed(`Unexpected title: ${title}`);
    }
}
test.createTest(testFunction)
```

This function receive three parameters, a `driver`, which is a [`SelenaDriver`](#selenadriver) instance, the `passed` function, which you can call when the test pass and a `failed` function, which you can call when the test has to fail.

- `Test.passed(): void`: A function to be called when you want you test to be consider as passed. If this function is never called the test will automatically be considered passed if the function `failed` is not called.
- `Test.failed(message: string): void`: A function to be called when you want you test to be consider as failed. If the `passed` function already has been called the test will not be considered failed even if the `failed` function is called after.

## SelenaDriver
The `SelenaDriver` is an instance of a [`Selenium WebDriver`](https://www.selenium.dev/documentation/webdriver/) with some custom functions:

- `SelenaDriver.waitUntilFind(locator: Locator, timeout?: number): Promise<WebElement>`
    - This method is a shortcut to the method that waits until an element is located. Ex:
    ```javascript
    // This method
    const element = await driver.wait(
        until.elementLocated(By.css('button')),
        1000
    )

    // Can be used like this
    const element = await driver.waitUntilFind(
        By.css('button'),
        1000
    )
    ```
- `SelenaDriver.waitUntilFindAndClick(locator: Locator, timeout?: number): Promise<WebElement>`
    - This method is a shortcut to the method that waits until an element is located and then clicks on it. Ex:
    ```javascript
    // This method
    const element = await driver.wait(
        until.elementLocated(By.css('button')),
        1000
    )

    await driver.wait(
        until.elementIsEnabled(element),
        1000
    )

    await element.click()

    // Can be used like this
    const element = await driver.waitUntilFindAndClick(
        By.css('button'),
        1000
    )
    ```
- `SelenaDriver.waitUntilFindAndSendKeys(locator: Locator, keys: string, timeout?: number): Promise<WebElement>`
    - This method is a shortcut to the method that waits until an element is located and then sends keys on it. Ex:
    ```javascript
    // This method
    const element = await driver.wait(
        until.elementLocated(By.css('input')),
        1000
    )

    await driver.wait(
        until.elementIsEnabled(element),
        until
    )

    await element.sendKeys('Some text')

    // Can be used like this
    const element = await driver.waitUntilFindAndSendKeys(
        By.css('input'),
        'Some text',
        1000
    )
    ```

- `SelenaDriver.waitUntilDownloadComplete(fileName: string, downloadDir?: string, timeout?: number): Promise<unknown>`
    - This method waits until a file is downloaded and then, when it's finished, keeps performing all remaining actions. Ex:
    ```javascript
    await driver.waitUntilFindAndClick(
        By.css('button')
    )

    await driver.waitUntilDownloadComplete('file.zip')

    await driver.get('https://google.com')
    ```

    In this example the driver click on a button that downloads the file, waits until the download complete and then, when it's finished, go to the Google homepage.

# Contributing
Thank you for considering contributing to `SelenaJS`! We welcome any contributions, whether they be bug fixes, feature requests, documentation improvements, or anything in between.

To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your contribution.
3. Make your changes and commit them, with descriptive commit messages.
4. Push your branch to your forked repository.
5. Open a pull request with a clear title and description of your changes.

We appreciate your contributions and hope to work with you soon!