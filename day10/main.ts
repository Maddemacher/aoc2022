type Type = "addx" | "noop" | "void"

interface Instruction {
  type: Type,
  value?: number;
}

function getInstructions(): Instruction[] {
  return Deno.readTextFileSync("./input.txt").split("\n").map(row => {
    const [type, value] = row.split(" ");

    return {
      type: type as Type,
      value: value ? parseInt(value) : undefined
    };
  });
}

function addVoids(instructions: Instruction[]): Instruction[] {
  const finalInstructions: Instruction[] = [];

  instructions.forEach(instruction => {
    if (instruction.type === "addx") {
      finalInstructions.push({ type: "void" })
      finalInstructions.push(instruction)
      return;
    }

    if (instruction.type === "noop") {
      finalInstructions.push(instruction)
      return;
    }

    throw new Error("unknown instruciont type: " + instruction.type)
  });

  return finalInstructions;
}

function getSignalStrength(cycle: number, instructions: Instruction[]): number {
  return instructions.slice(0, cycle - 1).reduce((acc, instruction) => {
    if (instruction.type === "addx") {
      return acc + (instruction.value ?? 0)
    }

    return acc;
  }, 1) * cycle;
}

function doPartOne(instructions: Instruction[]) {
  const instructionsToProcess = addVoids(instructions)
  const signalStrengths = [20, 60, 100, 140, 180, 220].map(cycle => getSignalStrength(cycle, instructionsToProcess))


  console.log(signalStrengths.reduce((acc, val) => acc + val), 0)
}


export function main(part: string) {
  const instructions = getInstructions();

  if (part === "part1") {
    doPartOne(instructions);
  } else {
    // doPartTwo(instructions);
  }
}

if (import.meta.main) {
  main(Deno.env.get("part") ?? "part1");
}


