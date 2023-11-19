import React, { useState } from 'react';
import axios from 'axios';

function Prompt() {
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    const userInput = document.getElementById('userInput').value.trim();

    if (userInput !== '') {
      displayMessage(userInput, 'user');
      document.getElementById('userInput').value = '';

      try {
        const response = await axios.post('http://localhost:5000/api/chat', {
          query: userInput
        });

        const botResponse = response.data.response;

        // Simulate bot response after a short delay (dummy answer)
        setTimeout(() => {
          displayMessage(botResponse, 'bot');
        }, 500);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error if needed
      }
    }
  };

  const displayMessage = (message, sender) => {
    setMessages(prevMessages => [
      ...prevMessages,
      { text: message, sender: sender }
    ]);
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {/* Chat display area */}
        <div className="chat" id="chat">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}
            >
              {message.text}
            </div>
          ))}
        </div>
        {/* Input area */}
        <div className="input-container">
          <input type="text" placeholder="Type a message..." className="input-box" id="userInput" />
          <button className="send-btn" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Prompt;
