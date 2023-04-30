import Log from "./Log.js"
import { Builder, WebDriver } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome.js';

export type TLog = {
    name: string,
    category: string,
    message: string | null | undefined,
    status: "passed" | "failed" | "progress"
}

export type TProps = { 
    name: string, 
    category?: string,
    builder?: Builder,
    config?: object, 
}

export type TPassTest = () => void
export type TFailTest = (message: string) => void

export type TTestFunction = (driver: WebDriver, passed: TPassTest, failed: TFailTest) => Promise<any>

export class Test {
    private readonly config: object = {};
    private readonly name: string;
    private readonly category: string;

    private log: TLog;
    private testFunction?: TTestFunction;

    private builder: Builder;

    constructor(props: TProps) {
        this.config = props.config?? {};

        this.name = props.name;
        this.category = props.category ?? this.name;
        this.builder = props.builder ?? this.createDefaultBuilder();

        this.log = {
            name: props.name,
            category: props.category ?? this.name,
            message: null,
            status: "progress"
        }
    }

    createTest(test: TTestFunction) {
        this.testFunction = test;
    }

    async runTest() {
        if(this.testFunction) {
            Log.warning(`Loading test "${this.name}"...`);
            const driver = await this.builder.build();

            try {
                await this.testFunction(
                    driver,
                    this.passed.bind(this), 
                    this.failed.bind(this)
                );

                this.passed.bind(this)()
            } catch(err) {
                Log.error(err.message)
            } finally {
                driver.close()
            }
             
        }

        return this.log
    }

    private passed() {
        const log: TLog = {
            ...this.getLog(),
            status: 'passed',
        }

        this.log = log
        Log.success(`Test "${this.name}" has passed!`)
    }
    
    private failed(message: string) {
        const log: TLog = {
            ...this.getLog(),
            status: 'failed',
            message
        }

        this.log = log
        throw new Error(`Test "${this.name}" failed. \nReason: ${message}`)
    }

    private createDefaultBuilder() {
        const options = new chrome.Options();
        options.excludeSwitches('enable-logging');


        return new Builder().forBrowser('chrome').withCapabilities(options);
    }

    getLog() {
        return this.log;
    }

    getConfig() {
        return this.config;
    }

    getCategory() {
        return this.category;
    }

    getName() {
        return this.name;
    }
}