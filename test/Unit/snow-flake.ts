import { IdGenerator } from '../../src/util/snow-flake/snow-flake'

describe('Id generator unit tests', () => {
    test('Should Make clean id with snow flake method', () => {
        const id = IdGenerator.Instance.getID()
        console.log("ID :" , id)
        expect(typeof(id)).toEqual("bigint");
    });
    test('Should Make clean string id with snow flake method', () => {
        const id = IdGenerator.Instance.getIDString()
        console.log("String ID :" , id)
        expect(typeof(id)).toEqual("string");
    });
});
