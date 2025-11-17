import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, UserData } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, pass: string) => Promise<boolean>;
  signup: (name: string, email: string, pass: string) => Promise<UserData>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('healify_currentUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    const trimmedEmail = email.trim();
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const storedUsers = JSON.parse(localStorage.getItem('healify_users') || '{}');
          if (storedUsers[trimmedEmail] && storedUsers[trimmedEmail].password === pass) {           
            const currentUser = { email: trimmedEmail };
            localStorage.setItem('healify_currentUser', JSON.stringify(currentUser));
            setUser(currentUser);
            setIsLoading(false);
            resolve(true);
          } else {
            throw new Error("Invalid email or password.");
          }
        } catch (e: any) {
          setError(e.message);
          resolve(false);
          setIsLoading(false);
        }
      }, 1000);
    });
  };
  
  const signup = async (name: string, email: string, pass: string): Promise<UserData> => {
    setIsLoading(true);
    setError(null);
    const trimmedEmail = email.trim();
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const storedUsers = JSON.parse(localStorage.getItem('healify_users') || '{}');
                if (storedUsers[trimmedEmail]) {
                    throw new Error("An account with this email already exists.");
                }
                const newUsers = { ...storedUsers, [trimmedEmail]: { email: trimmedEmail, password: pass } };
                localStorage.setItem('healify_users', JSON.stringify(newUsers));
                
                const currentUser = { email: trimmedEmail };
                localStorage.setItem('healify_currentUser', JSON.stringify(currentUser));
                setUser(currentUser);
                
                const newUserdata: UserData = {
                  name,
                  email: trimmedEmail,
                  age: 0,
                  gender: '',
                  weight: 0,
                  height: 0,
                  lifestyle: '',
                  goals: '',
                  avatar: `https://api.dicebear.com/8.x/avataaars/svg?seed=${trimmedEmail}`
                };
                localStorage.setItem(`healify_userData_${trimmedEmail}`, JSON.stringify(newUserdata));

                setIsLoading(false);
                resolve(newUserdata);

            } catch(e: any) {
                setError(e.message);
                setIsLoading(false);
                reject(e);
            }
        }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('healify_currentUser');
    setUser(null);
  };
  
  const resetPassword = async (email: string): Promise<void> => {
      setIsLoading(true);
      setError(null);
      return new Promise((resolve) => {
          setTimeout(() => {
            console.log(`Password reset link sent to ${email}`);
            setIsLoading(false);
            resolve();
          }, 1000);
      });
  };


  const value = { user, isLoading, error, login, signup, logout, resetPassword };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
