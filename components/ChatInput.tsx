import React, { useState, useRef } from 'react';
import { SendIcon, PaperclipIcon } from './icons';
import { FileData } from '../types';

interface ChatInputProps {
  onSend: (text: string, file: FileData | null) => void;
  disabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState<FileData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if ((text.trim() || file) && !disabled) {
      onSend(text.trim(), file);
      setText('');
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // FIX: Corrected optional chaining syntax from `? .[0]` to `?.[0]`.
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile({
          name: selectedFile.name,
          type: selectedFile.type,
          base64: (reader.result as string).split(',')[1],
        });
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center rounded-lg border border-white/20 bg-slate-800/50 p-2">
        <textarea
          id="chat-input"
          rows={1}
          className="mx-2 block w-full resize-none border-0 bg-transparent p-2.5 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-0"
          placeholder="Ask about your health..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        <button
          type="button"
          // FIX: Corrected optional chaining syntax from `? .click()` to `?.click()`.
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="inline-flex cursor-pointer justify-center rounded-full p-2 text-gray-400 hover:bg-slate-700/50 disabled:opacity-50"
        >
          <PaperclipIcon className="h-5 w-5" />
          <span className="sr-only">Attach file</span>
        </button>
        <button
          type="button"
          onClick={handleSend}
          disabled={disabled || (!text.trim() && !file)}
          className="inline-flex cursor-pointer justify-center rounded-full p-2 text-blue-500 hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SendIcon className="h-5 w-5" />
          <span className="sr-only">Send message</span>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
      </div>
      {file && (
        <div className="mt-2 flex items-center text-xs text-gray-400">
          <PaperclipIcon className="mr-1 h-4 w-4" />
          <span>{file.name}</span>
        </div>
      )}
    </div>
  );
};

export default ChatInput;
