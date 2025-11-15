
// FIX: Add Message interface to be used in chat components.
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  imageUrl?: string;
}

export interface User {
  email: string;
}

// FIX: Update UserData to include all fields from onboarding and profile.
export interface UserData {
  name: string;
  email: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  lifestyle: string;
  goals: string;
  avatar?: string;
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
