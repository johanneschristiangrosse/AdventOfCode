export async function execute(input) {
  input = input.split('\n').map(row => row.split(',').map(coordinate => Number(coordinate)))
  let distances = []

  for (let firstIndex = 0; firstIndex < input.length; firstIndex++) {
    for (let secondIndex = firstIndex + 1; secondIndex < input.length; secondIndex++) {
      distances.push({
        first: input[firstIndex],
        second: input[secondIndex],
        distances: Math.sqrt(
          Math.pow(input[firstIndex][0] - input[secondIndex][0], 2)
          + Math.pow(input[firstIndex][1] - input[secondIndex][1], 2)
          + Math.pow(input[firstIndex][2] - input[secondIndex][2], 2)),
      })
    }
  }

  distances = distances.sort((a, b) => a.distances - b.distances)
  const circuits = input.map(coordinates => [ coordinates ])
  
  for (let distanceIndex = 0; distanceIndex < 1000; distanceIndex++) {
    const firstCircuitIndex = circuits.map((circuit, index) => circuit.indexOf(distances[distanceIndex].first) >= 0 ? index : null).find(index => index !== null)
    const secondCircuitIndex = circuits.map((circuit, index) => circuit.indexOf(distances[distanceIndex].second) >= 0 ? index : null).find(index => index !== null)
    
    if (firstCircuitIndex !== secondCircuitIndex) {
      circuits[firstCircuitIndex].push(...circuits[secondCircuitIndex])
      circuits.splice(secondCircuitIndex, 1)
    }
  }
  
  return [ ...new Set(circuits.map(circuit => circuit.length)) ].sort((a, b) => a - b).slice(-3).reduce((a, b) => a * b, 1)
}
