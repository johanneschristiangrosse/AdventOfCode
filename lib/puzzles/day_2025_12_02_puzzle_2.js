export async function execute(input) {
  input = input
    .split(',')
    .map(row => {
      const seperatorIndex = row.indexOf('-')
      return { start: Number(row.substring(0, seperatorIndex)), end: Number(row.substring(seperatorIndex + 1)) }
    })
  let sum = 0
  input.forEach(row => {
    for (let value = row.start; value <= row.end; value++) {
      const text = value.toString()

      for (let partLength = 1; partLength <= (text.length / 2); partLength++) { 
        if (text.length % partLength !== 0){
          continue
        }

        const parts = []
        
        for (let index = 0; index < (text.length / partLength); index++) {
          parts.push(text.substring(index * partLength, index * partLength + partLength))
        }

        if (!parts[0].startsWith('0') && parts.length === parts.filter(part => part === parts[0]).length) {
          sum += value
          break
        }
      }
    }
  })
  return sum
}
