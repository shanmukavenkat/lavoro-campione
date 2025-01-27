import React, { useState } from 'react';
import { Chat } from './components/Chat';
import Sidebar from './components/Sidebar';
import { Message } from './types/college';
import { v4 as uuidv4 } from 'uuid';
import { processUserMessage } from './utils/chatUtils';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      role: 'assistant',
      content: 'Hello! 👋 I can help you find information about colleges in Andhra Pradesh. Try asking about:\n\n' +
               '🏛️ Specific colleges (e.g., "Tell me about Andhra University")\n' +
               '🎓 Specific branches (e.g., "Tell me about CSE branch")\n' +
               '📚 Available courses (e.g., "Which colleges offer B.Tech?")',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await processUserMessage(content);
      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: 'Sorry, there was an error processing your request. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleCourseClick = (course: string) => {
    if (course === "courses") {
      setInputValue("What courses are available?");
    } else {
      const message = `Tell me about ${course} course details, including available branches and colleges.`;
      setInputValue(message);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
        <Sidebar 
          onClose={() => setIsSidebarOpen(false)} 
          onSuggestionClick={handleSuggestionClick}
          onCourseClick={handleCourseClick}
        />
      </div>
      <main className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-gray-800">AP College Guide</h2>
          </div>
        </header>
        <div className="flex-1 overflow-hidden">
          <Chat
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </div>
      </main>
    </div>
  );
}