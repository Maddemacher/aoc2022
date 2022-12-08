import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { getVisibleToLeft, getVisibleToRight, isVisibleFromBottom, isVisibleFromLeft, isVisibleFromRight, isVisibleFromTop, main } from "./main.ts";

Deno.test(function isVisibleFromLeftTest() {
  assertEquals(isVisibleFromLeft({ y: 0, x: 2 }, [[1, 2, 3, 4]]), true)
  assertEquals(isVisibleFromLeft({ y: 0, x: 2 }, [[1, 2, 2, 4]]), false)
  assertEquals(isVisibleFromLeft({ y: 0, x: 2 }, [[1, 2, 1, 4]]), false)
  assertEquals(isVisibleFromLeft({ y: 0, x: 2 }, [[2, 2, 1, 4]]), false)
  assertEquals(isVisibleFromLeft({ y: 0, x: 2 }, [[0, 0, 1, 4]]), true)
  assertEquals(isVisibleFromLeft({ y: 0, x: 0 }, [[1, 2, 2, 4]]), true)
})

Deno.test(function isVisibleFromRightTest() {
  assertEquals(isVisibleFromRight({ y: 0, x: 1 }, [[4, 3, 2, 1]]), true)
  assertEquals(isVisibleFromRight({ y: 0, x: 1 }, [[4, 2, 2, 1]]), false)
  assertEquals(isVisibleFromRight({ y: 0, x: 1 }, [[4, 1, 2, 1]]), false)
  assertEquals(isVisibleFromRight({ y: 0, x: 1 }, [[4, 0, 1, 4]]), false)
  assertEquals(isVisibleFromRight({ y: 0, x: 3 }, [[4, 2, 2, 1]]), true)
})

Deno.test(function isVisibleFromTopTest() {
  assertEquals(isVisibleFromTop({ y: 2, x: 1 }, [[0, 1], [0, 2], [0, 3], [0, 4]]), true)
  assertEquals(isVisibleFromTop({ y: 2, x: 1 }, [[0, 1], [0, 2], [0, 2], [0, 4]]), false)
  assertEquals(isVisibleFromTop({ y: 0, x: 1 }, [[0, 1], [0, 2], [0, 2], [0, 4]]), true)
})

Deno.test(function isVisibleFromBottomTest() {
  assertEquals(isVisibleFromBottom({ y: 1, x: 1 }, [[0, 4], [0, 3], [0, 2], [0, 1]]), true)
  assertEquals(isVisibleFromBottom({ y: 1, x: 1 }, [[0, 4], [0, 2], [0, 2], [0, 1]]), false)
  assertEquals(isVisibleFromBottom({ y: 3, x: 1 }, [[0, 4], [0, 2], [0, 2], [0, 1]]), true)
})

Deno.test(function getVisibleToLeftTest() {
  assertEquals(getVisibleToLeft({ y: 0, x: 2 }, [[1, 2, 3, 4]]), [2, 1])
  assertEquals(getVisibleToLeft({ y: 0, x: 2 }, [[1, 2, 2, 4]]), [2])
  assertEquals(getVisibleToLeft({ y: 0, x: 0 }, [[1, 2, 2, 4]]), [])
})

Deno.test(function getVisibleToRightTest() {
  assertEquals(getVisibleToRight({ y: 0, x: 1 }, [[4, 3, 2, 1]]), [2, 1])
  assertEquals(getVisibleToRight({ y: 0, x: 1 }, [[4, 2, 2, 1]]), [])
  assertEquals(getVisibleToRight({ y: 0, x: 3 }, [[4, 2, 2, 1]]), [])
})

Deno.test(async function partOneTest() {
  await main("part1");
})

Deno.test(async function partTwo() {
  await main("part2");
})



