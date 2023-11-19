from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationChain
from langchain.chains.conversation.memory import ConversationBufferWindowMemory
from langchain.prompts import (
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
    ChatPromptTemplate,
    MessagesPlaceholder
)
from utils import *

class ChatBot:
    def __init__(self):
        # self.llm = ChatOpenAI(model_name="gpt-3.5-turbo", openai_api_key="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")
        self.llm = ChatOpenAI(model_name="gpt-3.5-turbo", openai_api_key="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")
        self.buffer_memory = ConversationBufferWindowMemory(k=3, return_messages=True)
        self.conversation_history = []  # New line to store conversation history

        system_msg_template = SystemMessagePromptTemplate.from_template(template="""Answer the question as truthfully as possible and explain answer in detail also give chemical reactions(wherever required) with your explaination and answer every answer in points using the provided context, also you have to give answer in the same language in which question was asked to you, if you don't know the answer to the particular section or if the questions or query is out of the context just say I am an AI school assistant and I am trained over a dataset which helps the school student and this question does not seems relevant.
        """)
        human_msg_template = HumanMessagePromptTemplate.from_template("{input}")
        prompt_template = ChatPromptTemplate.from_messages([system_msg_template, MessagesPlaceholder(variable_name="history"), human_msg_template])
        self.conversation = ConversationChain(memory=self.buffer_memory, prompt=prompt_template, llm=self.llm, verbose=True)

    def process_chat_query(self, query):
        # Add logic to handle and refine the query if needed
        # You may call the necessary functions from your existing code
        conversation_string = self.get_conversation_string()  # Use the method within the class
        refined_query = query_refiner(conversation_string, query)
        context = find_match(refined_query)
        
        # Get the response from the chatbot
        response = self.conversation.predict(input=f"Context:\n {context} \n\n Query:\n{query}")
        
        # Update the conversation history
        self.conversation_history.append({"input": query, "output": response})

        return response

    def get_conversation_string(self):
        conversation_string = ""
        for entry in self.conversation_history:
            conversation_string += f"Human: {entry['input']}\n"
            conversation_string += f"Bot: {entry['output']}\n"
        return conversation_string
