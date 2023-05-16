import { TLog, TProps, TTestFunction } from "../@types/Test.js";
export declare enum StatusTest {
    passed = "passed",
    failed = "failed",
    progress = "progress"
}
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
