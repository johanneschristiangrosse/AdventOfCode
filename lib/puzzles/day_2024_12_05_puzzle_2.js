export function execute(input) {
  const splittedInputs = input.split('\n\n')
  const rules = splittedInputs[0].split('\n').map(string => string.split('|').map(number => Number(number)))
  const updates = splittedInputs[1].split('\n').map(string => string.split(',').map(number => Number(number)))
  let sum = 0

  updates.forEach((update) => {
    let isValid = true
    const rulesForUpdate = rules.filter(rule => update.includes(rule[0]) && update.includes(rule[1]))
    for (let firstIndex = 0; firstIndex < update.length - 1; firstIndex++) {
      let resetValidation = false
      const first = update[firstIndex]
      const rulesForUpdatePosition = rulesForUpdate.filter(rule => rule[1] === first)
      for (let secondIndex = firstIndex + 1; secondIndex < update.length; secondIndex++) {
        const second = update[secondIndex]
        for (let ruleIndex = 0; ruleIndex < rulesForUpdatePosition.length; ruleIndex++) {
          const rule = rulesForUpdatePosition[ruleIndex]
          if (rule[0] === second) {
            isValid = false
            update[firstIndex] = second
            update[secondIndex] = first
            firstIndex = -1
            resetValidation = true
            if (resetValidation) break
          }
        }
        if (resetValidation) break
      }
    }
    if (!isValid) sum += update[(update.length - 1) / 2]
  })
  return sum
}
