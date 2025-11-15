
import { useState, useEffect, useCallback } from 'react';
import { Message, UserData, FileData } from '../types';
import { getHealthAdvice } from '../services/geminiService';
import { marked } from 'marked';

const initialQuestions = [
    "To start, what is your age?",
    "What is your gender?",
    "What is your current weight in kilograms?",
    "What is your height in centimeters?",
    "How would you describe your current lifestyle? (e.g., sedentary, moderately active, very active)",
    "What are your main health goals? (e.g., lose weight, build muscle, improve sleep, manage stress)",
];

const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userData, setUserData] = useState<Partial<UserData>>({});

    const addMessage = useCallback((text: string, sender: 'user' | 'ai', imageUrl?: string) => {
        setMessages(prev => [...prev, { id: Date.now().toString(), text, sender, imageUrl }]);
    }, []);

    const startOnboarding = useCallback(() => {
        addMessage("Hello! I'm Aura, your personal AI health advisor. I'm going to ask a few questions to understand your profile better.", 'ai');
        setTimeout(() => {
            addMessage(initialQuestions[0], 'ai');
        }, 1000);
    }, [addMessage]);
    
    useEffect(() => {
        startOnboarding();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleOnboardingResponse = async (answer: string) => {
        const questionKey = Object.keys(userData).length;
        // FIX: Correctly type the keys array to match the UserData interface.
        const keys: (keyof UserData)[] = ['age', 'gender', 'weight', 'height', 'lifestyle', 'goals'];
        
        if (questionKey < keys.length) {
            setUserData(prev => ({ ...prev, [keys[questionKey]]: answer }));
            const nextIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextIndex);

            if (nextIndex < initialQuestions.length) {
                addMessage(initialQuestions[nextIndex], 'ai');
            } else {
                addMessage("Thank you for sharing. I'm now analyzing your information to provide your initial health summary.", 'ai');
                setIsLoading(true);
                try {
                    const finalUserData = { ...userData, [keys[questionKey]]: answer } as UserData;
                    const responseText = await getHealthAdvice("Provide a brief, encouraging initial health summary and then ask me what I'd like to focus on today.", finalUserData, []);
                    const htmlResponse = await marked.parse(responseText);
                    addMessage(htmlResponse, 'ai');
                } catch (error) {
                    console.error(error);
                    addMessage("Sorry, I encountered an error while analyzing your information. Please try again later.", 'ai');
                } finally {
                    setIsLoading(false);
                }
            }
        }
    };
    
    const sendMessage = async (text: string, file: FileData | null) => {
        const userMessageText = text || (file ? `Analyzing: ${file.name}`: '...');
        const imageUrl = file ? `data:${file.type};base64,${file.base64}` : undefined;
        addMessage(userMessageText, 'user', imageUrl);
        setIsLoading(true);

        if (currentQuestionIndex < initialQuestions.length) {
            await handleOnboardingResponse(text);
            setIsLoading(false);
            return;
        }

        try {
            // FIX: Remove the 'file' argument and the incorrect type assertion for 'userData'.
            const responseText = await getHealthAdvice(text, userData, messages);
            const htmlResponse = await marked.parse(responseText);
            addMessage(htmlResponse, 'ai');
        } catch (error) {
            console.error(error);
            addMessage("I'm sorry, I'm having trouble connecting. Please check your connection and try again.", 'ai');
        } finally {
            setIsLoading(false);
        }
    };

    return { messages, sendMessage, isLoading };
};

export default useChat;
