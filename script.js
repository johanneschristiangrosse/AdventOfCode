import { puzzles } from './lib/puzzles/index.js'
import { getSourceControl } from './lib/controls/source/control.js'
import { getImpressumControl } from './lib/controls/impressum/control.js'

document.addEventListener('DOMContentLoaded', start)

function start() {
  const years = document.querySelector('.years')

  for (let year = new Date().getFullYear(); year >= 2015; year--) {
    years.appendChild(getYearControl(year))
  }

  const worker = new Worker('lib/worker/executePuzzle.js', { type: 'module' })
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

function getYearControl(year) {
  const control = document.createElement('li')
  control.appendChild(getYearLinkControl(year))
  control.appendChild(getYearPercentControl(year))
  control.appendChild(getDayListControl(year))
  console.log((control.querySelectorAll('.solved').length * 100 / 50).toFixed(0) + ' %')
  console.log(Object.keys(puzzles).filter(key => key.match(new RegExp(`^day_${year}_12_\\d{2}_puzzle_[12]$`))).length)
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

function getYearPercentControl(year) {
  const count = Object.keys(puzzles).filter(key => key.match(new RegExp(`^day_${year}_12_\\d{2}_puzzle_[12]$`))).length
  const control = document.createElement('span')
  control.classList.add('comment')
  control.innerText = `${2 * count} % solved`
  control.appendChild(document.createElement('br'))
  control.appendChild(document.createElement('br'))
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

  if (puzzles[`day_${year}_12_${day.toString().padStart(2, '0')}_puzzle_1`]) {
    control.classList.add('puzzle-1-solved')
  }

  if (puzzles[`day_${year}_12_${day.toString().padStart(2, '0')}_puzzle_2`]) {
    control.classList.add('puzzle-2-solved')
  }

  control.appendChild(getDayStringControl(year, day))
  control.appendChild(getPuzzleListControl(year, day))
  return control
}

function getDayStringControl(year, day) {
  const control = document.createElement('h3')
  control.innerText = `${day.toString().padStart(2, '0')}`
  return control
}

function getPuzzleListControl(year, day) {
  const control = document.createElement('ul')
  control.classList.add('puzzle')
  control.appendChild(getPuzzleControl(year, day, 1))
  control.appendChild(getPuzzleControl(year, day, 2))
  return control
}

function getPuzzleControl(year, day, puzzle) {
  const control = document.createElement('li')

  if (puzzles[`day_${year}_12_${day.toString().padStart(2, '0')}_puzzle_${puzzle}`]) {
    control.classList.add('solved')
  }

  control.appendChild(getPuzzleLinkControl(year, day, puzzle))
  control.appendChild(document.createTextNode(': '))
  control.appendChild(getPuzzleResultControl(year, day, puzzle))
  return control
}

function getPuzzleLinkControl(year, day, puzzle) {
  const control = document.createElement('a')
  control.innerText = `Puzzle ${puzzle}`
  control.href = `https://adventofcode.com/${year}/day/${day}${(puzzle > 1 ? `#part${puzzle}` : '')}`
  control.setAttribute('target', '_blank')
  return control
}

function getPuzzleResultControl(year, day, puzzle) {
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
