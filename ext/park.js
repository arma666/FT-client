const http = require('http')
const ip = require('./ip.js');
const v = require('../v.json');

var name = require('../config.json').name;

function park(genpass) {
  return new Promise(function(resolve, reject) {
    var conf = JSON.stringify({
      ip: ip,
      pass: genpass,
      name: name.replace(/ /ig, '_'),
      version: v.v
    })
    let data = '';
    const req =  http.request({
      hostname: '127.0.0.1',
      port: 15487,
      method: 'POST',
      path: '/',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': conf.length
      }
    }, (res) => {
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
      res.on('error', function(err) {
        reject(err);
        });
    });
    req.on('error', function(err) {
      reject(err);
    })
    req.write(conf);
    req.end()
  });
}

module.exports = park;
