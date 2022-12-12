type Type = "addx" | "noop" | "void"

interface Monkey {
  items: number[];
  operation: (item: number) => number;
  test: (item: number) => boolean;
  outcomes: {
    truthy: (item: number, monkeys: Monkey[]) => void;
    falsy: (item: number, monkeys: Monkey[]) => void;
  };
  inspected: number;
}

interface Operations {
  [key: string]: (first: number, second: number) => number;
}

const operations: Operations = {
  "+": (first: number, second: number) => first + second,
  "-": (first: number, second: number) => first - second,
  "*": (first: number, second: number) => first * second,
  "/": (first: number, second: number) => first / second,
}

function parseItems(rawItems: string): number[] {
  const items = rawItems.replace("  Starting items: ", "").split(", ")
  return items.map(i => parseInt(i))
}

function parseOperation(rawOperation: string): (item: number) => number {
  const [pre, operation, post] = rawOperation.replace("  Operation: new = ", "").split(" ")

  return (item: number) => operations[operation](pre === "old" ? item : parseInt(pre), post === "old" ? item : parseInt(post))
}

function parseTest(rawTest: string): (item: number) => boolean {
  const parts = rawTest.split(" ")
  const mod = parseInt(parts[parts.length - 1]);

  return (item: number) => item % mod === 0;
}

function parseMovement(rawMovement: string): (item: number, monkeys: Monkey[]) => void {
  const parts = rawMovement.split(" ")
  const monkey = parseInt(parts[parts.length - 1]);

  return (item: number, monkeys: Monkey[]) => {
    monkeys[monkey].items.push(item);
  }
}



function parseInput(): Monkey[] {
  return Deno.readTextFileSync("./test.txt").split("\n\n").map(monkeyBlock => {
    const [_, rawItems, rawOperation, rawTest, rawTruthy, rawFalsy] = monkeyBlock.split("\n");

    return {
      items: parseItems(rawItems),
      operation: parseOperation(rawOperation),
      test: parseTest(rawTest),
      outcomes: {
        truthy: parseMovement(rawTruthy),
        falsy: parseMovement(rawFalsy),
      },
      inspected: 0,
    };
  });
}

function doPartOne(monkeys: Monkey[]) {
  for (let turn = 0; turn < 20; turn++) {
    monkeys.forEach(monkey => {
      monkey.inspected = monkey.inspected + monkey.items.length;

      monkey.items = monkey.items.map(item => monkey.operation(item));
      monkey.items = monkey.items.map(item => Math.floor(item / 3));

      const truthy = monkey.items.filter(i => monkey.test(i) === true);
      const falsy = monkey.items.filter(i => monkey.test(i) === false);

      truthy.map(i => monkey.outcomes.truthy(i, monkeys));
      falsy.map(i => monkey.outcomes.falsy(i, monkeys));

      monkey.items = [];
    })
  }
  const [a, b] = monkeys.map(m => m.inspected).sort((a: number, b: number) => {
    if (a > b) {
      return -1;
    }
    if (b == a) {
      return 0
    }
    return 1
  })

  console.log(a * b)
}

function doPartTwo(monkeys: Monkey[]) {
  for (let turn = 0; turn < 20; turn++) {
    monkeys.forEach(monkey => {
      monkey.inspected = monkey.inspected + monkey.items.length;

      monkey.items = monkey.items.map(item => monkey.operation(item));

      const truthy = monkey.items.filter(i => monkey.test(i) === true);
      const falsy = monkey.items.filter(i => monkey.test(i) === false);

      truthy.map(i => monkey.outcomes.truthy(i, monkeys));
      falsy.map(i => monkey.outcomes.falsy(i, monkeys));

      monkey.items = [];
    })
  }
  const sorted = monkeys.map(m => m.inspected)
  // .sort((a: number, b: number) => {
  //   if (a > b) {
  //     return -1;
  //   }
  //   if (b == a) {
  //     return 0
  //   }
  //   return 1
  // })

  console.log(sorted)
}


export function main(part: string) {
  const monkeys = parseInput();

  if (part === "part1") {
    doPartOne(monkeys);
  } else {
    doPartTwo(monkeys);
  }
}

if (import.meta.main) {
  main(Deno.env.get("part") ?? "part1");
}


