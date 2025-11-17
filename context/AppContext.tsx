import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { UserData, Plan, HistoryItem } from '../types';
import { useAuth } from './AuthContext';

type Page = 'home' | 'insights' | 'profile' | 'userInput' | 'aiPlan' | 'uploadFile' | 'feedback' | 'welcome' | 'login' | 'signup' | 'onboarding';

interface AppContextType {
  page: Page;
  setPage: (page: Page, state?: any) => void;
  pageState: any;
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  history: HistoryItem[];
  addHistoryItem: (item: HistoryItem) => void;
  deleteHistory: () => void;
  activePlan: Plan | null;
  setActivePlan: (plan: Plan | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

var isFirstTimeOpening = true;

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [page, setPageState] = useState<Page>();
  const [pageState, setPageStateObject] = useState<any>(null);

  const [userData, setUserDataState] = useState<UserData | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activePlan, setActivePlan] = useState<Plan | null>(null);
  
  const safeJSONParse = (key: string, defaultValue: any) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error parsing JSON from localStorage key "${key}":`, error);
      return defaultValue;
    }
  };

  // Effect for loading/clearing user data based on auth state
  useEffect(() => {
    if (user?.email) {
      setUserDataState(safeJSONParse(`healify_userData_${user.email}`, null));
      setHistory(safeJSONParse(`healify_history_${user.email}`, []));
    } else {
      setUserDataState(null);
      setHistory([]);
    }
  }, [user]);

  // Effect for handling navigation based on auth state and current page
  useEffect(() => {
    const publicPages: Page[] = ['welcome', 'login', 'signup'];
    if (user?.email) {
      // If user is logged in but on a page for unauthenticated users, redirect to home.
      if (publicPages.includes(page)) {
        setPageState('home');
      }
    } else {
      if (!publicPages.includes(page)) {
        if (!isFirstTimeOpening){
          setPageState('login');
        }
        else{
          setPageState('welcome');
          isFirstTimeOpening = false;
        }
      }
    }
  }, [user, page]);


  const setPage = (newPage: Page, state: any = null) => {
    setPageState(newPage);
    setPageStateObject(state);
  };
  
  const setUserData = (data: UserData) => {
    setUserDataState(data);
    if(user?.email) localStorage.setItem(`healify_userData_${user.email}`, JSON.stringify(data));
  };
  
  const addHistoryItem = (item: HistoryItem) => {
    const newHistory = [...history, item];
    setHistory(newHistory);
    if(user?.email) localStorage.setItem(`healify_history_${user.email}`, JSON.stringify(newHistory));
  };

  const deleteHistory = () => {
    setHistory([]);
    if(user?.email) localStorage.removeItem(`healify_history_${user.email}`);
  }

  const value = {
    page,
    setPage,
    pageState,
    userData,
    setUserData,
    history,
    addHistoryItem,
    deleteHistory,
    activePlan,
    setActivePlan,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};