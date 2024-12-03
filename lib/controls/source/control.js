import { content } from './content.js'

export function getSourceControl() {
  const control = document.createElement('div')
  control.appendChild(getHeadlineControl())
  control.appendChild(getSourceListControl2())
  return control
}

function getHeadlineControl() {
  const control = document.createElement('h2')
  control.innerText = 'Sources'
  return control
}

function getSourceListControl2() {
  const control = document.createElement('ul')

  content.forEach(source => {
    const sourceControl = document.createElement('li')
    sourceControl.appendChild(getProjectControl(source))
    sourceControl.appendChild(getLicenseControl(source))
    sourceControl.appendChild(document.createTextNode(' by '))
    sourceControl.appendChild(getAuthorControl(source))

    control.appendChild(sourceControl)
  })

  return control
}

function getProjectControl(source) {
  const control = document.createElement('a')
  control.innerText = source.projectName
  control.href = source.projectLink
  control.setAttribute('target', '_blank')
  return control
}

function getLicenseControl(source) {
  const content = source.license
    ? ` (license: ${source.license}) `
    : ''
  const control = document.createTextNode(content)
  return control
}

function getAuthorControl(source) {
  const control = document.createElement('a')
  control.innerText = source.authorName
  control.href = source.authorLink
  control.setAttribute('target', '_blank')
  return control
}
