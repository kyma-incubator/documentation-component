import { createElementClass, createModifierClass } from "./createBEMClass";

describe("createElementClass", () => {
  test("should 😎", () => {
    const common = "tststs";
    const toTestElementClass = createElementClass(common);
    const correct = `cms__${common}`;
    expect(correct).toBe(toTestElementClass);
  });
});

describe("createModifierClass", () => {
  test("should 🤩", () => {
    const common = "qwerty";
    const toTestModifier = createModifierClass(common);
    const correct = `cms--${common}`;
    expect(correct).toBe(toTestModifier);
  });
});
