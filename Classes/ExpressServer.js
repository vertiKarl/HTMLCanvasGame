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
      const color = 'green'
      const map = this.startSimulation(300, 150, color)
      map.commands = this.simulation
      con.send(`{"canvas_color": "${map.color}"}`)
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
            console.log(JSON.stringify(res))
            con.send(JSON.stringify(res))
            return
            break
          }
        }

        con.send(JSON.stringify({'ERROR': 'command not found'}))
      })
    })
  }
}
