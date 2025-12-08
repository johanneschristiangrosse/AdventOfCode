import CryptoJS from 'https://esm.sh/crypto-js@4.1.1'

export function execute(input, pattern = /^00000.*/) {
  let counter = 0

  while (true) {
    if (CryptoJS.MD5(`${input}${++counter}`).toString(CryptoJS.enc.Hex).match(pattern)) {
      return counter
    }
  }
}
