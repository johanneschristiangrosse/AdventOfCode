import { puzzles } from '../puzzles/index.js'
import { getDurationString } from '../utility/getDurationString.js'

self.onmessage = async event => {
  const puzzleKey = `day_${event.data.year}_12_${event.data.day}_puzzle_${event.data.puzzle}`
  const inputKey = `day_${event.data.year}_12_${event.data.day}`

  if (Object.prototype.hasOwnProperty.call(puzzles, puzzleKey)) {
    let func = null
    try {
      func = (await import(`../puzzles/${puzzleKey}.js`)).execute
    } catch (error) {
      console.error(`The file "puzzles/${puzzleKey}.js" doesn't exist.`, error)
    }

    if (func) {
      const input = await fetch(`../puzzles/inputs/${inputKey}.txt`).then(response => response.text())
      const startTime = new Date()
      self.postMessage({
        type: 'status',
        value: 'ok',
        startTime: startTime,
      })
      const result = await func(input)
      const endDate = new Date()
      self.postMessage({
        type: 'result',
        puzzleKey: puzzleKey,
        result: result,
        originalResult: puzzles[puzzleKey],
        duration: getDurationString(startTime, endDate),
      })
    } else {
      self.postMessage({
        type: 'status',
        value: 'no result',
        message: `The file "puzzles/${puzzleKey}.js" doesn't exist.`,
      })
    }
  } else {
    self.postMessage({
      type: 'status',
      value: 'no result',
      message: 'There is no result yet for this puzzle.',
    })
  }
}
