import { LogType } from './logType';

export class Log {
    public value: String;
    public logType: LogType;

    constructor(value: String, logType: LogType) {
        this.value = value;
        this.logType = logType;
    }
}