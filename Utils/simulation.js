module.exports = [{
                    'name': 'new',
                    'description': 'creates a new entity',
                    'execute': function(map, ...data) {
                      const Entity = require('../Classes/Entities.js')
                      map.entities.push(new (require('../Classes/Entities.js'))(...data))
                      return map.entities
                    }
                  },
                  {
                    'name': 'list',
                    'description': 'lists all entities',
                    'execute': function(map, ...data) {
                      return map.entities
                    }
                  },
                  {
                    'name': 'json',
                    'description': 'lists all objects',
                    'execute': function(map, ...data) {
                      return JSON.stringify(map)
                    }
                  }]
