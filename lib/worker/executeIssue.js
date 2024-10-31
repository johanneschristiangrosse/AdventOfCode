import { issues } from "../issues/index.js";

self.addEventListener('message', async event => {
  const startTime = new Date()
  const result = await issues[event.data]()
  const endDate = new Date()
  self.postMessage({ result: result, duration: getDurationString(startTime, endDate) })
})

function getDurationString(startTime, endDate) {
  const units = [
    { label: 'd', factor: 1000 * 60 * 60 * 24, showZero: false },
    { label: 'h', factor: 1000 * 60 * 60, showZero: false },
    { label: 'min', factor: 1000 * 60, showZero: false },
    { label: 's', factor: 1000, showZero: true },
    { label: 'ms', factor: 1, showZero: true },
  ]

  let duration = Math.ceil((endDate.getTime() - startTime.getTime()))
  const durationArray = []

  for (let unitIndex = 0; unitIndex < units.length; unitIndex++) {
    const unit = units[unitIndex];
    const value = Math.floor(duration / unit.factor)
    duration = duration % unit.factor

    if (unit.showZero || value !== 0) {
      durationArray.push(`${value} ${unit.label}`)
    }
  }

  return durationArray.join(' ')
}
