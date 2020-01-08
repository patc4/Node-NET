import { Instruction } from './instruction';
import { Log } from './log';
import { LogType } from './logType';

class Hw extends Instruction {
    run() {
        return [new Log("push test", LogType.LOG)]
    }
}

export {Hw}