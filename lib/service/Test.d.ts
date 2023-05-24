import { Builder } from 'selenium-webdriver';
import { SelenaDriver } from "./SelenaDriver.js";
export declare enum StatusTest {
    passed = "passed",
    failed = "failed",
    progress = "progress"
}
export type TLog = {
    name: string;
    category: string;
    message: string | null | undefined;
    status: StatusTest.progress | StatusTest.passed | StatusTest.failed;
};
export type TProps = {
    name: string;
    category?: string;
    builder?: Builder;
    config?: object;
};
export type TPassTest = () => void;
export type TFailTest = (message: string) => void;
export type TTestFunction = (driver: SelenaDriver, passed: TPassTest, failed: TFailTest) => Promise<any>;
export declare class Test {
    private readonly config;
    private readonly name;
    private readonly category;
    private log;
    private testFunction?;
    private builder;
    constructor(props: TProps);
    createTest(test: TTestFunction): void;
    runTest(): Promise<TLog>;
    private passed;
    private failed;
    private createDefaultBuilder;
    private resetLog;
    getLog(): TLog;
    getConfig(): object;
    getCategory(): string;
    getName(): string;
}
