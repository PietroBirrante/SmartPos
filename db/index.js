const { Pool } = require('pg')

const pool = new Pool({
    user: '',
    host: '',
    database: '',
    password: '',
    port: 0000,
  })

  module.exports = {
    query(text, params){
      return new Promise((resolve, reject) => {
        const start = Date.now();
        pool.query(text, params)
        .then((res) => {
          const duration = Date.now() - start
          //console.log('executed query', { text, duration, rows: res.rowCount })
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        })
      })
    }
    
  }
