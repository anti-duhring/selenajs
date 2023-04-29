import { Selena } from "../index.js";
import testFromAnotherCategoryExample from "./testFromAnotherCategoryExample.js";
import faileExample from "./failExample.js";
import passExample from "./passExample.js";

const selena = new Selena();
selena.addAllTests([
    passExample,
    faileExample,
    testFromAnotherCategoryExample
])

selena.run()