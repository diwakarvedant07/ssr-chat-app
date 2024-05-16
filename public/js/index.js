document.addEventListener('DOMContentLoaded', function () {


    const chatContainer = document.querySelector('.chat-container')
    var allChats = []
    const apiUrl = 'http://172.16.4.211:5555'
    var apiKey
    var Token

    var User = {
        name: "anonymous",
        ip: "bullshit"
    }
    const socket = io(apiUrl);
    getUserName()
    connectSockets()


    document.querySelector('.input-btn').addEventListener('click', async function () {

        document.body.style.zoom="100%"
        
        

        var message = document.querySelector('.input-box')
        //console.log(message.value);

        var obj = {
            user: User.name,
            message: message.value
        }
        try {
            var response = await fetch(apiUrl + "/chat", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "x-access-token": Token
                },
                body: JSON.stringify(obj),
            });

            sendMessageToSocket(obj)
            closeKeyboard()
            //document.body.style.zoom="100%"
        } catch (error) {
            console.log(error)
        }


        createMessageCard(obj)
        message.value = '';
    })

    var inputBox = document.querySelector('.input-box')

    inputBox.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.querySelector(".input-btn").click();
        }
    });




    function createMessageCard(message) {
        var messageBox = document.createElement('div');
        messageBox.setAttribute('class', 'message-box');
        messageBox.innerHTML = `
            <div class="user-details">
                ${message.user}
            </div>

            <div class="message">
                ${message.message}
            </div>

        `
        chatContainer.appendChild(messageBox)

        chatContainer.scrollTop = chatContainer.scrollHeight;
        window.scrollTo(0, document.body.scrollHeight);

    }

    function closeKeyboard() {
        // Create a temporary element and focus on it
        const tmpElement = document.createElement('input');
        document.body.appendChild(tmpElement);
        tmpElement.focus();
        // Remove the temporary element
        document.body.removeChild(tmpElement);
      }

    async function getUserName() {
        apiKey = document.getElementById("babaGanush").innerHTML
        const ip = document.getElementById("ipaddress").innerHTML
        //console.log("found ip:", ip)

        try {
            var response = await fetch(apiUrl + `/register/checkIp/${ip}`, {
                method: "GET",
                headers: {
                    "x-auth-token": apiKey
                }
            }).then((response) => response.json()).then((data) => {
                //console.log(data)
                User = data.data;
                Token = data.token

                getAllChats()

                allChats.forEach((message) => {
                    createMessageCard(message)
                })
            });



        } catch (error) {
            console.log(error.stack)
        }
    }

    async function getAllChats() {
        try {
            var response = await fetch(apiUrl + `/chat`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "x-access-token": Token
                },
            });

            var data = await response.json();
            allChats = data;
            //console.log(allChats)

            allChats.forEach((chat) => {
                createMessageCard(chat)
            })

        } catch (error) {
            console.log(error)
        }
    }



    function connectSockets(){
        
        socket.on("connect_error", (err) => {
            console.log("connect_error: ", err);
        });
        socket.on("connect", () => {
            console.log("connected");
        });

        socket.on("Socket",(message)=>{
            //console.log(message)
            createMessageCard(message)
        })
    }

    function sendMessageToSocket(message){
        socket.emit("Socket",message)
    }


    document.querySelector('.hello').addEventListener('click', some)
    //hello(12,13)
    //hello(24,45)
    var some = hello(36,46)
    some()
    var some2 = hello(48,67)
    some2()
    document.querySelector('.hello').addEventListener('click', some)

    function hello(arg1, arg2) {
        console.log("getting triggered")
        return function() {
            console.log(arg1, " + ",arg2, "=", arg1+arg2)
            document.querySelector('.hello').removeEventListener('click', some)
            var some = hello(48,67)
            document.querySelector('.hello').addEventListener('click', some)
        }
    }   
    
})