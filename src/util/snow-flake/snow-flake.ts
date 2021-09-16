import flakeId from 'flakeid'

export class IdGenerator {
    private flake: flakeId

    private static _Instance: IdGenerator

    static get Instance(): IdGenerator {
        if (!IdGenerator._Instance) {
            IdGenerator._Instance = new IdGenerator()
        }
        return IdGenerator._Instance
    }

    static set Instance(logger: IdGenerator) {
        throw new Error('You are not allowed to set logger to static instance.')
    }

    private constructor() {
        this.flake = new flakeId()
    }

    getID(): bigint {
        return BigInt(this.flake.gen())
    }

    getIDString(): string {
        return this.flake.gen()
    }
}
