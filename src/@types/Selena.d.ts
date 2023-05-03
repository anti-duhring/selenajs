import { Test } from "../service/Test.js"
import { TLog } from "./Test"

export type TCategory = {
    name: string,
    tests: Test[],
    logs: TLog[]
}

