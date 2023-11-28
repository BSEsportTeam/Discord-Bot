import { assert, describe, it } from "vitest";
import { stringifyNumber } from "$core/utils/function/number";

describe("stringifyNumber", () => {
  it("should return 1 000 000", () => {
    const result = stringifyNumber(1000000);
    assert.equal(result, "1 000 000");
  });

  it("should return 100", () => {
    const result = stringifyNumber(100);
    assert.equal(result, "100");
  });

  it("should return 0", () => {
    const result = stringifyNumber(0);
    assert.equal(result, "0");
  });

  it("should return -1 000 000", () => {
    const result = stringifyNumber(-1000000);
    assert.equal(result, "-1 000 000");
  });

  it("should return 100'000", () => {
    const result = stringifyNumber(100000, "'");
    assert.equal(result, "100'000");
  });
});