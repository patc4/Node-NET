import { Instruction } from '../instructions/instruction';

export class ParserReturn {
    public error: Error
    public instruction: Instruction

    constructor(instruction: Instruction = null, error: Error = null) {
        this.error = error;
        this.instruction = instruction;
    }
}