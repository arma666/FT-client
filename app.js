
const genpass = Math.random().toString(36).slice(-8);
const config = require('./config.json');
const run = require('./ext/run.js');
const sshtun = require('./ext/sshcon.js');
const park = require('./ext/park.js')
const tun = require('./ext/tunel.js')
const monit = require('./ext/monit.js')
const getver = require('./ext/getver.js')
const getzip = require('./ext/getzip.js')
const monitservice = require('./ext/monservice.js')
const d1 = new Date();

run(
  [
    'netsh advfirewall firewall add rule name="MyVNC" dir=in action=allow protocol=TCP localport=5900',
    'netsh advfirewall firewall delete rule name="MyVNC"',
    'vncsrv\\winvnc.exe -install',
    "vncsrv\\setpasswd.exe "+genpass+" "+genpass,
    'net stop uvnc_service'
  ]
)

setTimeout(start,60000)

function start() {
  sshtun().then(server => {
    console.log('ssh ok');
    chver(server)
  },
  error => {
    console.error('cant connect. Reconnect...');
  })
}


function chver(server) {
  getver().then(ver => {
    if(ver.v){
      parking(server);
    }
    else {
      console.log('new version - update');
      getzip(server, __dirname, ver.n);
    }
  })
}



function parking(server) {
  park(genpass).then( data => {
    console.log(data);
    tunel(parseInt(data),server)
  })
  .catch(function(e){
    console.log('http eror. restarting...',e);
    server.close();
  })
}

function tunel(port,server) {
  tun(port).then(connect => {
    connect.on('forward-in', function (port) {
      console.log('Forwarding :' + port);
      monitor(server,connect,port)
    });
    connect.on('error', function (e) {
      server.close();
      connect.end();
      console.log('eeeeee :' + e);
    });
  })
  .catch(function(e){
    console.log('http eror. restarting...',e);
  });


}

function monitor(server,connect) {
  let d2 = new Date();
  console.log((d2-d1)/1000/60);
  if ( (d2-d1)/1000/60>180 ){
    server.close();
    connect.end();
  }
  else
    monit().then( data => {
      if (data!='yes') {
          console.log('monit -',data);
        console.log('no monit connect. restarting...');
        server.close();
        connect.end();
        setTimeout(start,5000)
      }
      else
        console.log('monit -',data);
        setTimeout(monitor,5000,server, connect)
    })
    .catch(function(e){
      console.log('http eror. restarting...',e);
      connect.end();
      server.close();
      setTimeout(start,5000)
    })
}
