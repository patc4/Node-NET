import { Instruction } from '../instructions/instruction';
import { ParserReturn } from './parserReturn';
const _ = require('../instructions/instructions');

export class InstructionParser {
    public parse(input: String): ParserReturn {

        let inputList = input.split(' ');
        const instantiation: string = `new _.${this.capitalizeFLetter(inputList[0])}()`;
        let instruction: Instruction;

        try {
            instruction = eval(instantiation) as Instruction;
        } catch (err) {
            if (err.name === 'TypeError') {
                return new ParserReturn(null, new Error("Command not found"))
            }
        }


        instruction.params = inputList.slice(1, 4)
        return new ParserReturn(instruction);
    }

    private capitalizeFLetter(string: String): String {
        return `${string[0].toUpperCase()}${string.slice(1)}`;
    }
}