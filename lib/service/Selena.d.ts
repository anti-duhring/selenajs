import { TLog, Test } from "./Test.js";
export type TCategory = {
    name: string;
    tests: Test[];
    logs: TLog[];
};
export declare class Selena {
    private readonly logs;
    private allTests;
    private categories;
    constructor();
    addTest(test: Test): void;
    addAllTests(tests: Test[]): void;
    getLogs(): TLog[];
    run(): void;
    private runByCategory;
    private runSpecificTestFromCategory;
    private runAllTests;
}
