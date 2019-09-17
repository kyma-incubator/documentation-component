import { createElementClass, createModifierClass } from "./createBEMClass";
import { CLASS_NAME_PREFIX } from "../constants";

describe("createElementClass", () => {
  const phrase = "test";

  test("should work with non-empty string", () => {
    const toTestElementClass = createElementClass(phrase);
    const correct = `${CLASS_NAME_PREFIX}__${phrase}`;
    expect(toTestElementClass).toBe(correct);
  });
  test("should work with empty string", () => {
    const correct = "";
    const toTestElementClass = createElementClass("");
    expect(toTestElementClass).toBe(correct);
  });
});

describe("createModifierClass", () => {
  const modifier = "modifier";
  const element = "element";
  const emptyArg = "";

  test("should work with only modifier", () => {
    const toTestModifier = createModifierClass(modifier);
    const correct = `${CLASS_NAME_PREFIX}--${modifier}`;
    expect(toTestModifier).toBe(correct);
  });
  test("should work with modifier and element args", () => {
    const toTestModifier = createModifierClass(modifier, element);
    const correct = `${CLASS_NAME_PREFIX}__${element}--${modifier}`;
    expect(toTestModifier).toBe(correct);
  });
  test("should work with both falsy args", () => {
    const toTestModifier = createModifierClass(emptyArg);
    expect(toTestModifier).toBe(emptyArg);
  });
});
