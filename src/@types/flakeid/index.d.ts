import { generateKeyPair } from 'crypto'

declare module 'flakeid' {
    export default class Flake {
        constructor()
        public gen(): string
    }
}
