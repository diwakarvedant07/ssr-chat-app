document.addEventListener('DOMContentLoaded', function () {

    const chatContainer = document.querySelector('.chat-container')
    var allChats = []
    const apiUrl = 'http://172.16.6.180:5555'

    var User = {
        name: "anonymous",
        ip: "bullshit"
    }

    getUserName()
    getAllChats()
    allChats.forEach((message)=>{
        createMessageCard(message)
    })

    document.querySelector('.input-btn').addEventListener('click', async function () {
        var message = document.querySelector('.input-box')
        console.log(message.value);

        var obj = {
            user: User.name,
            message: message.value
        }
        try {
            var response = await fetch(apiUrl + "/chat", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(obj),
            });
        } catch (error) {
            console.log(error)
        }


        createMessageCard(obj)
        message.value = '';
    })


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
    }

    async function getUserName() {
        console.log("hello")
        const ip = document.getElementById("ipaddress").innerHTML
        console.log("found ip:" , ip)

        try {
            var response = await fetch(apiUrl + `/register/checkIp/${ip}`, {
                method: "GET",
            });

            var data = await response.json();
            User = data;
            console.log(User)

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
                },
            });

            var data = await response.json();
            allChats = data;
            console.log(allChats)

            allChats.forEach((chat)=>{
                createMessageCard(chat)
            })

        } catch (error) {
            console.log(error)
        }
    }
})