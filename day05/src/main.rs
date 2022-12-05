use std::env;
use std::fs;

fn main() {
    let mut start = vec![
        vec!['R', 'S', 'L', 'F', 'Q'],
        vec!['N', 'Z', 'Q', 'G', 'P', 'T'],
        vec!['S', 'M', 'Q', 'B'],
        vec!['T', 'G', 'Z', 'J', 'H', 'C', 'B', 'Q'],
        vec!['P', 'H', 'M', 'B', 'N', 'F', 'S'],
        vec!['P', 'C', 'Q', 'N', 'S', 'L', 'V', 'G'],
        vec!['W', 'C', 'F'],
        vec!['Q', 'H', 'G', 'Z', 'W', 'V', 'P', 'M'],
        vec!['G', 'Z', 'D', 'L', 'C', 'N', 'R'],
    ];

    let part = env::var("part").unwrap_or("part1".to_string());

    let moves: Vec<(usize, usize, usize)> = fs::read_to_string("input.txt")
        .expect("unable to read file")
        .split("\n")
        .map(|row| {
            let a: Vec<usize> = row
                .split(',')
                .map(|i| i.parse::<usize>().unwrap())
                .collect();

            return (a[0], a[1] - 1, a[2] - 1);
        })
        .collect();

    match &*part {
        "part2" => part_two(&mut start, moves),
        _ => part_one(&mut start, moves),
    }

    let answer: String = start
        .iter()
        .map(|e| e.last().unwrap().to_string())
        .collect();

    print!("{answer}")
}

fn part_one(start: &mut Vec<Vec<char>>, moves: Vec<(usize, usize, usize)>) {
    for (count, from, to) in moves {
        let len = start[from].len();
        let store = start[from].split_off(len - count);

        start[to].extend(store.iter().rev())
    }
}

fn part_two(start: &mut Vec<Vec<char>>, moves: Vec<(usize, usize, usize)>) {
    for (count, from, to) in moves {
        let len = start[from].len();
        let store = start[from].split_off(len - count);

        start[to].extend(store)
    }
}
