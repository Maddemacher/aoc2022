use std::env;
use std::fs;
// ROCK     X A
// PAPER    Y B
// SCISSOR  Z C

// X -> loss
// Y -> draw
// Z -> win

#[test]
fn test_score_game() {
    assert_eq!(score_game("A", "Y"), 8);
    assert_eq!(score_game("B", "X"), 1);
    assert_eq!(score_game("C", "Z"), 6);
}

#[test]
fn test_get_scored_game() {
    assert_eq!(get_scored_outcome("A", "Y"), 4);
    assert_eq!(get_scored_outcome("B", "X"), 1);
    assert_eq!(get_scored_outcome("C", "Z"), 7);
}

fn get_scored_outcome(opponent: &str, outcome: &str) -> i32 {
    let a = match (opponent, outcome) {
        ("A", "X") => "Z", // ROCK loss
        ("B", "X") => "X", // PAPER loss
        ("C", "X") => "Y", // SCISS loss
        ("A", "Y") => "X", // ROCK draw
        ("B", "Y") => "Y", // Paper draw
        ("C", "Y") => "Z", // sciss draw
        ("A", "Z") => "Y", // rock win
        ("B", "Z") => "Z", // paper win
        ("C", "Z") => "X", // sciss win
        _ => panic!("hej"),
    };

    return get_my_score(a) + get_outcome_score(opponent, a);
}

fn score_game(opponent: &str, me: &str) -> i32 {
    return get_my_score(me) + get_outcome_score(opponent, me);
}

fn get_outcome_score(opponent: &str, me: &str) -> i32 {
    return match (opponent, me) {
        ("A", "X") => 3,
        ("B", "X") => 0,
        ("C", "X") => 6,
        ("A", "Y") => 6,
        ("B", "Y") => 3,
        ("C", "Y") => 0,
        ("A", "Z") => 0,
        ("B", "Z") => 6,
        ("C", "Z") => 3,
        _ => panic!("Unknown game"),
    };
}

fn get_my_score(me: &str) -> i32 {
    return match me {
        "X" => 1,
        "Y" => 2,
        "Z" => 3,
        _ => panic!("Unknown move"),
    };
}

fn main() {
    let part = env::var("part").unwrap_or("part1".to_string());

    let final_score = fs::read_to_string("input.txt")
        .expect("unable to read input file")
        .split("\n")
        .map(|game| {
            let b: Vec<&str> = game.split(" ").collect();

            return match &*part {
                "part2" => get_scored_outcome(b[0], b[1]),
                _ => score_game(b[0], b[1]),
            };
        })
        .fold(0, |a, b| a + b);

    println!("{final_score}");
}
