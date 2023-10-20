import React, { useState } from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { AuthLayout } from "./components/AuthLayout";
import axios from 'axios';
import './styles/ChatApp.css';
import InputChat from './components/Form';
import ChatHistory from './components/ChatHistory';

const domain = "https://api-by-node.azurewebsites.net";

//コメント追加しました
//Added more comment
const ChatComponent = () => {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState<{ id: number; message: string }[]>([]);

  const handleSendMessage = async () => {
    try {
      const userMessage = { id: chatHistory.length + 1, message: `You: ${inputText}` };
      setChatHistory((prevHistory) => [...prevHistory, userMessage]);

      const response = await axios.post( domain + '/api/chat', { inputText });
      console.log(domain);
      const gptMessage = { id: response.data.lastMessageId, message: `GPT: ${response.data.response}` };
      setChatHistory((prevHistory) => [...prevHistory, gptMessage]);

      setInputText('');
    } catch (error) {
      const errorMessage = { id: chatHistory.length + 1, message: `GPT: 通信に失敗しました。` };
      setChatHistory((prevHistory) => [...prevHistory, errorMessage]);
    }
  };

  return (
    <div>
      <div className="chat-container">
        <ChatHistory chatHistory={chatHistory} />
      </div>
      <div className="input-container">
        <footer>
          <InputChat inputText={inputText} handleSendMessage={handleSendMessage} setInputText={setInputText} />
        </footer>
      </div>
    </div>
  );
};

const MainContent = () => {
  return (
    <div>
      {/* 認証前表示 */}
      <UnauthenticatedTemplate>
        <AuthLayout>
          <h5 className="card-title">Please sign-in to see your ChatGPT window.</h5>
        </AuthLayout>
      </UnauthenticatedTemplate>

      {/* 認証後表示 */}
      <AuthenticatedTemplate>
        <header className="app-header">
          <AuthLayout>
            <h3 id='title'>GPT-3.5</h3>
          </AuthLayout>
        </header>
        <main>
          <ChatComponent />
        </main>
      </AuthenticatedTemplate>
    </div>
  )
}


const App = () => {
  return (
      <MainContent />
  );
};

export default App;
