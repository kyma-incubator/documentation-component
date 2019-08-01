import { deepSearch } from "./Parser";

describe("deepSearch", () => {
  describe("Basic test cases", () => {
    test("should work 'small' object", () => {
      const testData = deepSearch(
        { a: { test: "testData" } },
        "test",
        (_, val) => true,
      );

      const expectedReturn = { test: "testData" };
      expect(testData).toEqual(expectedReturn);
    });
    test("should work with deep example", () => {
      const obj = { a: { b: { c: { d: "test" } } } };
      const testData = deepSearch(obj, "c", (key, val) => key === "c");
      const expectedReturn = { c: { d: "test" } };
      expect(testData).toEqual(expectedReturn);
    });
    test("should work with wide example", () => {
      const obj: Record<string, any> = {};
      ["a", "b", "c", "d", "e", "f", "g"].forEach(elem => {
        obj[elem] = elem;
      });

      const testData = deepSearch(obj, "c", (key, val) => key === "c");

      const expectedReturn = obj;
      expect(testData).toEqual(expectedReturn);
    });
  });
  describe("Advanced test cases", () => {
    const keyVal = "Schema";
    const key = "name";
    const testObj1 = {
      test: {
        deep: { deeper: { data: "something", name: keyVal } },
        name: keyVal,
      },
    };
    const testObj2: any = [
      {},
      { test: "test" },
      [{ test: { [key]: keyVal, data: "randomData" } }],
    ];

    const testObj3: any = [
      { data: "data" },
      { [key]: keyVal, additional: "something" },
      { [key]: keyVal },
    ];

    test("should work with data resembling OData schema", () => {
      const testData = deepSearch(testObj1, key, (_, val) => val === keyVal);
      const correct = testObj1.test;
      expect(testData).toEqual(correct);
    });
    test("should work with data resembling OData schema", () => {
      const testData = deepSearch(testObj1, key, (_, val) => val === keyVal);
      const correct = testObj1.test;
      expect(testData).toEqual(correct);
    });
    test("should work with arrays inside objects inside objects etc", () => {
      const testData = deepSearch(testObj2, key, (_, val) => val === keyVal);
      const correct = testObj2[2][0].test;
      expect(testData).toEqual(correct);
    });
    test("should get first encountered entry", () => {
      const testData = deepSearch(testObj3, key, (_, val) => val === keyVal);
      const correct = testObj3[1];
      expect(testData).toEqual(correct);
    });
  });
});
