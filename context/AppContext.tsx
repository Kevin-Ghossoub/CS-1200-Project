
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { UserData, Plan, HistoryItem } from '../types';
import { useAuth } from './AuthContext';

type Page = 'home' | 'insights' | 'profile' | 'userInput' | 'aiPlan' | 'uploadFile' | 'healthTips' | 'feedback' | 'welcome' | 'login' | 'signup';

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
  savedPlans: Plan[];
  saveActivePlan: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [page, setPageState] = useState<Page>('home');
  const [pageState, setPageStateObject] = useState<any>(null);

  const [userData, setUserDataState] = useState<UserData | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activePlan, setActivePlan] = useState<Plan | null>(null);
  const [savedPlans, setSavedPlans] = useState<Plan[]>([]);
  
  const safeJSONParse = (key: string, defaultValue: any) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error parsing JSON from localStorage key "${key}":`, error);
      return defaultValue;
    }
  };

  useEffect(() => {
    if (user?.email) {
      setUserDataState(safeJSONParse(`healify_userData_${user.email}`, null));
      setHistory(safeJSONParse(`healify_history_${user.email}`, []));
      setSavedPlans(safeJSONParse(`healify_savedPlans_${user.email}`, []));
      setPageState('home');
    } else {
      setPageState('welcome');
      setUserDataState(null);
      setHistory([]);
      setSavedPlans([]);
    }
  }, [user]);

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

  const saveActivePlan = () => {
    if (activePlan) {
      const newSavedPlans = [...savedPlans, activePlan];
      setSavedPlans(newSavedPlans);
      if(user?.email) localStorage.setItem(`healify_savedPlans_${user.email}`, JSON.stringify(newSavedPlans));
    }
  };

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
    savedPlans,
    saveActivePlan
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