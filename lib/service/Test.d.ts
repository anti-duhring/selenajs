import { Builder, WebDriver } from 'selenium-webdriver';
export type TLog = {
    name: string;
    category: string;
    message: string | null | undefined;
    status: "passed" | "failed" | "progress";
};
export type TProps = {
    name: string;
    category?: string;
    builder?: Builder;
    config?: object;
};
export type TPassTest = () => void;
export type TFailTest = (message: string) => void;
export type TTestFunction = (driver: WebDriver, passed: TPassTest, failed: TFailTest) => Promise<any>;
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
    getLog(): TLog;
    getConfig(): object;
    getCategory(): string;
    getName(): string;
}
