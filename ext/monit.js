const http = require('http')
var name = require('../config.json').name;

function monit() {
  return new Promise(function(resolve, reject) {
    let data = '';
    const req =  http.request({
      hostname: '127.0.0.1',
      port: 15487,
      method: 'DELETE',
      path: '/'+name.replace(/ /ig, '_'),
    }, (res) => {

      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      console.log(data);
      });
      res.on('error', function(err) {
        reject(err);
        });
    });
    req.on('error', function(err) {
      reject(err);
    })
    req.end()
  });
}

module.exports = monit;
