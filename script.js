import { loadPuzzles } from './lib/puzzles/index.js'
import { getSourceControl } from './lib/components/source/component.js'
import { getImpressumControl } from './lib/components/impressum/component.js'
import { getDurationString } from './lib/utility/getDurationString.js'
document.addEventListener('DOMContentLoaded', start)

const firstYear = 2015
const currentYear = new Date().getFullYear()
const yearCount = currentYear - firstYear + 1

async function start() {
  const puzzles = await loadPuzzles()
  const percent = document.querySelector('#percent')
  percent.innerText = getPercent(puzzles)

  const years = document.querySelector('.years')

  for (let year = currentYear; year >= firstYear; year--) {
    years.appendChild(getYearControl(puzzles, year))
  }

  setCountdown()

  const worker = new Worker('lib/worker/executePuzzles.js', { type: 'module' })
  Object.keys(puzzles).forEach(puzzleKey => {
    worker.addEventListener('message', event => {
      const control = years.querySelector(`.result.${puzzleKey}`)
      if (event.data.puzzleKey === puzzleKey) {
        control.innerText = `${event.data.result}`
        control.title = `duration: ${event.data.duration}`
      }
    })
  })
  worker.postMessage('go')

  const footer = document.querySelector('footer')
  footer.appendChild(document.createElement('hr'))
  footer.appendChild(getSourceControl())
  footer.appendChild(document.createElement('hr'))
  footer.appendChild(getImpressumControl())
}

async function setCountdown() {
  const controls = document.querySelectorAll('.countdown')
  setInterval(() => {
    controls.forEach(control => {
      const year = Number(control.getAttribute('data-year'))
      const day = Number(control.getAttribute('data-day'))
      const date = new Date(Date.parse(`${year}-12-${day.toString().padStart(2, '0')}T05:00:00+00:00`))
      if (date >= new Date()) {
        control.innerText = getDurationString(new Date(), date, 's', false, false)
      } else {
        document.querySelector(`.puzzle[data-year="${year}"][data-day="${day}"]`).classList.remove('hidden')
        control.remove()
      }
    })
  }, 100)
}

function getPercent(puzzles) {
  const count = Object.keys(puzzles).filter(key => key.match(new RegExp('^day_\\d{4}_12_\\d{2}_puzzle_[12]$'))).length
  const control = document.createElement('span')
  control.classList.add('comment')
  return `${(2 * count / yearCount).toFixed(1)} % `
}

function getYearControl(puzzles, year) {
  const control = document.createElement('li')
  control.appendChild(getYearLinkControl(year))
  control.appendChild(getYearPercentControl(puzzles, year))
  control.appendChild(getDayListControl(puzzles, year))
  return control
}

function getYearLinkControl(year) {
  const linkControl = document.createElement('a')
  linkControl.innerText = `December ${year}`
  linkControl.href = `https://adventofcode.com/${year}`
  linkControl.setAttribute('target', '_blank')

  const control = document.createElement('h2')
  control.appendChild(linkControl)
  return control
}

function getYearPercentControl(puzzles, year) {
  const count = Object.keys(puzzles).filter(key => key.match(new RegExp(`^day_${year}_12_\\d{2}_puzzle_[12]$`))).length
  const control = document.createElement('span')
  control.classList.add('comment')
  control.innerText = `${2 * count} % solved`
  control.appendChild(document.createElement('br'))
  control.appendChild(document.createElement('br'))
  return control
}

function getDayListControl(puzzles, year) {
  const control = document.createElement('ul')
  control.classList.add('days')

  for (let day = 1; day <= 25; day++) {
    control.appendChild(getDayControl(puzzles, year, day))
  }

  return control
}

function getDayControl(puzzles, year, day) {
  const date = new Date(Date.parse(`${year}-12-${day.toString().padStart(2, '0')}T05:00:00+00:00`))
  const control = document.createElement('li')
  control.appendChild(getDayStringControl(year, day))

  if (puzzles[`day_${year}_12_${day.toString().padStart(2, '0')}_puzzle_1`]) {
    control.classList.add('puzzle-1-solved')
  }

  if (puzzles[`day_${year}_12_${day.toString().padStart(2, '0')}_puzzle_2`]) {
    control.classList.add('puzzle-2-solved')
  }

  const puzzleListControl = getPuzzleListControl(puzzles, year, day)
  control.appendChild(puzzleListControl)
  
  if (date >= new Date()) {
    const countdown = getDurationString(new Date(), date, 's', false, false)
    puzzleListControl.classList.add('hidden')
    control.appendChild(getDayCountdownControl(year, day, countdown))
  }
    
  return control
}

function getDayCountdownControl(year, day, countdown) {
  const control = document.createElement('div')
  control.classList.add('countdown')
  control.setAttribute('data-year', year)
  control.setAttribute('data-day', day)
  control.appendChild(document.createTextNode(countdown))
  return control
}

function getDayStringControl(year, day) {
  const control = document.createElement('h3')
  control.innerText = `${day.toString().padStart(2, '0')}`
  return control
}

function getPuzzleListControl(puzzles, year, day) {
  const control = document.createElement('ul')
  control.classList.add('puzzle')
  control.setAttribute('data-year', year)
  control.setAttribute('data-day', day)
  control.appendChild(getPuzzleControl(puzzles, year, day, 1))
  control.appendChild(getPuzzleControl(puzzles, year, day, 2))
  return control
}

function getPuzzleControl(puzzles, year, day, puzzle) {
  const control = document.createElement('li')

  if (puzzles[`day_${year}_12_${day.toString().padStart(2, '0')}_puzzle_${puzzle}`]) {
    control.classList.add('solved')
  }

  control.appendChild(getPuzzleLinkControl(year, day, puzzle))
  control.appendChild(document.createTextNode(': '))
  control.appendChild(getPuzzleResultControl(puzzles, year, day, puzzle))
  return control
}

function getPuzzleLinkControl(year, day, puzzle) {
  const control = document.createElement('a')
  control.innerText = `Puzzle ${puzzle}`
  control.href = `/puzzle/?year=${year}&day=${day}&puzzle=${puzzle}`
  return control
}

function getPuzzleResultControl(puzzles, year, day, puzzle) {
  const control = document.createElement('span')
  control.classList.add('result')
  const puzzleKey = `day_${year}_12_${day.toString().padStart(2, '0')}_puzzle_${puzzle}`
  control.classList.add(puzzleKey)

  if (puzzles[puzzleKey]) {
    control.appendChild(getSpinnerControl())
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
