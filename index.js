const axios = require('axios')
const exec = require('child_process').exec

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
      exec(command, puts)

    } else {
      console.log("SAVED")
    }
  }
}

axios.get("https://api.github.com/users/USERNAME_HEREHERPD/repos")
  .then(res => cleanUp(res.data))

// TODO:
// ADD README
// Its not perfect. You need to input your token once and username twice. ALSO - add “save-” to any repo you want to keep (or create an array of names of you want to keep and work that in). Will have to run a couple times in the terminal because it only does like 20 at a time. BUT - thats way easier than one at a time…
