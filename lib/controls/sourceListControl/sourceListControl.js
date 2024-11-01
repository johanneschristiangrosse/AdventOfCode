import { sources } from "./sourcesList.js";

export function getSourceListControl() {
  const control = document.createElement('ul')

  sources.forEach(source => {
    console.log(source)
    const sourceControl = document.createElement('li')
    sourceControl.appendChild(getProjectControl(source))
    sourceControl.appendChild(document.createTextNode(' by '))
    sourceControl.appendChild(getAuthorControl(source))

    control.appendChild(sourceControl)
  });

  return control
}

function getProjectControl(source) {
  const control = document.createElement('a')
  control.innerText = source.projectName
  control.href = source.projectLink
  control.setAttribute('target', '_blank')
  return control
}

function getAuthorControl(source) {
  const control = document.createElement('a')
  control.innerText = source.authorName
  control.href = source.authorLink
  control.setAttribute('target', '_blank')
  return control
}
