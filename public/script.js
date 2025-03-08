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
            model: "google/gemini-2.0-pro-exp-02-05:free",
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