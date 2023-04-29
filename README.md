# SelenaJS

Selena is a lightweight testing framework for Node.js, designed to simplify the creation and execution of end-to-end tests. With Selena, you can easily define and organize your tests, and execute them in a reliable and repeatable way.

## Installation
To use SelenaJS, you need to install it through npm. Open a terminal window and type:
```bash
npm install selenajs
```

## Usage
To use Selena in your project, you need to create one or more tests and add them to a `Selena` instance. You can then call the `run()` method to execute the tests in the instance.

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
To create a new test in Selena, you need to create a new `Test` object and give it a name and category. You can then define a test function that uses a Selenium WebDriver instance to perform one or more actions, and call the `passed()` or `failed()` methods to indicate whether the test has passed or failed.

Here's an example of how to create a new test in Selena:
```javascript
const test = new Test({
    name: "Example Test",
    category: "Example Category"
});

test.createTest(async (driver, passed, failed) => {
    // Use the Selenium WebDriver instance to perform actions here
    // Call passed() if the test passes, or failed() if it fails
    // If failed() is not called, the test will be considered passed
});
```
