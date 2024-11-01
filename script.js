import { issues } from "./lib/issues/index.js";

document.addEventListener("DOMContentLoaded", start)

function start() {
  const issueList = document.querySelector('.years')

  for (let year = 2015; year <= new Date().getFullYear(); year++) {
    issueList.appendChild(getYearControl(year))
  }
}

function getYearControl(year) {
  const control = document.createElement('li')
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
  control.classList.add('days')

  for (let day = 1; day <= 25; day++) {
    control.appendChild(getDayControl(year, day))
  }

  return control
}

function getDayControl(year, day) {
  const control = document.createElement('li')

  if (issues[`day_${year}_12_${day.toString().padStart(2, '0')}_issue_1`]) {
    control.classList.add('issue-1-solved')
  }

  if (issues[`day_${year}_12_${day.toString().padStart(2, '0')}_issue_2`]) {
    control.classList.add('issue-2-solved')
  }

  control.appendChild(getDayStringControl(year, day))
  control.appendChild(getIssueListControl(year, day))
  return control
}

function getDayStringControl(year, day) {
  const control = document.createElement('h3')
  control.innerText = `${day.toString().padStart(2, '0')}.12.${year}`
  return control
}

function getIssueListControl(year, day) {
  const control = document.createElement('ul')
  control.classList.add('issues')
  control.appendChild(getIssueControl(year, day, 1))
  control.appendChild(getIssueControl(year, day, 2))
  return control
}

function getIssueControl(year, day, issue) {
  const control = document.createElement('li')

  if (issues[`day_${year}_12_${day.toString().padStart(2, '0')}_issue_${issue}`]) {
    control.classList.add('solved')
  }

  control.appendChild(getIssueLinkControl(year, day, issue))
  control.appendChild(document.createTextNode(': '))
  control.appendChild(getIssueResultControl(year, day, issue))
  return control
}

function getIssueLinkControl(year, day, issue) {
  const control = document.createElement('a')
  control.innerText = `Issue ${issue}`
  control.href = `https://adventofcode.com/${year}/day/${day}${(issue > 1 ? `#part${issue}` : '')}`
  control.setAttribute('target', '_blank')
  return control
}

function getIssueResultControl(year, day, issue) {
  const control = document.createElement('span')
  control.classList.add('result')
  const issueKey = `day_${year}_12_${day.toString().padStart(2, '0')}_issue_${issue}`

  if (issues[issueKey]) {
    control.appendChild(getSpinnerControl())
    const worker = new Worker('lib/worker/executeIssue.js', { type: "module" })
    worker.postMessage(issueKey)
    worker.addEventListener('message', event => {
      control.innerText = `${event.data.result}`
      control.title = `duration: ${event.data.duration}`
    })
  }

  return control
}

function getSpinnerControl() {
  const spinnerIcon = 'https://raw.githubusercontent.com/n3r4zzurr0/svg-spinners/refs/heads/main/preview/bars-rotate-fade-white-36.svg'
  const control = document.createElement('img')
  control.src = spinnerIcon
  control.classList.add('icon')
  return control
}
