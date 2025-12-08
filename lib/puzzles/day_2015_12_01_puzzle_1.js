export async function execute(input) {
  let counter = 0

  input.split('').forEach(character => {
    counter += character === '(' ? 1 : -1
  })
  return counter
}
