const chatbot = document.getElementById("chatbot");
const toggleBtn = document.getElementById("chatbot-toggle");
const closeBtn = document.getElementById("chatbot-header");
const body = document.getElementById("chatbot-body");
const input = document.getElementById("chatbot-input");
const sendBtn = document.getElementById("chatbot-send");

// Open/close chatbot
toggleBtn.addEventListener("click", () => { chatbot.style.display = "flex"; toggleBtn.style.display = "none"; });
closeBtn.addEventListener("click", () => { chatbot.style.display = "none"; toggleBtn.style.display = "block"; });

// Send message
async function sendMessage() {
    const message = input.value.trim();
    if (!message) return;

    appendMessage(message, "user-msg");
    input.value = "";

    const botReply = document.createElement("div");
    botReply.classList.add("chat-message", "bot-msg");
    botReply.textContent = "Typing...";
    body.appendChild(botReply);
    body.scrollTop = body.scrollHeight;

    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
        });

        const data = await res.json();
        botReply.textContent = data.reply || "Sorry, I couldn't respond.";
        body.scrollTop = body.scrollHeight;
    } catch {
        botReply.textContent = "Error connecting to server.";
    }
}

function appendMessage(msg, className) {
    const div = document.createElement("div");
    div.classList.add("chat-message", className);
    div.textContent = msg;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", e => { if (e.key === "Enter") sendMessage(); });
