module.exports = [{
                  'name': 'ping',
                  'description': 'responds with pong!',
                  'execute': function() {
                    return 'Pong!'
                  }
                },
                {
                  'name': 'cl',
                  'description': 'clears the console!',
                  'execute': function() {
                    console.clear()
                    return 'Cleared console!'
                  }
                }]
