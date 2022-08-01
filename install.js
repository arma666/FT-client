const run = require('./ext/run.js');
const fs = require('fs');
const prompt = require('prompt');


prompt.start();
prompt.get(['server', 'username', 'pass', 'port', 'Host alias'], function (err, result) {
    
	const conf =
	{
	  "host": result.server,
	  "user": result.username,
	  "pass": result.pass,
	  "port": result.port,
	  "name": result['Host alias']
	}
	fs.writeFile('config.json', JSON.stringify(conf),()=>{})
	run(
    [
      'sc create freeteam binPath= "'+__dirname+'\\freeteam.exe" start= auto && net start freeteam'
    ]
  )
});

