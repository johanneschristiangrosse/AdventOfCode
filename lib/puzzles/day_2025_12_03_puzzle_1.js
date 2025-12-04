export async function execute(digitsNumber = 2) {
  const input = await fetch('/lib/puzzles/inputs/day_2025_12_03_puzzle_1.txt')
    .then(response => response.text())
    .then(text => text.split('\n').map(row => row.split('').map(number => Number(number))))
  let sum = 0

  input.forEach(row => {
    let sumString = ''
    let lastIndex = -1

    for (let digitsOfset = digitsNumber - 1; digitsOfset >= 0; digitsOfset--) {
      let biggestValue = 0
  
      for (let index = lastIndex + 1; index < (row.length - digitsOfset); index++) {
        if (row[index] > biggestValue) {
          lastIndex = index
          biggestValue = row[index]
          if (biggestValue === 9) {
            break
          }
        }
      }

      sumString = `${sumString}${biggestValue}`
    }

    sum += Number(sumString)
  })

  return sum
}
