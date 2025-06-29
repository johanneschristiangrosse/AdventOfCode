export async function loadPuzzles() {
  const puzzles = []
  const puzzleInfos = [
    // #########################
    // #     December 2024     #
    // #########################

    { year: 2024, day: 1, puzzle: 1 },
    { year: 2024, day: 1, puzzle: 2 },
    { year: 2024, day: 2, puzzle: 1 },
    { year: 2024, day: 2, puzzle: 2 },
    { year: 2024, day: 3, puzzle: 1 },
    { year: 2024, day: 3, puzzle: 2 },
    { year: 2024, day: 4, puzzle: 1 },
    { year: 2024, day: 4, puzzle: 2 },
    { year: 2024, day: 5, puzzle: 1 },
    { year: 2024, day: 5, puzzle: 2 },
    { year: 2024, day: 6, puzzle: 1 },
    { year: 2024, day: 6, puzzle: 2 },
    { year: 2024, day: 7, puzzle: 1 },
    { year: 2024, day: 7, puzzle: 2 },
    { year: 2024, day: 8, puzzle: 1 },
    { year: 2024, day: 8, puzzle: 2 },
    { year: 2024, day: 9, puzzle: 1 },
    { year: 2024, day: 9, puzzle: 2 },
    { year: 2024, day: 9, puzzle: 1 },
    { year: 2024, day: 9, puzzle: 2 },
    { year: 2024, day: 10, puzzle: 1 },
    { year: 2024, day: 10, puzzle: 2 },
    { year: 2024, day: 11, puzzle: 1 },
    { year: 2024, day: 11, puzzle: 2 },
    { year: 2024, day: 12, puzzle: 1 },
    { year: 2024, day: 12, puzzle: 2 },
    
    // #########################
    // #     December 2015     #
    // #########################
    
    { year: 2015, day: 1, puzzle: 1 },
    { year: 2015, day: 1, puzzle: 2 },
    { year: 2015, day: 2, puzzle: 1 },
    { year: 2015, day: 2, puzzle: 2 },
    { year: 2015, day: 3, puzzle: 1 },
    { year: 2015, day: 3, puzzle: 2 },
    { year: 2015, day: 4, puzzle: 1 },
    { year: 2015, day: 4, puzzle: 2 },
    { year: 2015, day: 5, puzzle: 1 },
    { year: 2015, day: 5, puzzle: 2 },
    { year: 2015, day: 6, puzzle: 1 },
    { year: 2015, day: 6, puzzle: 2 },
    { year: 2015, day: 7, puzzle: 1 },
    { year: 2015, day: 7, puzzle: 2 },
    { year: 2015, day: 8, puzzle: 1 },
  ]

  for (let index = 0; index < puzzleInfos.length; index++) {
    const info = puzzleInfos[index]
    const name = `day_${info.year}_12_${info.day.toString().padStart(2, '0')}_puzzle_${info.puzzle}`
    const { execute } = await import(`./${name}.js`)
    puzzles[name] = execute
  }

  return puzzles
}