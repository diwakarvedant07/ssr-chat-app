var username = prompt("what is your username")
const apiUrl = 'http://172.16.6.178:5555'

var obj = {
    name: username,
    ip : document.getElementById("ipaddress").innerHTML
}

try {
    var response = fetch(apiUrl + "/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-auth-token": document.getElementById("babaGanush").innerHTML
        },
        body: JSON.stringify(obj),
      });

      console.log(response.status)

      if(response.status == 200) {
        window.location.href = "./index.js";
      }
} catch(error) {
    console.log(error)
}