const http = require('http');
const fs = require('fs');
const extract = require('extract-zip')

const file = fs.createWriteStream("update.zip");

function getzip(server,dir,v) {
  const request = http.get("http://127.0.0.1:15487", function(response) {
    server.close();
    response.pipe(file)
    file.on('finish', function() {
      //unzip
      extract('update.zip', { dir: dir })
      fs.writeFile('v.json', '{"v":"'+v+'"}',()=>{})
    })
  })

}


module.exports = getzip;
