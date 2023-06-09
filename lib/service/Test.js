var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import { SelenaDriverImpl } from "./SelenaDriver.js";
export var StatusTest;
(function (StatusTest) {
    StatusTest["passed"] = "passed";
    StatusTest["failed"] = "failed";
    StatusTest["progress"] = "progress";
})(StatusTest || (StatusTest = {}));
var Test = /** @class */ (function () {
    function Test(props) {
        var _a, _b, _c, _d;
        this.config = {};
        this.log = {
            name: null,
            category: null,
            message: null,
            status: StatusTest.progress,
        };
        this.config = (_a = props.config) !== null && _a !== void 0 ? _a : {};
        this.name = props.name;
        this.category = (_b = props.category) !== null && _b !== void 0 ? _b : this.name;
        this.builder = (_c = props.builder) !== null && _c !== void 0 ? _c : this.createDefaultBuilder();
        this.log = __assign(__assign({}, this.log), { name: props.name, category: (_d = props.category) !== null && _d !== void 0 ? _d : this.name });
    }
    Test.prototype.createTest = function (test) {
        this.testFunction = test;
    };
    Test.prototype.runTest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var driver, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.testFunction)
                            return [2 /*return*/];
                        this.resetLog();
                        Log.warning("Loading test \"".concat(this.name, "\"..."));
                        return [4 /*yield*/, new SelenaDriverImpl(this.builder).createDriver()];
                    case 1:
                        driver = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        return [4 /*yield*/, this.testFunction(driver, this.passed.bind(this), this.failed.bind(this))];
                    case 3:
                        _a.sent();
                        this.passed();
                        return [3 /*break*/, 6];
                    case 4:
                        err_1 = _a.sent();
                        this.failed(err_1.message);
                        return [3 /*break*/, 6];
                    case 5:
                        driver.close();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/, this.log];
                }
            });
        });
    };
    Test.prototype.passed = function () {
        var log = __assign(__assign({}, this.log), { status: StatusTest.passed });
        this.log = log;
        Log.success("Test \"".concat(this.name, "\" has passed!"));
    };
    Test.prototype.failed = function (message) {
        if (this.log.status != StatusTest.progress)
            return;
        var log = __assign(__assign({}, this.log), { status: StatusTest.failed, message: message });
        this.log = log;
        Log.error("Test \"".concat(this.name, "\" failed. \nReason: ").concat(message));
    };
    Test.prototype.createDefaultBuilder = function () {
        var options = new chrome.Options();
        options.excludeSwitches('enable-logging');
        return new Builder().forBrowser('chrome').withCapabilities(options);
    };
    Test.prototype.resetLog = function () {
        this.log = __assign(__assign({}, this.getLog()), { status: StatusTest.progress, message: null });
    };
    Test.prototype.getLog = function () {
        return this.log;
    };
    Test.prototype.getConfig = function () {
        return this.config;
    };
    Test.prototype.getCategory = function () {
        return this.category;
    };
    Test.prototype.getName = function () {
        return this.name;
    };
    return Test;
}());
export { Test };
