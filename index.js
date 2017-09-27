const axios = require('axios')
var exec = require('child_process').exec

function checkName(name) {
  var array = name.split("-")
  var param = array[0]
  if (param == "save") {
    return false
  } else {
    return true
  }
}

function createCommand(name) {
  return `curl -X DELETE -H 'Authorization: token TOKEN_HERE' https://api.github.com/repos/USERNAME_HERE/${name}`
}

function puts(error, stdout, stderr) {
  console.log(stdout, "DELETED")
}

function cleanUp(data) {
  for (var i = 0; i < data.length; i++) {
    let name = data[i].name

    if (checkName(name)) {
      let command = createCommand(name)
      exec(command, puts);

    } else {
      console.log("SAVED")
    }
  }
}

axios.get("https://api.github.com/users/USERNAME_HERE/repos")
  .then(res => cleanUp(res.data))
