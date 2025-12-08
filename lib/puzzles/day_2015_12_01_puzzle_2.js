export function execute(input) {
  const characters = input.split('')
  let counter = 0
  let position = 0

  while (position != -1) {
    position += characters[counter] === '(' ? 1 : -1
    counter++
  }

  return counter
}
