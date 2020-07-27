module.exports = [{
                    'name': 'new',
                    'description': 'creates a new entity',
                    'execute': function(map, ...data) {
                      if(map.entities) {
                        data[1] ? data[1] = data[1] : data[1] = null
                        parseFloat(data[2]) ? data[2] = parseFloat(data[2]) : data[2] = 0
                        parseFloat(data[3]) ? data[3] = parseFloat(data[3]) : data[3] = 0
                        data.push(map.entities.length)
                        console.log(data)
                        map.entities.push(new (require('../Classes/Entities.js'))(...data))
                      } else {
                        map.entities.push(new (require('../Classes/Entities.js'))(...data))
                      }
                      return map
                    }
                  },
                  {
                    'name': 'list',
                    'description': 'lists all entities',
                    'execute': function(map, ...data) {
                      return map
                    }
                  },
                  {
                    'name': 'update',
                    'description': 'updates simulation',
                    'execute': function(map, ...data) {
                      map.lastkill = null
                      for(let e of map.entities) {
                        if(e) {
                          let directions = ['UP', 'DOWN', 'LEFT', 'RIGHT', 'UPLEFT', 'UPRIGHT', 'DOWNLEFT', 'DOWNRIGHT']
                          let dir = Math.floor(Math.random() * 8)
                          let movement = Math.floor(Math.random() * 4)
                          let collided = false
                          console.log(directions[dir], movement)
                          let new_position = { x: e.positionx, y: e.positiony }
                          if(directions[dir] === 'UP') {
                            new_position.y += movement
                          }
                          if(directions[dir] === 'DOWN') {
                            new_position.y -= movement
                          }
                          if(directions[dir] === 'LEFT') {
                            new_position.x -= movement
                          }
                          if(directions[dir] === 'RIGHT') {
                            new_position.x += movement
                          }
                          if(directions[dir] === 'UPLEFT') {
                            new_position.y += movement/2
                            new_position.x -= movement/2
                          }
                          if(directions[dir] === 'UPRIGHT') {
                            new_position.y += movement/2
                            new_position.x += movement/2
                          }
                          if(directions[dir] === 'DOWNLEFT') {
                            new_position.y -= movement/2
                            new_position.x -= movement/2
                          }
                          if(directions[dir] === 'DOWNRIGHT') {
                            new_position.y -= movement/2
                            new_position.x += movement/2
                          }
                          if(new_position.x > map.width || new_position.x < 0 || new_position.y > map.height || new_position.y < 0) {
                            console.log(`(${e.id})`+e.name+': map boundary!')
                            collided = true
                          }
                          for(let c of map.entities) {
                            if(c) {
                              const distance = require('./distance.js')
                              console.log(c.id, e.id)
                              if(c.id !== e.id) {
                                let a = { x: new_position.x, y: new_position.y }
                                let b = { x: c.positionx, y: c.positiony }
                                console.log('x:', distance.x(a, b), '\ny:', distance.y(a, b))
                                if(distance.x(a, b) || distance.y(a, b)) {
                                  console.log(`(${e.id})`+e.name+': can move!')
                                } else {
                                  if(e.team !== c.team) {
                                    map.lastkill = map.kill(e, c)
                                  }
                                  console.log(`(${e.id})`+e.name+`: collided with (${c.id})${c.name} his position: x: ${c.positionx} y: ${c.positiony} my position: x: ${e.positionx} y: ${e.positiony} new position x: ${new_position.x} y: ${new_position.y}`)
                                  collided = true
                                  break
                                }
                              }
                            }
                          }
                          if(!collided) {
                            e.positionx = Math.floor(new_position.x)
                            e.positiony = Math.floor(new_position.y)
                          } else {
                            console.log(`(${e.id})${e.name} couldn't move`)
                          }
                      }
                      }
                      return map
                    }
                  },
                  {
                    'name': 'fill',
                    'description': 'spawns number of entities',
                    'execute': function(map, ...data) {
                      try {
                        let int = parseInt(data[1])
                        let n = 0
                        let id = n
                        let team
                        if(map.entities) {
                          id = map.entities.length
                        }
                        while(n < int) {
                          let x = Math.floor(Math.random() * map.width)
                          let y = Math.floor(Math.random() * map.height)
                          if(map.teams.length < 2) {
                            team = null
                          } else if(n % 2 === 0) {
                            team = map.teams[0]
                          } else {
                            team = map.teams[1]
                          }
                          const Entity = new (require('../Classes/Entities.js'))(null, undefined, x, y, id, team)
                          map.entities.push(Entity)
                          if(!team) {
                            map.teams.push(Entity)
                          }
                          console.log(map.entities)
                          n++
                          id++
                        }
                        return map
                      } catch(e) {
                        console.log(e)
                      }
                    }
                  },
                  {
                    'name': 'clear',
                    'description': 'clears entities',
                    'execute': function(map, ...data) {
                      map.entities = []
                      map.teams = []
                      return map
                    }
                  },
                  {
                    'name': 'help',
                    'description': 'returns available commands',
                    'execute': function(map, ...data) {
                      return map.commands
                    }
                  },
                  {
                    'name': 'lastkill',
                    'description': 'returns the last kill',
                    'execute': function(map, ...data) {
                      return map.lastkill
                    }
                  },
                  {
                    'name': 'auto',
                    'description': 'automaticly updates simulation (press esc to stop)',
                    'execute': function(map, ...data) {
                      return 'THIS DOES NOT WORK YET'
                    }
                  }]
