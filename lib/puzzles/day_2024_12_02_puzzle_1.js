export async function execute(input) {
  const values = input.split('\n').map(row => row.split(/\s+/).map(string => Number(string)))
  let count = 0

  values.forEach(row => {
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

    if (isSave) {
      count++
    }
  })

  return count
}
