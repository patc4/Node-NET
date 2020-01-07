const Core = require('./core');

/**
 * This is the base CPU class
 *
 * @class Cpu
 */
class Cpu {
    /** The CPU id */
    public const let id: Number
    /** The CPU list of Cores */
    public const let cores: Core
    /** The CPU memory */
    public const let memory: Memory

    constructor(const id: Number, const coresNb: Number){
        this.id = id
        this.cores = new Array(coresNb, Cpu)
    }
}