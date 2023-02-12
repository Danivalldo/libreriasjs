import { helloFoo } from "../src/helloFoo";

test("should return Hello BAR", () => {
  expect(helloFoo()).toBe("Hello BAR");
});
