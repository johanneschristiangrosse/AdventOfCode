import { input } from "./inputs/day_2015_12_04_issue_1.js";
import CryptoJS from "https://esm.sh/crypto-js@4.1.1";

export function day_2015_12_04_issue_1(pattern = /^00000.*/) {
  let counter = 0

  while (true) {
    if (CryptoJS.MD5(`${input}${++counter}`).toString(CryptoJS.enc.Hex).match(pattern)) {
      return counter
    }
  }
}
