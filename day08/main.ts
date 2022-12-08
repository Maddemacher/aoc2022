import { orderBy, takeWhile } from 'https://cdn.skypack.dev/lodash-es@4.17.21';

type Matrix = number[][];

interface Coordinate {
  x: number;
  y: number;
}

interface ScoredTree {
  tree: Coordinate;
  score: number;
}

export function isVisibleFromLeft(tree: Coordinate, trees: Matrix): boolean {
  return getVisibleToLeft(tree, trees).length === tree.x
}

export function getVisibleToLeft(tree: Coordinate, trees: Matrix): number[] {
  const height = trees[tree.y][tree.x];
  const affectedTrees = trees[tree.y].slice(0, tree.x).reverse();

  return takeWhile(affectedTrees, (t: number) => t < height);
}

export function isVisibleFromRight(tree: Coordinate, trees: Matrix): boolean {
  return getVisibleToRight(tree, trees).length === trees[0].length - tree.x - 1
}

export function getVisibleToRight(tree: Coordinate, trees: Matrix): number[] {
  const height = trees[tree.y][tree.x];
  const affectedTrees = trees[tree.y].slice(tree.x + 1);

  return takeWhile(affectedTrees, (t: number) => t < height);
}

export function isVisibleFromTop(tree: Coordinate, trees: Matrix): boolean {
  return getVisibleToTop(tree, trees).length === tree.y
}

export function getVisibleToTop(tree: Coordinate, trees: Matrix): number[] {
  const height = trees[tree.y][tree.x];
  const affectedTrees = trees.map(row => row[tree.x]).slice(0, tree.y);

  return takeWhile(affectedTrees.reverse(), (t: number) => t < height);
}

export function isVisibleFromBottom(tree: Coordinate, trees: Matrix): boolean {
  return getVisibleToBottom(tree, trees).length === trees.length - tree.y - 1
}

export function getVisibleToBottom(tree: Coordinate, trees: Matrix): number[] {
  const height = trees[tree.y][tree.x];
  const affectedTrees = trees.map(row => row[tree.x]).slice(tree.y + 1);

  return takeWhile(affectedTrees, (t: number) => t < height);
}

function isVisible(tree: Coordinate, trees: Matrix): boolean {
  const visible = isVisibleFromLeft(tree, trees) ||
    isVisibleFromRight(tree, trees) ||
    isVisibleFromTop(tree, trees) ||
    isVisibleFromBottom(tree, trees)

  return visible
}

export function getScenicScore(tree: Coordinate, trees: Matrix): ScoredTree {
  const scores = {
    top: getVisibleToTop(tree, trees).length,
    left: getVisibleToLeft(tree, trees).length,
    bottom: getVisibleToBottom(tree, trees).length,
    right: getVisibleToRight(tree, trees).length,
  }

  if (tree.x !== 0 && scores.left < tree.x) {
    scores.left = scores.left + 1;
  }

  if (tree.x !== trees[tree.y].length - 1 && scores.right < trees[tree.y].length - tree.x - 1) {
    scores.right = scores.right + 1;
  }

  if (tree.y !== 0 && scores.top < tree.y) {
    scores.top = scores.top + 1;
  }

  if (tree.y !== trees.length - 1 && scores.bottom < trees.length - tree.y - 1) {
    scores.bottom = scores.bottom + 1;
  }

  const score = Object.values(scores).reduce((acc, curr) => acc * curr, 1)

  return {
    tree,
    score
  }
}

function doPartOne(trees: Matrix) {
  let visibleTrees = 0;

  trees.forEach((row, y) => {
    row.forEach((_, x) => {
      if (isVisible({ x, y }, trees)) {
        visibleTrees = visibleTrees + 1
      }
    })
  })
  console.log(visibleTrees)
}

function doPartTwo(trees: Matrix) {
  const scores = trees.map((row, y) => {
    return row.map((_, x) => getScenicScore({ x, y }, trees))
  }).flat()

  const max = orderBy(scores, (s: ScoredTree) => s.score, "desc")[0]
  console.log(max)
}

export async function main(part?: string) {
  const raw = await Deno.readTextFile("./input.txt");

  const rawRows = raw.split("\n");
  const trees: Matrix = [
    ...rawRows.map(row => [...row].map((d) => parseInt(d)))
  ];

  if (part === "part2") {
    doPartTwo(trees)
  } else {
    doPartOne(trees)
  }
}

if (import.meta.main) {
  main(Deno.env.get("part"));
}