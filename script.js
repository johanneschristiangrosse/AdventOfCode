import { issue2015_12_01 } from "./lib/issues/2015_12_01.js";

document.addEventListener("DOMContentLoaded", start)

const issues = []
issues['2015_12_01'] = issue2015_12_01

function start() {
  const issueList = document.getElementById('issues')

  for (let year = 2015; year <= new Date().getFullYear(); year++) {
    issueList.appendChild(getYearControl(year))
  }
}

function getYearControl(year) {
  const yearControl = document.createElement('li')
  yearControl.appendChild(getYearLinkControl(year))
  yearControl.appendChild(getDayListControl(year))
  return yearControl
}

function getYearLinkControl(year) {
  const yearLinkControl = document.createElement('a')
  yearLinkControl.innerText = `${year}`
  yearLinkControl.href = `https://adventofcode.com/${year}`
  yearLinkControl.setAttribute('target', '_blank')
  return yearLinkControl
}

function getDayListControl(year) {
  const dayListControl = document.createElement('ul')

  for (let day = 1; day <= 25; day++) {
    dayListControl.appendChild(getDayControl(year, day))
  }

  return dayListControl
}

function getDayControl(year, day) {
  const dayControl = document.createElement('li')
  dayControl.appendChild(getDayLinkControl(year, day))
  dayControl.appendChild(getDayResultControl(year, day))
  return dayControl
}

function getDayLinkControl(year, day) {
  const dayLinkControl = document.createElement('a')
  dayLinkControl.innerText = `${day.toString().padStart(2, '0')}.12.${year}`
  dayLinkControl.href = `https://adventofcode.com/${year}/day/${day}`
  dayLinkControl.setAttribute('target', '_blank')
  return dayLinkControl
}

function getDayResultControl(year, day) {
  const issueKey = `${year}_12_${day.toString().padStart(2, '0')}`
  const resultString = issues[issueKey] ? `: ${issues[issueKey]()}` : ''
  return document.createTextNode(resultString)
}
