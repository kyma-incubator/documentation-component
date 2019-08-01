import { replaceAllLessThanChars } from "./replaceAllLessThanChars";
describe("replaceAllLessThanChars", () => {
  const lessThanChar = "&#60;";
  test("should not alter string without '<' character", () => {
    const codeBlock = `
    \`\`\`
    code
    \`\`\``;
    const ans = replaceAllLessThanChars(codeBlock);
    const correct = codeBlock;
    expect(ans).toStrictEqual(correct);
  });
  test(`should alter '<' to '${lessThanChar}'`, () => {
    const codeBlock = `
    \`\`\`
    code<code
    \`\`\``;
    const ans = replaceAllLessThanChars(codeBlock);
    const correct = `
    \`\`\`
    code${lessThanChar}code
    \`\`\``;
    expect(ans).toStrictEqual(correct);
  });
  test(`should alter '<' to '${lessThanChar}' in multiple occurences`, () => {
    const codeBlock = `
    \`\`\`
    code<<<code
    \`\`\``;
    const ans = replaceAllLessThanChars(codeBlock);
    const correct = `
    \`\`\`
    code${lessThanChar}${lessThanChar}${lessThanChar}code
    \`\`\``;
    expect(ans).toStrictEqual(correct);
  });
  test(`should alter '<' to '${lessThanChar}' in multiple occurences`, () => {
    const codeBlock = `
    \`\`\`
    code<<<code
    \`\`\``;
    const ans = replaceAllLessThanChars(codeBlock);
    const correct = `
    \`\`\`
    code${lessThanChar}${lessThanChar}${lessThanChar}code
    \`\`\``;
    expect(ans).toStrictEqual(correct);
  });

  test(`should work in multiple codeblocks in one `, () => {
    const codeBlock = `
    \`\`\`
    <
    \`\`\`
    
    \`\`\`
    < TADA!
    \`\`\`
    `;
    const ans = replaceAllLessThanChars(codeBlock);
    const correct = `
    \`\`\`
    ${lessThanChar}
    \`\`\`
    
    \`\`\`
    ${lessThanChar} TADA!
    \`\`\`
    `;
    expect(ans).toStrictEqual(correct);
  });
});
