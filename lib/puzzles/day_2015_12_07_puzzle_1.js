const operations = {
  AND: (value1, value2) => value1 & value2,
  OR: (value1, value2) => value1 | value2,
  NOT: (value) => ~value & 0xFFFF,
  LSHIFT: (value1, value2) => (value1 << value2) & 0xFFFF,
  RSHIFT: (value1, value2) => value1 >>> value2,
}

const wires = {}

export function execute(input, initialWires = {}) {
  input
    .matchAll(/(.*) -> (.*)/g)
    .forEach(match => wires[match[2]] = { command: match[1], value: null })

  Object.keys(initialWires).forEach(key => {
    if (wires[key]) {
      wires[key].value = initialWires[key].value
    } else {
      wires[key] = initialWires[key]
    }
  })

  return getValueOfWire('a')
}

function getValueOfWire(wire) {
  if (wires[wire].value !== null) {
    return wires[wire].value
  }

  return wires[wire].value = executeCommand(wire)
}

function executeCommand(wire) {
  const tokens = wires[wire].command.split(' ')

  switch (tokens.length) {
  case 1:
    return getValueOfOperant(tokens[0])
  case 2:
    return operations[tokens[0]](getValueOfOperant(tokens[1]))
  case 3:
    return operations[tokens[1]](getValueOfOperant(tokens[0]), getValueOfOperant(tokens[2]))
  }
}

function getValueOfOperant(operant) {
  if (operant === null) {
    return null
  }

  return operant.match(/\d/) ? Number(operant) : getValueOfWire(operant)
}
