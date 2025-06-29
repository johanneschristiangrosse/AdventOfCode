import { loadPuzzles } from '../puzzles/index.js'
import { getDurationString } from '../utility/getDurationString.js'
self.addEventListener('message', async () => {
  const puzzles = await loadPuzzles()
  for (const puzzleKey in puzzles) {
    const startTime = new Date()
    const result = await puzzles[puzzleKey]()
    const endDate = new Date()
    self.postMessage({
      puzzleKey: puzzleKey,
      result: result,
      duration: getDurationString(startTime, endDate),
    })
  }
})
