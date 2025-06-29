import { getDurationString } from '../lib/utility/getDurationString.js'
import { getSourceControl } from '../lib/components/source/component.js'
import { getImpressumControl } from '../lib/components/impressum/component.js'

document.addEventListener('DOMContentLoaded', start)

async function start() {
  const content = document.querySelector('.content')
  const result = content.querySelector('.result')
  const duration = content.querySelector('.duration')
  const year = new URLSearchParams(window.location.search).get('year')
  const shortDay = new URLSearchParams(window.location.search).get('day')
  const day = shortDay.toString().padStart(2, '0')
  const puzzle = new URLSearchParams(window.location.search).get('puzzle')
  document.querySelector('.content-puzzle-number').innerText = puzzle
  document.querySelector('.content-year').innerText = year
  document.querySelector('.content-day').innerText = day
  document.querySelector('h2>a').href = `https://adventofcode.com/${year}/day/${shortDay}${(puzzle > 1 ? `#part${puzzle}` : '')}`

  const footer = document.querySelector('footer')
  footer.appendChild(document.createElement('hr'))
  footer.appendChild(getSourceControl())
  footer.appendChild(document.createElement('hr'))
  footer.appendChild(getImpressumControl())
  
  let timerId = null
  const worker = new Worker('../lib/worker/executePuzzle.js', { type: 'module' })
  worker.onmessage = async event => {
    if (event.data.type === 'status') {
      if (event.data.value === 'ok') {
        timerId = setInterval(() => duration.innerText = getDurationString(event.data.startTime, new Date()), 13)
      } else {
        content.innerHTML = /*html*/`${event.data.message}<br><br>]-:`
      }
    } else if (event.data.type === 'result') {
      clearInterval(timerId)
      result.innerText = event.data.result
      duration.innerText = event.data.duration
    }
  }
  worker.postMessage(`day_${year}_12_${day}_puzzle_${puzzle}`)
}
