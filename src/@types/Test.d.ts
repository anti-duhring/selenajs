import { Builder } from "selenium-webdriver"
import { StatusTest } from "../service/Test.js"
import { SelenaDriver } from "./SelenaDriver.js"

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