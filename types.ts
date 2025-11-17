export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  imageUrl?: string;
}

export interface User {
  email: string;
}

export interface UserData {
  name: string;
  email: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  lifestyle: string;
  goals: string;
}

export interface Plan {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
}

export interface HistoryItem {
  id: string;
  prompt: string;
  timestamp: string;
}

export interface FileData {
  name: string;
  type: string;
  base64: string;
}