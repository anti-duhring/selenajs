var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import Log from "./Log.js";
import enquirer from 'enquirer';
var prompt = enquirer.prompt;
var TypeOfRun;
(function (TypeOfRun) {
    TypeOfRun["allTests"] = "All tests";
    TypeOfRun["specificCategory"] = "Specific category";
})(TypeOfRun || (TypeOfRun = {}));
var Selena = /** @class */ (function () {
    function Selena() {
        this.logs = [];
        this.allTests = [];
        this.categories = [];
    }
    Selena.prototype.addTest = function (test) {
        this.allTests.push(test);
        var categoryIndex = this.categories.findIndex(function (c) { return c.name == test.getCategory(); });
        if (categoryIndex == -1) {
            this.categories.push({
                name: test.getCategory(),
                tests: [test],
                logs: []
            });
        }
        else {
            this.categories[categoryIndex].tests.push(test);
        }
    };
    Selena.prototype.addAllTests = function (tests) {
        for (var _i = 0, tests_1 = tests; _i < tests_1.length; _i++) {
            var test = tests_1[_i];
            this.addTest(test);
        }
    };
    Selena.prototype.getLogs = function () {
        return this.logs;
    };
    Selena.prototype.run = function () {
        var _this = this;
        Log.warning("Starting Selena...");
        Log.warning("".concat(this.categories.length, " categories found"));
        Log.warning("".concat(this.allTests.length, " tests found in these categories"));
        var typeOfRun = prompt({
            type: 'select',
            name: 'typeOfRun',
            message: 'Would you like to run all tests or choose a specific category?',
            choices: [TypeOfRun.allTests, TypeOfRun.specificCategory]
        })
            .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (response.typeOfRun == TypeOfRun.specificCategory) {
                            this.runByCategory();
                            return [2 /*return*/];
                        }
                        Log.warning("Running all tests...");
                        return [4 /*yield*/, this.runAllTests()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })
            .catch(function (e) { return Log.error("Erro when trying to execute Selena: ".concat(e)); });
    };
    Selena.prototype.runByCategory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var category, categoryIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prompt({
                            type: 'select',
                            name: 'category',
                            message: 'Choose a category',
                            choices: this.categories.map(function (c) { return c.name; })
                        })];
                    case 1:
                        category = (_a.sent()).category;
                        categoryIndex = this.categories.findIndex(function (c) { return c.name == category; });
                        Log.warning("Running tests from \"".concat(category, "\"..."));
                        return [4 /*yield*/, this.runAllTests(this.categories[categoryIndex].tests, this.categories[categoryIndex].logs)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Selena.prototype.runAllTests = function (tests, logs) {
        if (tests === void 0) { tests = this.allTests; }
        if (logs === void 0) { logs = this.logs; }
        return __awaiter(this, void 0, void 0, function () {
            var _i, tests_2, test, res, _a, passedTests, failedTests, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        _i = 0, tests_2 = tests;
                        _b.label = 1;
                    case 1:
                        if (!(_i < tests_2.length)) return [3 /*break*/, 4];
                        test = tests_2[_i];
                        return [4 /*yield*/, test.runTest()];
                    case 2:
                        res = _b.sent();
                        logs.push(res);
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        _a = logs.reduce(function (acc, log) {
                            if (log.status === 'passed') {
                                acc.passedTests.push(log);
                            }
                            else {
                                acc.failedTests.push(log);
                            }
                            return acc;
                        }, { passedTests: [], failedTests: [] }), passedTests = _a.passedTests, failedTests = _a.failedTests;
                        Log.warning("".concat(tests.length, " tests were executed"));
                        Log.success("".concat(passedTests.length, " tests passed"));
                        Log.error("".concat(failedTests.length, " tests failed"));
                        Log.message('Failed tests:');
                        Log.message(failedTests);
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _b.sent();
                        Log.error("Error when trying to execute Selena: ".concat(e_1));
                        throw e_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return Selena;
}());
export { Selena };
