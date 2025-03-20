const API_KEY = "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";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

async function sendMessage() {
    let messageInput = document.getElementById("message");
    let message = messageInput.value;

    if (!message.trim()) {
        return;
    }

    let chatContainer = document.getElementById("chat");

    let userMessageBubble = document.createElement("div"), aiMessageBubble = document.createElement("div");;
    userMessageBubble.classList.add("bubble-user");
    userMessageBubble.textContent = message;
    chatContainer.appendChild(userMessageBubble);

    messageInput.value = "";
    
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "google/gemini-2.0-flash-exp:free",
            messages: [{ role: "user", content: message }]
        })
    });

    const aiMessageRaw = await response.json();
    aiMessageFinal = aiMessageRaw.choices[0].message.content;

    aiMessageBubble.classList.add("bubble-ai");
    aiMessageBubble.textContent = aiMessageFinal;
    chatContainer.appendChild(aiMessageBubble);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}