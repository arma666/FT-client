const config = require('../config.json');
const openSshTunnel = require('open-ssh-tunnel');
function openATunnel() {
  return new Promise(function(resolve, reject) {
  const server = openSshTunnel({
    host: config.host,
    username: config.user,
    port: config.port,
    password: config.pass,
    srcPort: 8080,
    srcAddr: '127.0.0.1',
    dstPort: 8080,
    dstAddr: '127.0.0.1',
    readyTimeout: 10000,
    forwardTimeout: 10000,
    localPort: 15487,
    localAddr: '127.0.0.1'
  }, function(error, clientConnection) {
      reject(error);
  });
  resolve(server);
});
}


module.exports = openATunnel;
