export function getDurationString(startTime, endDate, minUnit = 'ms', longFormat = true, spaceBeforeUnit = true) {
  const space = spaceBeforeUnit ? ' ' : ''
  const units = []

  units.push({ label: `${space}d`, factor: 1000 * 60 * 60 * 24, showZero: false, trailingDigits: 0, trailingSpace: true })
  if (minUnit !== 'd') {
    units.push({ label: longFormat ? `${space}h` : ':', factor: 1000 * 60 * 60, showZero: !longFormat, trailingDigits: longFormat ? 0 : 2, trailingSpace: true })
    if (minUnit !== 'h') {
      units.push({ label: longFormat ? `${space}min`: ':', factor: 1000 * 60, showZero: !longFormat, trailingDigits: longFormat ? 0 : 2, trailingSpace: longFormat })
      if (minUnit !== 'min') {
        units.push({ label: minUnit === 's' ? (longFormat ? `${space}s` : '') : '.', factor: 1000, showZero: true, trailingDigits: longFormat ? 0 : 2, trailingSpace: longFormat })
        if (minUnit !== 's') {
          units.push({ label: `${space}s`, factor: 1, showZero: true, trailingDigits: 3, trailingSpace: !longFormat })
        }
      }
    }
  }

  let duration = Math.ceil((endDate.getTime() - startTime.getTime()))
  const durationArray = []

  for (let unitIndex = 0; unitIndex < units.length; unitIndex++) {
    const unit = units[unitIndex]
    const value = Math.floor(duration / unit.factor)
    duration = duration % unit.factor

    if (unit.showZero || value !== 0) {
      durationArray.push(`${unit.trailingSpace ? ' ' : ''}${value.toString().padStart(unit.trailingDigits, '0')}${unit.label}`)
    }
  }

  return durationArray.join('').trim()
}