import chalk from "chalk";

const Log = {
    error(message: string) {
        console.log(chalk.red(`E: ${message}`));
    },
    warning(message: string) {
        console.log(chalk.yellow(`W: ${message}`));
    },
    success(message: string) {
        console.log(chalk.green(`S: ${message}`));
    },
    message(message: unknown) {
        console.log(message);
    }
}

export default Log