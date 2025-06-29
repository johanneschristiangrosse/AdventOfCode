import { loadPuzzles } from '../puzzles/index.js'
import { getDurationString } from '../utility/getDurationString.js'

self.onmessage = async event => {
  const puzzles = await loadPuzzles()
  const func = puzzles[event.data]

  if (func) {
    const startTime = new Date()
    self.postMessage({
      type: 'status',
      value: 'ok',
      startTime: startTime,
    })
    const result = await func()
    const endDate = new Date()
    self.postMessage({
      type: 'result',
      puzzleKey: event.data,
      result: result,
      duration: getDurationString(startTime, endDate),
    })
  } else {
    self.postMessage({
      type: 'status',
      value: 'no result',
    })
  }
}
