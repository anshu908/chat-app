<script>
    const chatContent = document.getElementById("chat-content");
    const chatForm = document.getElementById("chat-form");
    const userInput = document.getElementById("user-input");

    async function fetchResponse(userMessage) {
        const assistantDetails = `YOUR PROPMT`;

        try {
            const response = await fetch("https://backend.buildpicoapps.com/aero/run/llm-api?pk=v1-Z0FBQUFBQm5IZkJDMlNyYUVUTjIyZVN3UWFNX3BFTU85SWpCM2NUMUk3T2dxejhLSzBhNWNMMXNzZlp3c09BSTR6YW1Sc1BmdGNTVk1GY0liT1RoWDZZX1lNZlZ0Z1dqd3c9PQ==", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prompt: `${assistantDetails}\nUser: ${userMessage}\nRiya Sharma:`
                })
            });

            if (!response.ok) {
                return "Error: Please try again later.";
            }

            const data = await response.json();
            return data.status === "success" ? data.text : "Error: Please try again later.";
        } catch (error) {
            console.error("Error:", error);
            return "Error: Please try again later.";
        }
    }

    chatForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const userMessage = userInput.value.trim();
        if (!userMessage) return;

        // Display user message
        const userMessageElement = document.createElement("div");
        userMessageElement.textContent = userMessage;
        userMessageElement.classList.add("user-message");
        chatContent.appendChild(userMessageElement);

        userInput.value = ""; // Clear input field

        // Fetch and display bot response
        const botResponse = await fetchResponse(userMessage);
        const botMessageElement = document.createElement("div");
        botMessageElement.textContent = botResponse;
        botMessageElement.classList.add("bot-message");
        chatContent.appendChild(botMessageElement);

        // Scroll to bottom
        chatContent.scrollTop = chatContent.scrollHeight;
    });
</script>
