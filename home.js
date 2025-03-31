document.getElementById("logoutButton").addEventListener("click", function () {
    alert("Logging out...");
    window.location.href = "index.html";
});

function sendMessage() {
    let userInput = document.getElementById("user-input").value.trim();
    let chatBox = document.getElementById("chat-box");

    if (userInput === "") return;

    // Create user message bubble
    let userMessage = document.createElement("div");
    userMessage.classList.add("message", "user-message");
    userMessage.innerHTML = `<b>You:</b> ${userInput}`;
    chatBox.appendChild(userMessage);

    // Send request to chatbot API
    fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        let botMessage = document.createElement("div");
        botMessage.classList.add("message", "bot-message");

        if (data.reply) {
            // Fix bold text and line breaks
            botMessage.innerHTML = `<b>Bot:</b> ${data.reply.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>")}`;
        } else {
            botMessage.innerHTML = `<b>Bot:</b> Sorry, I didn't understand that.`;
        }
        
        chatBox.appendChild(botMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => {
        console.error("Error:", error);
        chatBox.innerHTML += `<p><b>Bot:</b> Error connecting to the chatbot.</p>`;
    });

    document.getElementById("user-input").value = "";
}

// Handle Enter key
document.getElementById("user-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});
