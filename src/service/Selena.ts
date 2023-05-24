import Log from "./Log.js";
import { StatusTest, TLog, Test } from "./Test.js";
import enquirer from 'enquirer';
const { prompt } = enquirer;

enum TypeOfRun {
    allTests = 'All tests',
    specificCategory = 'Specific category'
}
enum TypeOfRunByCategory {
    allTests = 'All tests',
    specificTest = 'Specific test'
}

export type TCategory = {
    name: string,
    tests: Test[],
    logs: TLog[]
}

export class Selena {
    private readonly logs: TLog[] = [];
    private allTests: Test[] = [];
    private categories: TCategory[] = [];

    constructor() {

    }

    addTest(test: Test) {
        this.allTests.push(test);

        const categoryIndex = this.categories.findIndex(c => c.name == test.getCategory());

        if(categoryIndex == -1) {
            this.categories.push({
                name: test.getCategory(),
                tests: [test],
                logs: []
            })
        } else {
            this.categories[categoryIndex].tests.push(test);
        }
    }
    

    addAllTests(tests: Test[]) {
        for (let test of tests) {
            this.addTest(test);
        }
    }

    getLogs() {
        return this.logs
    }

    run() {
        Log.warning(`Starting Selena...`)
        Log.warning(`${this.categories.length} categories were found`)
        Log.warning(`${this.allTests.length} tests found in these categories`)

        const typeOfRun = prompt({
            type: 'select',
            name: 'typeOfRun',
            message: 'Would you like to run all tests or choose a specific category?',
            choices: [TypeOfRun.allTests, TypeOfRun.specificCategory]
        })
        .then(async(response: any) => {
            if(response.typeOfRun == TypeOfRun.specificCategory) {
                this.runByCategory()
                return
            }
    
            Log.warning(`Running all tests...`);
            await this.runAllTests()
        })
        .catch(e => Log.error(`Erro when trying to execute Selena: ${e}`))
    }

    private async runByCategory() {    
        const { category }: any = await prompt({
            type: 'select',
            name: 'category',
            message: 'Choose a category',
            choices: this.categories.map(c => c.name)
        })
        
        const categoryIndex = this.categories.findIndex(c => c.name == category);

        const { typeOfRunByCategory  }: any = await prompt({
            type: 'select',
            name: 'typeOfRunByCategory',
            message: 'Would you like to run all tests in this category or choose a specific test?',
            choices: [TypeOfRunByCategory.allTests, TypeOfRunByCategory.specificTest]
        })

        if(typeOfRunByCategory == TypeOfRunByCategory.specificTest) {
            await this.runSpecificTestFromCategory(categoryIndex)
            return
        }

        Log.warning(`Running tests from "${category}"...`);
        await this.runAllTests(
            this.categories[categoryIndex].tests, 
            this.categories[categoryIndex].logs
        )
    }

    private async runSpecificTestFromCategory(categoryIndex: number) {
        const { test }: any = await prompt({
            type: 'select',
            name: 'test',
            message: 'Choose a test',
            choices: this.categories[categoryIndex].tests.map(c => c.getName())
        })

        const testIndex = this.categories[categoryIndex].tests.findIndex(c => c.getName() == test);

        await this.categories[categoryIndex].tests[testIndex].runTest();
    }

    private async runAllTests(
        tests: Test[] = this.allTests,  
        logs: TLog[] = this.logs
    ) {
        try {

            for (const test of tests) {
                const res = await test.runTest();
                logs.push(res);
            }
        
            const { passedTests, failedTests } = logs.reduce((acc, log) => {
            if (log.status === StatusTest.passed) {
                acc.passedTests.push(log);
            } else {
                acc.failedTests.push(log);
            }
            return acc;
            }, { passedTests: [], failedTests: [] });
        
            Log.warning(`${tests.length} tests were executed`);
            Log.success(`${passedTests.length} tests passed`);
            Log.error(`${failedTests.length} tests failed`);
            Log.message('Failed tests:');
            Log.message(failedTests);
      
        } catch (e) {
            Log.error(`Error when trying to execute Selena: ${e}`);
            throw e;
        }
    }
      
}