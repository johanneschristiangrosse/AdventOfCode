import { puzzles } from '../puzzles/index.js'
import { getDurationString } from '../utility/getDurationString.js'

self.onmessage = async event => {
  
  if (Object.prototype.hasOwnProperty.call(puzzles, event.data)) {
    let func = null
    try {
      func = (await import(`../puzzles/${event.data}.js`)).execute
    } catch (error) {
      console.error(`The file "puzzles/${event.data}.js" doesn't exist.`, error)
    }

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
        originalResult: puzzles[event.data],
        duration: getDurationString(startTime, endDate),
      })
    } else {
      self.postMessage({
        type: 'status',
        value: 'no result',
        message: `The file "puzzles/${event.data}.js" doesn't exist.`,
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
