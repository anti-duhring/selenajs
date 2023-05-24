import Log from "./Log.js"
import { Builder, Locator, WebDriver, until } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome.js';
import { SelenaDriver, SelenaDriverImpl } from "./SelenaDriver.js";

export enum StatusTest {
    passed = 'passed',
    failed = 'failed',
    progress = 'progress'
}

export type TLog = {
    name: string,
    category: string,
    message: string | null | undefined,
    status: StatusTest.progress | StatusTest.passed | StatusTest.failed,
}

export type TProps = { 
    name: string, 
    category?: string,
    builder?: Builder,
    config?: object, 
}

export type TPassTest = () => void
export type TFailTest = (message: string) => void

export type TTestFunction = (driver: SelenaDriver, passed: TPassTest, failed: TFailTest) => Promise<any>

export class Test {
    private readonly config: object = {};
    private readonly name: string;
    private readonly category: string;

    private log: TLog = {
        name: null,
        category: null,
        message: null,
        status: StatusTest.progress,
    };
    private testFunction?: TTestFunction;

    private builder: Builder;

    constructor(props: TProps) {
        this.config = props.config?? {};

        this.name = props.name;
        this.category = props.category ?? this.name;
        this.builder = props.builder ?? this.createDefaultBuilder();

        this.log = {
            ...this.log,
            name: props.name,
            category: props.category ?? this.name,
        }
    }

    createTest(test: TTestFunction) {
        this.testFunction = test;
    }

    async runTest() {
        if(!this.testFunction) return 

        this.resetLog()

        Log.warning(`Loading test "${this.name}"...`)
        const driver = await new SelenaDriverImpl(this.builder).createDriver();

        try {
            await this.testFunction(
                driver,
                this.passed.bind(this), 
                this.failed.bind(this)
            )

            this.passed()
        } catch(err) {
            this.failed(err.message)
        } finally {
            driver.close()
        }

        return this.log
    }

    private passed() {
        const log: TLog = {
            ...this.log,
            status: StatusTest.passed,
        }

        this.log = log
        Log.success(`Test "${this.name}" has passed!`)
    }
    
    private failed(message: string) {
        if(this.log.status != StatusTest.progress) return
        
        const log: TLog = {
            ...this.log,
            status: StatusTest.failed,
            message
        }

        this.log = log
        Log.error(`Test "${this.name}" failed. \nReason: ${message}`)
    }

    private createDefaultBuilder() {
        const options = new chrome.Options();
        options.excludeSwitches('enable-logging');


        return new Builder().forBrowser('chrome').withCapabilities(options);
    }

    private resetLog() {
        this.log = {
            ...this.getLog(),
            status: StatusTest.progress,
            message: null
        }
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