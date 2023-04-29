import chalk from "chalk";
var Log = {
    error: function (message) {
        console.log(chalk.red("E: ".concat(message)));
    },
    warning: function (message) {
        console.log(chalk.yellow("W: ".concat(message)));
    },
    success: function (message) {
        console.log(chalk.green("S: ".concat(message)));
    },
    message: function (message) {
        console.log(message);
    }
};
export default Log;
