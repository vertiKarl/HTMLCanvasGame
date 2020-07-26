const shell = process.openStdin()
const Server = new (require('./Classes/ExpressServer.js'))(6969)
Server.create()
const color = 'black'
const Simulation = Server.startSimulation(500, 500, color)

shell.addListener('data', (d) => {
  let data = d.toString().trim().split(' ')
  for(let command in Server.commands) {
    command = Server.commands[command]
    if(command.name === data[0].toLowerCase()) {
      console.log(command.execute(...data))
      return
    }
  }
  for(let command in Server.simulation) {
    command = Server.simulation[command]
    if(command.name === data[0].toLowerCase()) {
      console.log(command.execute(Simulation, ...data))
      return
    }
  }
  if([data[0].toLowerCase()].includes('help', 'commands')) {
    if(data[1]) {
      for (com in Server.commands) {
        if(Server.commands[com].name === data[1].toLowerCase()) {
          console.log(Server.commands[com].description)
        }
      }
      return
    } else {
      let list = []
      for (com in Server.commands) {
        list.push(Server.commands[com].name)
      }
      console.log('Here is a list of all commands:\n'+list.join(', '))
      return
    }
  }
})
