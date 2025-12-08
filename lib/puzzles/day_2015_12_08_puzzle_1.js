export function execute(input) {
  const inputWithoutWhitespacesInMemory = input
    .replaceAll(/^"/g, '')
    .replaceAll(/"$/g, '')
    .replaceAll(/"\n"/g, '\n')
    .replaceAll(/\\\\/g, 'a')
    .replaceAll(/\\"/g, 'a')
    .replaceAll(/\\x.{2}/g, 'a')
  return input.length - inputWithoutWhitespacesInMemory.length
}
