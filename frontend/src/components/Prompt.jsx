import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function Prompt() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const userInputRef = useRef(null);
  const chatRef = useRef(null);

  const sendMessage = async () => {
    const userInput = userInputRef.current.value.trim();

    if (userInput !== '') {
      displayMessage(userInput, 'user');
      userInputRef.current.value = '';

      try {
        setLoading(true);

        const response = await axios.post('http://localhost:5000/api/chat', {
          query: userInput,
        });

        const botResponse = response.data.response;

        // Simulate bot response after a short delay (dummy answer)
        setTimeout(() => {
          displayMessage(botResponse, 'bot');
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching data:', error);
        displayMessage('Error fetching data. Please try again.', 'bot');
        setLoading(false);
      }
    }
  };

  const displayMessage = (message, sender) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender: sender },
    ]);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    // Scroll to the bottom when a new message is added
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  return (
    <>
    {/* <div><Background /></div> */}
     <div className="prompt-container" style={{ position: 'relative', zIndex: 2 }}>
      <div className="chat-container">
        <div className="chat-box" style={{marginTop:800,marginLeft:400}}>
          <h2 className="chat-heading">
            ChatMinds: Your Ultimate School Assistant Chatbot
          </h2>
          {/* Chat display area */}
          <div className="chat" id="chat" ref={chatRef}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.sender === 'user' ? 'user' : 'bot'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          {/* Input area */}
          <div className="input-container">
            <input
              type="text"
              placeholder="Type a message..."
              className="input-box"
              id="userInput"
              ref={userInputRef}
              onKeyDown={handleKeyDown}
            />
            <button
              className="send-btn"
              onClick={sendMessage}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Prompt;

