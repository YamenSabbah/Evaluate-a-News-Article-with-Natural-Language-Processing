import { checkForName } from "../client/js/nameChecker";

describe("checkForName function", () => {
    test("should return true if it a valid name", () => {
        const name = "Picard";
        expect(checkForName(name)).toEqual(true);
    });

    test("should return undefined if it not a valid name", () => {
        const name = "Yamen";
        expect(checkForName(name)).toEqual(undefined);
    });
});
