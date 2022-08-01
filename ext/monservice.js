const { exec } = require("child_process");

function chec() {
  exec("sc query uvnc_service", (error, data, getter) => {
  	if(error){
  		console.log("error",error.message);
      setTimeout(chec,30000)
  		return;
  	}
  	if(getter){
  		console.log("data",data);
      setTimeout(chec,30000)
  		return;
  	}
  	console.log("data",data.includes('RUNNING'));
    if (!data.includes('RUNNING')){
      exec('net start uvnc_service');
      console.log('servise stoped. run it');
    }
    setTimeout(chec,30000)
  });
}
module.exports = chec;
