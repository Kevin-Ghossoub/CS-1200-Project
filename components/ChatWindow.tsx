
import React, { useRef, useEffect } from 'react';
import useChat from '../hooks/useChat';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import LoadingSpinner from './LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import { LogoutIcon } from './icons';

const ChatWindow: React.FC = () => {
  const { messages, sendMessage, isLoading } = useChat();
  const { logout } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex h-full max-h-[95vh] w-full max-w-4xl flex-col rounded-2xl border border-white/10 bg-black/20 shadow-2xl backdrop-blur-lg">
      <header className="flex items-center justify-between space-x-3 border-b border-white/10 p-4">
        <div className="flex items-center space-x-3">
          <div className="h-4 w-4 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 animate-pulse"></div>
          <h1 className="text-xl font-bold text-gray-200">Aura AI Health Advisor</h1>
        </div>
        <button onClick={logout} className="p-2 text-gray-400 hover:text-white hover:bg-slate-700/50 rounded-full transition-colors" aria-label="Logout">
          <LogoutIcon className="h-5 w-5" />
        </button>
      </header>
      
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="flex flex-col space-y-4">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="flex items-center space-x-2">
                 <LoadingSpinner />
                 <p className="text-sm text-gray-400">Aura is thinking...</p>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="border-t border-white/10 p-2 sm:p-4">
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};

export default ChatWindow;