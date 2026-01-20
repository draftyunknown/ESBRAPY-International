
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIAssistance = async (message: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
      config: {
        systemInstruction: "You are the accessibility assistant for ESBRAPY INTERNATIONAL, a premier technical contractor located at Bristol Court, Ngong Rd, Nairobi (Silverpool Office Suites). We specialize in mechanical engineering, HVAC, and maintenance services. Your goal is to help users navigate the website, understand our services (online estimates for HVAC and on-site engineering support), and answer questions about our wheelchair-accessible facilities (car park, entrance, ramps at our Nairobi office). Be polite, professional, and prioritize accessibility information.",
      },
    });
    return response.text || "I'm sorry, I couldn't process that. How can I help you with our services today?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I am having trouble connecting right now. Please call our support line at 0722 278292 for immediate assistance.";
  }
};
