import { loadPuzzles } from '../lib/puzzles/index.js'
import { getDurationString } from '../lib/utility/getDurationString.js'

document.addEventListener('DOMContentLoaded', start)

async function start() {
  const year = new URLSearchParams(window.location.search).get('year')
  const shortDay = new URLSearchParams(window.location.search).get('day')
  const day = shortDay.toString().padStart(2, '0')
  const puzzle = new URLSearchParams(window.location.search).get('puzzle')
  document.querySelector('.content-puzzle-number').innerText = puzzle
  document.querySelector('.content-year').innerText = year
  document.querySelector('.content-day').innerText = day
  document.querySelector('h1>a').href = `https://adventofcode.com/${year}/day/${shortDay}${(puzzle > 1 ? `#part${puzzle}` : '')}`

  const funcName = `day_${year}_12_${day}_puzzle_${puzzle}`
  const puzzles = await loadPuzzles()
  const func = puzzles[funcName]
  const startTime = new Date()
  document.querySelector('.content').innerHTML = func
    ? /*html*/`
      <style>
        table {
          margin-left: auto;
          margin-right: auto;
        }
        th {
          text-align: left;
          padding-right: 1em;
        }
        td {
          text-align: right;
        }
      </style>
      <table>
        <tr>
          <th>Result:</th>
          <td>${await func()}</td>
        </tr>
        <tr>
          <th>Duration:</th>
          <td>${getDurationString(startTime, new Date())}</td>
        </tr>
      </table>
      `
    : /*html*/'There is no result yet for this puzzle<br><br>]-:'
}
