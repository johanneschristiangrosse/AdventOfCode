import { puzzles } from "../puzzles/index.js";

self.addEventListener('message', async event => {
  const startTime = new Date()
  const result = await puzzles[event.data]()
  const endDate = new Date()
  self.postMessage({ result: result, duration: getDurationString(startTime, endDate) })
})

function getDurationString(startTime, endDate) {
  const units = [
    { label: ' d', factor: 1000 * 60 * 60 * 24, showZero: false, trailingDigits: 0, trailingSpace: true },
    { label: ' h', factor: 1000 * 60 * 60, showZero: false, trailingDigits: 0, trailingSpace: true },
    { label: ' min', factor: 1000 * 60, showZero: false, trailingDigits: 0, trailingSpace: true },
    { label: '.', factor: 1000, showZero: true, trailingDigits: 0, trailingSpace: true },
    { label: ' s', factor: 1, showZero: true, trailingDigits: 3, trailingSpace: false },
  ]

  let duration = Math.ceil((endDate.getTime() - startTime.getTime()))
  const durationArray = []

  for (let unitIndex = 0; unitIndex < units.length; unitIndex++) {
    const unit = units[unitIndex];
    const value = Math.floor(duration / unit.factor)
    duration = duration % unit.factor

    if (unit.showZero || value !== 0) {
      durationArray.push(`${unit.trailingSpace ? ' ' : ''}${value.toString().padStart(unit.trailingDigits, '0')}${unit.label}`)
    }
  }

  return durationArray.join('').trim()
}
