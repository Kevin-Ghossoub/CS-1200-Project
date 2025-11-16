

// FIX: Import Message type.
import { GoogleGenAI } from "@google/genai";
import { UserData, FileData, Message } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash';

// FIX: Add getHealthAdvice function to handle chat messages.
export const getHealthAdvice = async (prompt: string, userData: Partial<UserData>, history: Message[]): Promise<string> => {
    const systemInstruction = `You are Aura, a friendly, empathetic, and professional AI health advisor. Your goal is to provide helpful, safe, and encouraging health advice. 
IMPORTANT: You are an AI assistant, not a medical professional. Always include a disclaimer in your responses that you cannot provide medical advice and the user should consult a healthcare provider for any medical concerns.
Use markdown for formatting. Keep responses concise and easy to understand.
Here is some information about the user you are talking to:
- Age: ${userData.age || 'Not specified'}
- Gender: ${userData.gender || 'Not specified'}
- Weight: ${userData.weight ? `${userData.weight} kg` : 'Not specified'}
- Height: ${userData.height ? `${userData.height} cm` : 'Not specified'}
- Lifestyle: ${userData.lifestyle || 'Not specified'}
- Primary Health Goal: ${userData.goals || 'Not specified'}
`;

    const contents = history.map(msg => {
        const role = msg.sender === 'user' ? 'user' : 'model';
        const textPart = { text: msg.text.replace(/<[^>]*>?/gm, '') };
        // FIX: Explicitly type `parts` to accommodate both text and image data, preventing a TypeScript error.
        const parts: ({ text: string } | { inlineData: { mimeType: string, data: string } })[] = [textPart];

        if (msg.imageUrl) {
            try {
                const [header, base64] = msg.imageUrl.split(',');
                const mimeType = header.match(/:(.*?);/)?.[1];
                if (mimeType && base64) {
                    parts.push({ inlineData: { mimeType, data: base64 } });
                }
            } catch (e) {
                console.error("Error processing imageUrl for Gemini", e);
            }
        }
        return { role, parts };
    });

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: contents,
            config: {
                systemInstruction: systemInstruction,
            },
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching from Gemini API:", error);
        throw new Error("Failed to get health advice from AI.");
    }
};


const constructPlanPrompt = (goal: string, topic: string, userData: UserData, file?: FileData | null) => {
    const userProfile = `
        - Name: ${userData.name}
        - Age: ${userData.age}
        - Weight: ${userData.weight} kg
        - Primary Health Goal: ${userData.goals}
    `;

    const systemInstruction = `You are 'Healify', a friendly and professional AI health planner. Your task is to generate a personalized health plan based on the user's profile and their specific goal for this plan. The plan should be actionable, encouraging, and easy to understand. Structure your response in JSON format with three keys: "title", "content", and "tags".
- "title": A catchy, short title for the plan (e.g., "7-Day Energy Boost").
- "content": The main advice, formatted as a single string with markdown for lists, bold text, etc. (e.g., "### Morning Routine\\n- Drink a glass of water...").
- "tags": An array of 3 short strings that summarize the key activities (e.g., ["Daily walk", "Screen time", "Morning light"]).`;
    
    const userRequest = `My profile is as follows:
${userProfile}

My specific goal for this plan is: "${goal}".
The general topic is: "${topic}".
Please generate a personalized health plan.`;

    const parts = [
      { text: userRequest },
      ...(file ? [{ inlineData: { mimeType: file.type, data: file.base64 } }] : [])
    ];

    return {
        systemInstruction,
        contents: { parts },
    };
};


export const generatePlan = async (goal: string, topic: string, userData: UserData, file: FileData | null = null): Promise<string> => {
    try {
        const { systemInstruction, contents } = constructPlanPrompt(goal, topic, userData, file);

        const response = await ai.models.generateContent({
            model: model,
            contents: contents,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
            },
        });
        
        return response.text;
    } catch (error) {
        console.error("Error fetching from Gemini API:", error);
        return JSON.stringify({
            title: "Error Generating Plan",
            content: "There was an error generating your plan. Please check your connection and try again.",
            tags: ["error"]
        });
    }
};
