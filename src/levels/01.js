export default {
  init: () => [],
  inputs: [0, 1, 2, 3],
  solution: {},
  output: (xs, x) => {
    xs.push(x)
    return xs
  },
  pieces: ["filtering", "isOdd", "isEven"],
  expected: [1, 3]
}
