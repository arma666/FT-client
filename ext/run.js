function run(cmd) {
  var exec = require('child_process').exec;
  exec(cmd[cmd.length - 1], (err, stdout, stderr) => {
    console.log(cmd[cmd.length - 1]);
    cmd.pop();
    if (cmd.length != 0)
      run(cmd)
    if (err) {

      return;
    }
  });
}
module.exports = run;
