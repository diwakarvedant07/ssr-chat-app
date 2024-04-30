var username = prompt("what is your username")

var obj = {
    name: username,
    ip : document.getElementById("ipaddress").innerHTML
}

try {
    var response = fetch("http://172.20.10.2:5555/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
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