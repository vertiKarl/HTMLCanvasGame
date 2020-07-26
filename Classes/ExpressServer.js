const http = require('http')
const express = require('express')
const path = require('path')
const WebSocket = require('ws')
const World = require('./World.js')

module.exports = class ExpressServer {
  constructor(port) {
    this.port = port
    this.app = express()
    this.server = http.createServer(this.app)
    this.commands = require('../Utils/commands.js')
    this.simulation = require('../Utils/simulation.js')
    }
  create() {
    this.ws = new WebSocket.Server({ port: 8080 })
    this.socketHandling()
    this.loadRouting()
    this.server.listen(this.port, () => {
      console.log('Server available at http://localhost:'+this.port)
    })
  }
  loadRouting() {
    this.app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../public', '/index.html'))
    })
    this.app.use(express.static(path.join(__dirname, '../public')))
  }
  startSimulation(width, height, color) {
    return new World(width, height, color)
  }
  socketHandling() {
    this.ws.on('connection', (con) => {
      const color = 'black'
      const map = this.startSimulation(500, 500, color)
      con.send(`canvas_color ${color}`)
      con.on('message', (msg) => {
        msg = msg.split(' ')
        for(let command of this.commands) {
          if(msg[0] === command.name) {
            let resp = command.execute(...msg)
            con.send(resp)
            return
            break
          }
        }
        for(let command of this.simulation) {
          if(msg[0].toLowerCase() === command.name) {
            let res = command.execute(map, ...msg)
              switch (typeof res) {
                case 'object':
                  let array = []
                  for(let entry in res) {
                    array.push(res[entry].name)
                  }
                  res = array.join(', ')
                  //res = Object.keys(res).toString()
                  break
                case 'function':
                  res = res.toString()
                  break
                default:
                  res = res + ''
                  break
              }
            con.send(res)
            return
            break
          }
        }
        if(msg[0].toLowerCase() === 'update') {
          for(let e of map.entities) {
            let directions = ['UP', 'DOWN', 'LEFT', 'RIGHT']
            let dir = Math.floor(Math.random() * 4)
            let movement = Math.floor(Math.random() * 4)
            console.log(directions[dir], movement)
            if(directions[dir] === 'UP' || directions[dir] === 'DOWN') {
              directions[dir] === 'UP' ? e.positiony += movement : e.positiony -= movement
            } else {
              directions[dir] === 'RIGHT' ? e.positionx += movement : e.positionx -= movement
            }
          }
          con.send(JSON.stringify(map.entities))
          return
        }
        con.send('ERROR: command not found')
      })
    })
  }
}
