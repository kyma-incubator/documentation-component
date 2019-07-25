import { runPlugins } from "./plugins";

describe("asd", () => {
  test("should ", () => {
    const data = runPlugins([
      {
        source: {
          type: "test",
          rawContent: "testData",
        },
      },
    ]);
    expect(data).toEqual(1);
  });
});
