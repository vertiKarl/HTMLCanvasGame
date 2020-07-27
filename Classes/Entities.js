module.exports = class Entity {
  constructor(method=null, name, positionx=0, positiony=0, id=0, team=null) {
    this.id = id
    if(name) {
      this.name = name
    } else {
      let names = ['Thomas', 'Calito', 'Flusi', 'Shushboii', 'mlx_martin', 'GGJay', 'Myun', 'Selphy', 'Jinja', 'BehindyouHorror', 'vertiKarl', 'Snaq__']
      this.name = names[Math.floor(Math.random() * names.length)]
      console.log(this.name)
    }
    let colors = ['rgb(255, 255, 0)', 'rgb(0, 255, 0)', 'rgb(0, 255, 255)', 'rgb(255, 255, 255)']
    this.color = colors[Math.floor(Math.random() * colors.length)]
    //this.color = `rgb(${Math.floor(Math.random() * 155) + 100}, ${Math.floor(Math.random() * 155) + 100}, ${Math.floor(Math.random() * 155) + 100})`
    if(!team) {
      this.team = this.name
    } else {
      this.team = team.name
      this.color = team.color
    }
    parseFloat(positionx).toString() !== 'NaN' ? this.positionx = parseFloat(positionx) : this.positionx = parseFloat(0)
    parseFloat(positiony).toString() !== 'NaN' ? this.positiony = parseFloat(positiony) : this.positiony = parseFloat(0)
  }
}
