import { Builder } from "selenium-webdriver";
import { SelenaDriver } from "../@types/SelenaDriver.js";
export declare class SelenaDriverImpl {
    private builder;
    constructor(builder: Builder);
    createDriver(): Promise<SelenaDriver>;
}
