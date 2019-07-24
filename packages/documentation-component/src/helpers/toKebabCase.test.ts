import { toKebabCase } from "./toKebabCase";

describe("toKebabCase", () => {
  test("should work with `lorem ipsum BIG-letter @!#$% something`", () => {
    const testString = "lorem ipsum BIG-letter @!#$% something";
    const ret = "lorem-ipsum-big-letter-something";
    expect(ret).toEqual(toKebabCase(testString));
  });
});
