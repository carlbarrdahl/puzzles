export default {
  init: [],
  inputs: [0, 1, 2, 3, 4, 5, 6, 7],
  solution: {},
  output: (xs, x) => {
    xs.push(x)
    return xs
  },
  pieces: ["pipe", "mapping", "filtering", "isOdd", "multiply"],
  expected: [3, 9, 15, 21]
}
