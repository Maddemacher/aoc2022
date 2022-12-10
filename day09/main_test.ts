import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { shouldMoveTail } from "./main.ts";

Deno.test(function shouldMoveTailRightTest() {
  assertEquals(shouldMoveTail({ x: 0, y: 0 }, { x: 0, y: 0 }), false);
  assertEquals(shouldMoveTail({ x: 1, y: 0 }, { x: 0, y: 0 }), true);
  assertEquals(shouldMoveTail({ x: -1, y: 0 }, { x: 0, y: 0 }), false);
  assertEquals(shouldMoveTail({ x: 0, y: 1 }, { x: 0, y: 0 }), false);
  assertEquals(shouldMoveTail({ x: 1, y: 1 }, { x: 0, y: 0 }), true);
  assertEquals(shouldMoveTail({ x: -1, y: 1 }, { x: 0, y: 0 }), false);
  assertEquals(shouldMoveTail({ x: 0, y: -1 }, { x: 0, y: 0 }), false);
  assertEquals(shouldMoveTail({ x: 1, y: -1 }, { x: 0, y: 0 }), true);
  assertEquals(shouldMoveTail({ x: -1, y: -1 }, { x: 0, y: 0 }), false);
});
