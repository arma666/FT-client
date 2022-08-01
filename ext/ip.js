var os = require( 'os' );
var networkInterfaces = os.networkInterfaces();
var arr = [];
//console.log(networkInterfaces);
for (var x in networkInterfaces) {
  for (var y in networkInterfaces[x]) {
    if ((networkInterfaces[x][y].family == 'IPv4') && (networkInterfaces[x][y].address!='127.0.0.1'))  {
      arr.push(networkInterfaces[x][y].address)
    }
  }
}
module.exports = arr;
