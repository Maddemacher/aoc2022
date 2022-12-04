use std::env;
use std::fs;
use std::ops::RangeInclusive;

fn overlaps(a: &RangeInclusive<i32>, b: &RangeInclusive<i32>) -> bool {
    let a_contains_b = a.clone().all(|e| b.contains(&e));
    let b_contains_a = b.clone().all(|e| a.contains(&e));

    return a_contains_b || b_contains_a;
}

fn intersects(a: &RangeInclusive<i32>, b: &RangeInclusive<i32>) -> bool {
    let a_contains_b = a.clone().any(|e| b.contains(&e));
    let b_contains_a = b.clone().any(|e| a.contains(&e));

    return a_contains_b || b_contains_a;
}

fn main() {
    let part = env::var("part").unwrap_or("part1".to_string());

    let input = fs::read_to_string("input.txt")
        .expect("unable to read file")
        .split("\n")
        .map(|s| {
            let parts: Vec<&str> = s.split(",").collect();
            let range_a: Vec<&str> = parts[0].split("-").collect();
            let range_b: Vec<&str> = parts[1].split("-").collect();

            let a1 = range_a[0].parse::<i32>().unwrap();
            let a2 = range_a[1].parse::<i32>().unwrap();

            let b1 = range_b[0].parse::<i32>().unwrap();
            let b2 = range_b[1].parse::<i32>().unwrap();

            return (a1..=a2, b1..=b2);
        })
        .collect::<Vec<(RangeInclusive<i32>, RangeInclusive<i32>)>>();

    let result: usize = match &*part {
        "part2" => part2(input),
        _ => part1(input),
    };

    println!("{result}")
}

fn part1(ranges: Vec<(RangeInclusive<i32>, RangeInclusive<i32>)>) -> usize {
    return ranges.iter().filter(|(a, b)| overlaps(a, b)).count();
}

fn part2(ranges: Vec<(RangeInclusive<i32>, RangeInclusive<i32>)>) -> usize {
    return ranges.iter().filter(|(a, b)| intersects(a, b)).count();
}
