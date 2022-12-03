use std::env;
use std::fs;
fn get_char_score(common: String) -> usize {
    let alphabet: Vec<char> = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        .chars()
        .collect();

    return alphabet
        .iter()
        .position(|a| common.contains(&a.to_string()))
        .expect("ah");
}

fn part1(rucksacks: std::str::Split<&str>) -> usize {
    return rucksacks
        .map(|rucksack| {
            let (part1, part2) = rucksack.split_at(rucksack.len() / 2);

            let common: String = part1
                .chars()
                .filter(|c| part2.contains(&c.to_string()))
                .collect();

            return get_char_score(common);
        })
        .sum();
}

fn part2(rucksacks: std::str::Split<&str>) -> usize {
    return rucksacks
        .collect::<Vec<&str>>()
        .chunks(3)
        .into_iter()
        .map(|group| {
            let common: String = group[0]
                .chars()
                .filter(|c| {
                    return group[1].contains(&c.to_string()) && group[2].contains(&c.to_string());
                })
                .collect();

            return get_char_score(common);
        })
        .sum();
}

fn main() {
    let part = env::var("part").unwrap_or("part1".to_string());

    let input = fs::read_to_string("input.txt").expect("unable to read file");
    let rucksacks = input.split("\n");

    let result: usize = match &*part {
        "part2" => part2(rucksacks),
        _ => part1(rucksacks),
    };

    println!("{result}");
}
