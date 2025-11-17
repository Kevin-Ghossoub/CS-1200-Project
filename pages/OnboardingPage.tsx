import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Button from '../components/common/Button';
import { ArrowLeftIcon } from '../components/icons';

const questions = [
    { key: 'age', label: 'What is your age?', type: 'number', placeholder: 'e.g., 25' },
    { key: 'gender', label: 'What is your gender?', type: 'text', placeholder: 'e.g., Female, Male, Non-binary' },
    { key: 'weight', label: 'What is your current weight in kilograms?', type: 'number', placeholder: 'e.g., 70' },
    { key: 'height', label: 'What is your height in centimeters?', type: 'number', placeholder: 'e.g., 175' },
    { key: 'lifestyle', label: 'How would you describe your current lifestyle?', type: 'text', placeholder: 'e.g., Sedentary, Moderately active' },
    { key: 'goals', label: 'What are your main health goals?', type: 'text', placeholder: 'e.g., Lose weight, build muscle' },
];

const OnboardingPage: React.FC = () => {
    const { userData, setUserData, setPage } = useAppContext();
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({
        age: '',
        gender: '',
        weight: '',
        height: '',
        lifestyle: '',
        goals: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAnswers(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = () => {
        if (userData) {
            const updatedUserData = {
                ...userData,
                age: parseInt(answers.age, 10) || 0,
                gender: answers.gender,
                weight: parseInt(answers.weight, 10) || 0,
                height: parseInt(answers.height, 10) || 0,
                lifestyle: answers.lifestyle,
                goals: answers.goals,
            };
            setUserData(updatedUserData);
            setPage('home');
        }
    };
    
    const currentQuestion = questions[currentStep];
    const progress = ((currentStep + 1) / questions.length) * 100;

    return (
        <div className="bg-white h-full p-6 flex flex-col">
            <header className="flex items-center">
                {currentStep > 0 ? (
                    <button onClick={prevStep} className="p-2 -ml-2 mr-2">
                        <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
                    </button>
                ) : <div className="w-10 h-10"></div>}
                 <h1 className="text-xl font-bold text-gray-900">Tell us about you</h1>
            </header>

            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-4">
                <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="flex-1 flex flex-col justify-center">
                <div className="space-y-2">
                    <label htmlFor={currentQuestion.key} className="text-lg font-semibold text-gray-800">{currentQuestion.label}</label>
                    <input
                        type={currentQuestion.type}
                        id={currentQuestion.key}
                        name={currentQuestion.key}
                        value={answers[currentQuestion.key as keyof typeof answers]}
                        onChange={handleInputChange}
                        placeholder={currentQuestion.placeholder}
                        required
                        className="mt-1 block w-full text-lg p-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
            </div>
            
            <div className="pt-4">
                {currentStep < questions.length - 1 ? (
                    <Button
                        fullWidth
                        onClick={nextStep}
                        disabled={!answers[currentQuestion.key as keyof typeof answers]}
                    >
                        Next
                    </Button>
                ) : (
                    <Button
                        fullWidth
                        onClick={handleSubmit}
                        disabled={!answers[currentQuestion.key as keyof typeof answers]}
                    >
                        Finish
                    </Button>
                )}
            </div>
        </div>
    );
};

export default OnboardingPage;