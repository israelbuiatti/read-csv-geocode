const knex = require('knex')({
    client: 'pg',
    version: '11.9',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '123',
      //database : 'knex'
    }
});

module.exports = knex