import { Instruction } from './instruction';
import { Log } from './log';
import { LogType } from './logType';

class Push extends Instruction {
    run(): Array<Log> {
        return [new Log(this.params.join(' '), LogType.LOG)];
    }
}

export {Push} 