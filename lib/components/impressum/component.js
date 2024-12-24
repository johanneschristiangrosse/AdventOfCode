import { impressumContent } from './content.js'

export function getImpressumControl() {
  const control = document.createElement('div')
  control.classList.add('impressum')
  control.innerHTML = impressumContent
  return control
}

