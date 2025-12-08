export function execute(input) {
  const values = input.split('\n').map(row => row.split(/\s+/).map(string => Number(string)))
  let count = 0

  values.forEach(row => {
    let isSave2 = checkRow(row)

    if (isSave2 === 0) {
      for (let index = 0; index < row.length; index++){
        isSave2 = checkRow(row.filter((_, currentIndex) => currentIndex !== index))
        if (isSave2 === 1) {
          break
        }
      }
    }

    count += isSave2
  })

  return count
}

function checkRow(row) {
  let isSave = true

  if (row[0] === row[1]) {
    isSave = false
  } else {
    const increase = row[0] < row[1]
    
    for (let index = 0; index < row.length - 1; index++) {
      if (row[index] === row[index + 1]) {
        isSave = false
        break
      } else if (increase && row[index] > row[index + 1]) {
        isSave = false
        break
      } else if (!increase && row[index] < row[index + 1]){
        isSave = false
        break
      } else if (increase && row[index + 1] - row[index] > 3) {
        isSave = false
        break
      } else if (!increase && row[index] - row[index + 1] > 3) {
        isSave = false
        break
      }
    }
  }

  return isSave ? 1 : 0
}
