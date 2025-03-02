document.getElementById("logoutButton").addEventListener("click", function() {
    alert("Logging out...");
    window.location.href = "index.html";  // Redirect to login page
});

// Chatbot Functionality
function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    let chatBox = document.getElementById("chat-box");

    if (userInput.trim() === "") return;

    // Display user message
    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    
    // Send request to backend chatbot
    fetch("http://127.0.0.1:5000/chat", {  // Ensure correct API URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput })
    })
    
    .then(response => response.json())
    .then(data => {
        if (data.reply) {
            chatBox.innerHTML += `<p><strong>Bot:</strong> ${data.reply}</p>`;
        } else {
            chatBox.innerHTML += `<p><strong>Bot:</strong> Sorry, I didn't understand that.</p>`;
        }
        chatBox.scrollTop = chatBox.scrollHeight;  // Auto-scroll
    })
    .catch(error => {
        console.error("Error:", error);
        chatBox.innerHTML += `<p><strong>AI:</strong> Error connecting to the chatbot.</p>`;
    });

    document.getElementById("user-input").value = "";  // Clear input field
}
