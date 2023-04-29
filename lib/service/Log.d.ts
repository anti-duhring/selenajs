declare const Log: {
    error(message: string): void;
    warning(message: string): void;
    success(message: string): void;
    message(message: unknown): void;
};
export default Log;
