module.exports = class World {
  constructor(width, height, color) {
    this.width = width
    this.height = height
    this.color = color
    this.entities = []
    this.teams = []
    this.lastkill = null
  }
  kill(attacker, target) {
    for(let e in this.entities) {
      if(this.entities[e].id === target.id) {
        console.log(`\u001b[1m\u001b[41;1m\u001b[38;5;231mE\x1b[0m(${attacker.id})`+attacker.name, 'killed', `(${target.id})`+target.name)
        delete this.entities[e]
        return `(${attacker.id})${attacker.name} killed (${target.id})${target.name}`
      }
    }
  }
}
