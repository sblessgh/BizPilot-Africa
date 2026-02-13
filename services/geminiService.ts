
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateProductDescription = async (productName: string, category: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a short, catchy 2-sentence marketing description for a product named "${productName}" in the category "${category}" for an African retail shop.`,
      config: {
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "Expertly sourced product for your daily needs.";
  }
};

export const analyzeSales = async (salesData: any[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this sales data and provide 3 quick bullet points of insight: ${JSON.stringify(salesData)}`,
    });
    return response.text;
  } catch (error) {
    return "Keep up the great sales momentum!";
  }
};
