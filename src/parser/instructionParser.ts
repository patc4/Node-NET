import { Instruction } from '../instructions/instruction';
const _ = require('../instructions/instructions');

export class InstructionParser {
    public parse(input: String): Instruction {
        let inputList = input.split(' ');
        const instantiation: string = `new _.${this.capitalizeFLetter(inputList[0])}()`;
        console.log(instantiation);
        const instruction: Instruction = eval(instantiation) as Instruction;
        instruction.params = inputList.slice(1, 4)

        return instruction;
    }

    private capitalizeFLetter(string: String): String {
        return `${string[0].toUpperCase()}${string.slice(1)}`;
    }
}