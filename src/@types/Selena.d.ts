import type { Test } from "../service/Test"
import type { TLog } from "./Test"

export type TCategory = {
    name: string,
    tests: Test[],
    logs: TLog[]
}

