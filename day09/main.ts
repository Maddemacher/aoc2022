import { cloneDeep, isEqual, uniqBy } from 'https://cdn.skypack.dev/lodash-es@4.17.21';

type Direction = "R" | "L" | "U" | "D";

interface Coordinate {
  x: number;
  y: number;
}

interface Instruction {
  direction: Direction;
  movements: number;
}

interface Rope {
  headPosition: Coordinate;
  tailPosition: Coordinate;
}

interface LongRope {
  positions: Coordinate[];
}


async function getInstructions(): Promise<Instruction[]> {
  const raw = await Deno.readTextFile("./input.txt");
  const rows = raw.split("\n");

  return rows.map(r => {
    const [direction, movements] = r.split(" ");

    return {
      direction: direction as Direction,
      movements: parseInt(movements)
    };
  }) as Instruction[];
}

export function shouldMoveTail(head: Coordinate, tail: Coordinate): boolean {
  return Math.sqrt(Math.pow(tail.x - head.x, 2) + Math.pow(tail.y - head.y, 2)) > Math.sqrt(2);
}

function getUpdatedRope(direction: Direction, rope: Rope): Rope {
  const head: Coordinate = { x: rope.headPosition.x, y: rope.headPosition.y }
  const tail: Coordinate = { x: rope.tailPosition.x, y: rope.tailPosition.y }

  switch (direction) {
    case "L":
      head.x = head.x - 1;
      break;
    case "R":
      head.x = head.x + 1;
      break;
    case "U":
      head.y = head.y - 1;
      break;
    case "D":
      head.y = head.y + 1;
      break;
  }

  if (shouldMoveTail(head, tail)) {
    tail.x = rope.headPosition.x;
    tail.y = rope.headPosition.y
  }

  return {
    headPosition: head,
    tailPosition: tail
  }
}

function getUpdatedLongRope(direction: Direction, rope: LongRope): LongRope {
  const positions = cloneDeep(rope.positions)

  switch (direction) {
    case "L":
      positions[0].x = positions[0].x - 1;
      break;
    case "R":
      positions[0].x = positions[0].x + 1;
      break;
    case "U":
      positions[0].y = positions[0].y - 1;
      break;
    case "D":
      positions[0].y = positions[0].y + 1;
      break;
  }

  for (let i = 0; i < positions.length - 1; i++) {
    if (shouldMoveTail(positions[i], positions[i + 1])) {
      console.log("moving", { i })
      positions[i + 1].x = rope.positions[i].x;
      positions[i + 1].y = rope.positions[i].y;
    }
  }

  return {
    positions
  }
}


function doPartOne(instructions: Instruction[]) {
  const tailPositions: Coordinate[] = [{ x: 0, y: 0 }];
  let rope: Rope = {
    headPosition: { x: 0, y: 0 },
    tailPosition: { x: 0, y: 0 }
  }

  instructions.forEach(instruction => {
    Array.from({ length: instruction.movements }).forEach(() => {
      const updatedRope: Rope = getUpdatedRope(instruction.direction, rope);

      if (isEqual(rope.tailPosition, updatedRope.tailPosition) === false) {
        tailPositions.push({ ...updatedRope.tailPosition })
      }

      rope = updatedRope;
    })
  })

  console.log(uniqBy(tailPositions, (p: Coordinate) => `x${p.x}y${p.y}`).length)
}


function doPartTwo(instructions: Instruction[]) {
  const tailPositions: Coordinate[] = [{ x: 0, y: 0 }];
  let rope: LongRope = {
    positions: Array.from({ length: 10 }).map(() => ({ x: 0, y: 0 }))
  }

  instructions.forEach(instruction => {
    Array.from({ length: instruction.movements }).forEach(() => {
      const updatedRope: LongRope = getUpdatedLongRope(instruction.direction, rope);

      if (isEqual(rope.positions[-1], updatedRope.positions[-1]) === false) {
        tailPositions.push({ ...updatedRope.positions[-1] })
      }

      rope = updatedRope;
    })
  })

  console.log(uniqBy(tailPositions, (p: Coordinate) => `x${p.x}y${p.y}`).length)

}

export async function main(part: string) {
  const instructions = await getInstructions();


  if (part === "part1") {
    doPartOne(instructions);
  } else {
    doPartTwo(instructions);
  }
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  main(Deno.env.get("part") ?? "part1");
}

