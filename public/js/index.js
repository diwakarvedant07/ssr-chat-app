document.addEventListener('DOMContentLoaded', function () {

    const chatContainer = document.querySelector('.chat-container')

    var User = {
        name: "anonymous",
        ip: "bullshit"
    }

    getUserName()

    document.querySelector('.input-btn').addEventListener('click', async function () {
        var message = document.querySelector('.input-box')
        console.log(message.value);

        var obj = {
            user: User.name,
            message: message.value
        }
        try {
            var response = await fetch("http://172.20.10.2:5555/chat", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(obj),
            });
        } catch (error) {
            console.log(error)
        }


        createMessageCard(message.value)
        message.value = '';
    })


    function createMessageCard(message) {
        var messageBox = document.createElement('div');
        messageBox.setAttribute('class', 'message-box');
        messageBox.innerHTML = `
            <div class="user-details">
                ${User.name}
            </div>

            <div class="message">
                ${message}
            </div>

        `
        chatContainer.appendChild(messageBox)
    }

    async function getUserName() {
        const ip = document.getElementById("ipaddress").innerHTML

        try {
            var response = await fetch(`http://172.20.10.2:5555/register/checkIp/${ip}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                },
            });

            var data = await response.json();
            User = data;
            console.log(User)

        } catch (error) {
            console.log(error)
        }
    }
})