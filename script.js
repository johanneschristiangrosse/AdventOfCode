import { issue2015_12_01_issue_1 } from "./lib/issues/2015_12_01.js";

document.addEventListener("DOMContentLoaded", start)

const issues = []
issues['2015_12_01_issue_1'] = issue2015_12_01_issue_1

function start() {
  const issueList = document.getElementById('issues')

  for (let year = 2015; year <= new Date().getFullYear(); year++) {
    issueList.appendChild(getYearControl(year))
  }
}

function getYearControl(year) {
  const control = document.createElement('li')
  control.classList.add('contents')
  control.appendChild(getYearLinkControl(year))
  control.appendChild(getDayListControl(year))
  return control
}

function getYearLinkControl(year) {
  const linkControl = document.createElement('a')
  linkControl.innerText = `${year}`
  linkControl.href = `https://adventofcode.com/${year}`
  linkControl.setAttribute('target', '_blank')

  const control = document.createElement('h2')
  control.appendChild(linkControl)
  return control
}

function getDayListControl(year) {
  const control = document.createElement('ul')
  control.classList.add('contents')

  for (let day = 1; day <= 25; day++) {
    control.appendChild(getDayControl(year, day))
  }

  return control
}

function getDayControl(year, day) {
  const control = document.createElement('li')
  control.classList.add('contents')
  control.appendChild(getDayStringControl(year, day))
  control.appendChild(getIssueOneLinkControl(year, day))
  control.appendChild(getIssueOneResultControl(year, day))
  control.appendChild(getIssueTwoLinkControl(year, day))
  control.appendChild(getIssueTwoResultControl(year, day))
  return control
}

function getDayStringControl(year, day) {
  const control = document.createElement('span')
  control.innerText = `${day.toString().padStart(2, '0')}.12.${year}`
  return control
}

function getIssueOneLinkControl(year, day) {
  const control = document.createElement('a')
  control.innerText = `Issue 1:`
  control.href = `https://adventofcode.com/${year}/day/${day}`
  control.setAttribute('target', '_blank')
  return control
}

function getIssueOneResultControl(year, day) {
  const control = document.createElement('span')
  const issueKey = `${year}_12_${day.toString().padStart(2, '0')}_issue_1`
  control.innerText = issues[issueKey] ? issues[issueKey]() : ''
  return control
}

function getIssueTwoLinkControl(year, day) {
  const control = document.createElement('a')
  control.innerText = `Issue 2:`
  control.href = `https://adventofcode.com/${year}/day/${day}#part2`
  control.setAttribute('target', '_blank')
  return control
}

function getIssueTwoResultControl(year, day) {
  const control = document.createElement('span')
  const issueKey = `${year}_12_${day.toString().padStart(2, '0')}_issue_2`
  control.innerText = issues[issueKey] ? issues[issueKey]() : ''
  return control
}
