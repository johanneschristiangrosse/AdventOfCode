export async function execute() {
  const input = await fetch('/lib/puzzles/inputs/day_2024_12_07_puzzle_1.txt').then(x => x.text())

  const calibrations = input.split('\n').map(calibration => {
    const splitted = calibration.split(': ')
    return {
      value: Number(splitted[0]),
      operants: splitted[1].split(' ').map(number => Number(number)),
    }
  })

  return calibrations
    .map(calibration => getValue(calibration.operants, 0, calibration.operants[0], calibration.operants.length - 2, calibration.value)
      ? (() => {
        return calibration.value
      })()
      : 0)
    .reduce((a, b) => a + b, 0)
}

function getValue(operants, operant1Index, currentOperant1, operant1MaxIndex, value) {
  const mul = currentOperant1 * operants[operant1Index + 1]
  const add = currentOperant1 + operants[operant1Index + 1]
  const con = Number(`${currentOperant1}${operants[operant1Index + 1]}`)

  if (operant1Index === operant1MaxIndex) {
    return mul === value || add === value || con === value
  }

  const mulResult = mul > value ? false : getValue(operants, operant1Index + 1, mul, operant1MaxIndex, value)
  const addResult = add > value ? false : getValue(operants, operant1Index + 1, add, operant1MaxIndex, value)
  const conResult = con > value ? false : getValue(operants, operant1Index + 1, con, operant1MaxIndex, value)

  return mulResult || addResult || conResult
}