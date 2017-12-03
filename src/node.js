export default class Node {
  constructor(value) {
    this.value = value
    this.inputs = []
  }
  add(node) {
    this.inputs = this.inputs.concat(node)
  }
  remove(index) {
    this.inputs = this.inputs.slice(index, 1)
  }
}
