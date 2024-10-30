import { issues } from "./lib/issues/index.js";

document.addEventListener("DOMContentLoaded", start)

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
  control.appendChild(getIssueLinkControl(year, day, 1))
  control.appendChild(getIssueResultControl(year, day, 1))
  control.appendChild(getIssueLinkControl(year, day, 2))
  control.appendChild(getIssueResultControl(year, day, 2))
  return control
}

function getDayStringControl(year, day) {
  const control = document.createElement('span')
  control.innerText = `${day.toString().padStart(2, '0')}.12.${year}`
  return control
}

function getIssueLinkControl(year, day, issue) {
  const control = document.createElement('a')
  control.innerText = `Issue ${issue}:`
  control.href = `https://adventofcode.com/${year}/day/${day}${(issue > 1 ? `#part${issue}` : '')}`
  control.setAttribute('target', '_blank')
  return control
}

function getIssueResultControl(year, day, issue) {
  const control = document.createElement('span')
  const issueKey = `day_${year}_12_${day.toString().padStart(2, '0')}_issue_${issue}`

  if (issues[issueKey]) {
    control.appendChild(getSpinnerControl())
    const worker = new Worker('lib/worker/executeIssue.js', { type: "module" })
    worker.postMessage(issueKey)
    worker.addEventListener('message', event => {
      control.innerText = event.data.result
      control.title = `duration: ${event.data.duration}`
    })
  }

  return control
}

function getSpinnerControl() {
  const spinnerIcon = 'https://raw.githubusercontent.com/n3r4zzurr0/svg-spinners/refs/heads/main/svg-smil/bars-rotate-fade.svg'
  const control = document.createElement('img')
  control.src = spinnerIcon
  control.classList.add('icon')
  return control
}
