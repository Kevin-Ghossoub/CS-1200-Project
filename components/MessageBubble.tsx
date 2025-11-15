
import React from 'react';
import { Message } from '../types';
import { UserIcon, SparklesIcon } from './icons';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600">
          <SparklesIcon className="h-5 w-5 text-white" />
        </div>
      )}
      
      <div 
        className={`max-w-md rounded-2xl px-4 py-3 text-sm md:text-base ${
          isUser 
            ? 'rounded-br-lg bg-blue-600 text-white' 
            : 'rounded-bl-lg bg-slate-700/50 text-gray-200'
        }`}
      >
        <div className="prose prose-invert prose-sm text-white" dangerouslySetInnerHTML={{__html: message.text}}></div>
        {message.imageUrl && <img src={message.imageUrl} alt="Uploaded content" className="mt-2 rounded-lg max-w-xs"/>}
      </div>

      {isUser && (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-600">
          <UserIcon className="h-5 w-5 text-white" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
