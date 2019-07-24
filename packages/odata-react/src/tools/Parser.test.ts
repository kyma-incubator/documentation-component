import { deepSearch } from "./Parser";

describe("deepSearch", () => {
  test("should work on easy example", () => {
    const obj = { a: { b: { c: { d: "test" } } } };
    const testData = deepSearch(obj, "c", (k, v) => k === "c");
    const expectedReturn = { c: { d: "test" } };
    expect(testData).toEqual(expectedReturn);
  });
});
