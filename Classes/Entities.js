module.exports = class Entity {
  constructor(method=null, name='default', positionx=0, positiony=0) {
    this.name = name
    parseFloat(positionx).toString() !== 'NaN' ? this.positionx = parseFloat(positionx) : this.positionx = parseFloat(0)
    parseFloat(positiony).toString() !== 'NaN' ? this.positiony = parseFloat(positiony) : this.positiony = parseFloat(0)
  }
}
