use std::env;
use std::fs;

fn find_marker(input: &str, count: usize) -> usize {
    for n in count..input.len() {
        let (first, _) = input.split_at(n);
        let (_, asd) = first.split_at(n - count);

        let mut vec = Vec::from(asd);
        vec.sort();
        vec.dedup();

        if vec.len() == count {
            return n;
        }
    }

    panic!("Couldnt find a start")
}

fn main() {
    let part = env::var("part").unwrap_or("part1".to_string());

    let message = fs::read_to_string("input.txt").expect("unable to read file");

    let index = match &*part {
        "part2" => find_marker(&*message, 14),
        _ => find_marker(&*message, 4),
    };

    println!("{index}");
}
