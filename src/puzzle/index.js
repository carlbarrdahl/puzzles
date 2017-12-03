import { equals, pipe } from "ramda"

import Tree from "./tree"

const transduce = (xform, reducing, initial, input) =>
  input.reduce(xform(reducing), initial)

const mapping = f => reducing => (result, input) => reducing(result, f(input))
const filtering = predicate => reducing => (result, input) =>
  predicate(input) ? reducing(result, input) : result

const compile = node => {
  if (!node) {
    return null
  }
  const data = functionMap[node.data] || node.data
  return typeof data === "function" && node.inputs.length
    ? data(...node.inputs.map(compile))
    : data
}

const functionMap = {
  pipe,
  filtering,
  mapping,
  isOdd: n => n % 2,
  isEven: n => !(n % 2),
  multiply: n => n * 3
}

export default class Puzzle {
  constructor(puzzle) {
    Object.assign(this, puzzle, { solution: new Tree() })

    // this.add("pipe")
    // this.add("filtering", "pipe")
    // this.add("mapping", "pipe")
  }
  add(piece, parent) {
    this.solution.add(piece, parent)
  }
  reset() {
    this.solution = new Tree()
  }
  solve() {
    const { init, inputs, solution, output } = this
    // if (solution.root) {
      try {
        this.result = transduce(
          compile(solution.root),
          output,
          init(), // clone
          inputs
        )
        console.log(this.result)
        this.result = typeof this.result === "function" ? "?" : this.result
      } catch (e) {
        this.result = "?"
        // this.result = { error: e.message }
      }
    // }

    return this.result
  }
  isSolved() {
    this.solve()
    return equals(this.result, this.expected)
  }
}
