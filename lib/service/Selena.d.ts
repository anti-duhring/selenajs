import { TLog } from "../@types/Test.js";
import { Test } from "./Test.js";
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
