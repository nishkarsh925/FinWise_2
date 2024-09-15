// Event listener for the send button
document.getElementById('send-btn').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value.trim();

    if (userInput !== '') {
        addMessage(userInput, 'user-message');
        document.getElementById('user-input').value = ''; // Clear input field
        
        // Call your AI model's API here
        fetchYourAIResponse(userInput);
    }
});

// Event listener for the new chat button
document.getElementById('new-chat-btn').addEventListener('click', function() {
    document.getElementById('chat-box').innerHTML = ''; // Clear chat messages
});

// Function to display messages in the chatbox
function addMessage(text, className) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('chat-message', className);
    messageContainer.textContent = text;
    document.getElementById('chat-box').appendChild(messageContainer);

    // Scroll to the bottom after new message
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
}

// Function to fetch AI response from the API
function fetchYourAIResponse(userInput) {
    // Replace with your actual API endpoint and API key
    const API_URL = 'https://0xb2978ca7782e13a3b130f3230804a26c9d56d590.us.gaianet.network/v1/chat/completions'; // Replace with correct API endpoint
    const MODEL_NAME = 'Personal-Financial-Advisor'; // Replace with your actual model
   

    const data = {
        model: MODEL_NAME,
        messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: userInput }
        ]
    };

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
       
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (!data || !data.choices || data.choices.length === 0) {
            addMessage('No response from AI model.', 'bot-message');
            return;
        }

        const aiResponse = data.choices[0].message.content;
        addMessage(aiResponse, 'bot-message');
    })
    .catch(error => {
        console.error('Error:', error);
        addMessage('Failed to fetch AI response. Check the console for more details.', 'bot-message');
    });
}
