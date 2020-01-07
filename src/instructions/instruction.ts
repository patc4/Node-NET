import { Log } from './log';
import { InstructionParameters } from './instructionParameters';

export abstract class Instruction {
    public params: InstructionParameters;

    abstract run(): Array<Log>;
}