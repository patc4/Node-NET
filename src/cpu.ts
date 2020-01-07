/**
 * This is the base CPU class
 *
 * @class Cpu
 */
class Cpu {
    /** The CPU id */
    public id: Number;
    /** The CPU list of Cores */
    public cores: Array<Core>;
    /** The CPU memory */
    public memory: Memory;

    constructor(id: Number, coresNb: Number){
        this.id = id
        this.cores = new Array(coresNb, new Core)
    }
}