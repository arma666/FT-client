const config = require('../config.json');
var tunnel = require('reverse-tunnel-ssh');

function tun(port) {
  return new Promise(function(resolve, reject) {
    var conn = tunnel({
      host: config.host,
      username: config.user,
      port: config.port,
      password: config.pass,
      dstHost: '0.0.0.0',
      dstPort: port,
      srcPort: 5900,
      readyTimeout: 10000,
      forwardTimeout: 10000,
    }, function(error, clientConnection) {

      reject(error);
    });

    resolve(conn);

  });
}

module.exports = tun;
