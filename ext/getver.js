
const http = require('http')
const v = require('../v.json');

function getver() {
  return new Promise(function(resolve, reject) {
    let data = '';
    const req =  http.request({
      hostname: '127.0.0.1',
      port: 15487,
      method: 'PATCH',
      path: '/',
    }, (res) => {

      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', () => {
        resolve({v:v.v==data?true:false,n:data});
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

module.exports = getver;
