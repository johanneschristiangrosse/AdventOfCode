import { day_2015_12_01_issue_1 } from "../issues/day_2015_12_01_issue_1.js";
import { day_2015_12_01_issue_2 } from "../issues/day_2015_12_01_issue_2.js";
import { day_2015_12_02_issue_1 } from "../issues/day_2015_12_02_issue_1.js";
import { day_2015_12_02_issue_2 } from "../issues/day_2015_12_02_issue_2.js";
import { day_2015_12_03_issue_1 } from "../issues/day_2015_12_03_issue_1.js";
import { day_2015_12_03_issue_2 } from "../issues/day_2015_12_03_issue_2.js";
import { day_2015_12_04_issue_1 } from "../issues/day_2015_12_04_issue_1.js";
import { day_2015_12_04_issue_2 } from "../issues/day_2015_12_04_issue_2.js";

const issues = []
issues['day_2015_12_01_issue_1'] = day_2015_12_01_issue_1
issues['day_2015_12_01_issue_2'] = day_2015_12_01_issue_2
issues['day_2015_12_02_issue_1'] = day_2015_12_02_issue_1
issues['day_2015_12_02_issue_2'] = day_2015_12_02_issue_2
issues['day_2015_12_03_issue_1'] = day_2015_12_03_issue_1
issues['day_2015_12_03_issue_2'] = day_2015_12_03_issue_2
issues['day_2015_12_04_issue_1'] = day_2015_12_04_issue_1
issues['day_2015_12_04_issue_2'] = day_2015_12_04_issue_2

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
