
import { GoogleGenAI } from "@google/genai";

export const generateSmartDescription = async (productName: string): Promise<string> => {
  // If no API key is provided, return a default localized description.
  if (!process.env.API_KEY) return `Premium ${productName} specifically crafted for the high-end Bangladeshi market.`;
  
  try {
    // Initialize the GoogleGenAI client right before making an API call to ensure it uses the most up-to-date API key.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Correct way to call generateContent with model and contents directly.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a compelling 20-word e-commerce product description for a premium product named "${productName}". Target Bangladeshi urban youth. Use an exciting, high-quality tone.`,
    });
    // The .text property is used to access the generated text content from the response object.
    return response.text || "Discover our latest premium collection.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return `Discover the ultimate experience with ${productName}.`;
  }
};
