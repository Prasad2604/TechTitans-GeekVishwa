from flask import Flask, request, jsonify
from chatbot import ChatBot
from flask_cors import CORS

app = Flask(__name__)
# CORS(app)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
# Initialize the chatbot
chatbot = ChatBot()

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    query = data.get('query')

    # Process the query using the chatbot
    response = chatbot.process_chat_query(query)
    
    return jsonify({"response": response})

if __name__ == '__main__':
    # app.run(debug=True)
    app.run(threaded=True)
