import { issues } from "../issues/index.js";

self.addEventListener('message', async event => {
  const startTime = new Date()
  const result = await issues[event.data]()
  const endDate = new Date()
  self.postMessage({ result: result, duration: getDurationString(startTime, endDate) })
})

function getDurationString(startTime, endDate) {
  const units = [
    { label: 'd', factor: 60 * 60 * 24 },
    { label: 'h', factor: 60 * 60 },
    { label: 'min', factor: 60 },
    { label: 's', factor: 1 },
  ]

  let duration = Math.ceil((endDate.getTime() - startTime.getTime()) / 1000)
  const durationArray = []

  for (let unitIndex = 0; unitIndex < units.length; unitIndex++) {
    const unit = units[unitIndex];
    const value = Math.floor(duration / unit.factor)
    duration = duration % unit.factor

    if (value !== 0) {
      durationArray.push(`${value} ${unit.label}`)
    }
  }

  return durationArray.join(' ')
}
