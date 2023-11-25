import {assert, describe, it} from "vitest";
import {inverseNumber} from "../number.util";

describe("inverseNumber", () => {
  it("should return 0 when input is 0", () => {
    const result = inverseNumber(0);
    assert.equal(result, 0);
  });

  it("should return the inverse of positive numbers", () => {
    const result = inverseNumber(5);
    assert.equal(result, -5);
  });

  it("should return the inverse of negative numbers", () => {
    const result = inverseNumber(-8);
    assert.equal(result, 8);
  });
});