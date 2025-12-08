export function execute(input) {
  const splittedInputs = input.split('\n\n')
  const rules = splittedInputs[0].split('\n').map(string => string.split('|').map(number => Number(number)))
  const updates = splittedInputs[1].split('\n').map(string => string.split(',').map(number => Number(number)))
  let sum = 0

  updates.forEach(update => {
    let isValid = true
    for (let firstIndex = 0; firstIndex < update.length - 1; firstIndex++) {
      const first = update[firstIndex]
      for (let secondIndex = firstIndex + 1; secondIndex < update.length; secondIndex++) {
        const second = update[secondIndex]
        for (let ruleIndex = 0; ruleIndex < rules.length; ruleIndex++) {
          const rule = rules[ruleIndex]
          if (rule[1] === first && rule[0] === second) isValid = false
          if (!isValid) break
        }
        if (!isValid) break
      }
      if (!isValid) break
    }
    if (isValid) sum += update[(update.length - 1) / 2]
  })

  return sum
}
