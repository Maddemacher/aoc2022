use std::env;
use std::fs;

fn main() {
    let text = fs::read_to_string("input.txt").expect("Unable to read file");

    let mut elves = Vec::new();

    for text_elf in text.split("\n\n") {
        let text_calories = text_elf.split("\n");
        let mut total = 0;

        for text_calory in text_calories {
            let value: i32 = text_calory.parse().unwrap();
            total += value;
        }

        elves.push(total)
    }

    elves.sort();
    elves.reverse();

    let result: i32;
    let part = env::var("part").unwrap();

    if part == "part1" {
        result = elves[2]
    } else {
        result = elves[0] + elves[1] + elves[2];
    }

    println!("{result}");
}
