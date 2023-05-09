import { Selena } from "../index.js";
import testFromAnotherCategoryExample from "./testFromAnotherCategoryExample.js";
import faileExample from "./failExample.js";
import passExample from "./passExample.js";
import waitDownloadExample from "./waitDownloadExample.js";
var selena = new Selena();
selena.addAllTests([
    passExample,
    faileExample,
    waitDownloadExample,
    testFromAnotherCategoryExample
]);
selena.run();
