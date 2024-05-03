document.addEventListener('DOMContentLoaded', function () {


    const chatContainer = document.querySelector('.chat-container')
    var allChats = []
    const apiUrl = 'http://172.16.6.178:5555'
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
    
})