export async function loadPuzzles() {
  const puzzles = {}
  const puzzleInfos = {
    '2015': {
      '01': [ 1, 2 ],
      '02': [ 1, 2 ],
      '03': [ 1, 2 ],
      '04': [ 1, 2 ],
      '05': [ 1, 2 ],
      '06': [ 1, 2 ],
      '07': [ 1, 2 ],
      '08': [ 1 ],
    },
    '2024': {
      '01': [ 1, 2 ],
      '02': [ 1, 2 ],
      '03': [ 1, 2 ],
      '04': [ 1, 2 ],
      '05': [ 1, 2 ],
      '06': [ 1, 2 ],
      '07': [ 1, 2 ],
      '08': [ 1, 2 ],
      '09': [ 1, 2 ],
      '10': [ 1, 2 ],
      '11': [ 1, 2 ],
      '12': [ 1, 2 ],
    },
  }

  for (const year of Object.keys(puzzleInfos).sort((a, b) => parseInt(b) - parseInt(a))) {
    for (const day of Object.keys(puzzleInfos[year]).sort((a, b) => parseInt(a) - parseInt(b))) {
      for (const puzzle of puzzleInfos[year][day].sort((a, b) => parseInt(a) - parseInt(b))) {
        const name = `day_${year}_12_${day}_puzzle_${puzzle}`
        puzzles[name] = (await import(`./${name}.js`)).execute
      }
    }
  }

  return puzzles
}