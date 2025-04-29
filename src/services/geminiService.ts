
import { toast } from "@/components/ui/sonner";

interface GeminiResponse {
  possibleConditions: string[];
  differentialDiagnosis: string[];
  recommendations: string[];
  managementOptions: string[];
  severity: 'low' | 'medium' | 'high';
  sources: { title: string; url: string }[];
}

export const analyzeSymptoms = async (symptoms: string, age: string, gender: string): Promise<GeminiResponse> => {
  const apiKey = localStorage.getItem("gemini_api_key");
  
  if (!apiKey) {
    toast.error("Please set your Gemini API key first");
    throw new Error("No API key provided");
  }

  try {
    // Updated to use the Gemini 2.5 Pro model
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `As a medical assistant, analyze these symptoms for a ${age} year old ${gender}: "${symptoms}". 
                Provide a structured JSON response with the following format:
                {
                  "possibleConditions": ["list of top 3-5 possible conditions"],
                  "differentialDiagnosis": ["list of 3-5 alternative diagnoses to consider"],
                  "recommendations": ["list of 3-5 recommendations"],
                  "managementOptions": ["list of 3-5 management options"],
                  "severity": "low/medium/high based on symptoms",
                  "sources": [{"title": "Article title", "url": "URL to PubMed or trusted medical source"}]
                }
                Ensure the response is medically accurate, evidence-based, and focuses on only the most relevant conditions for the symptoms. Only return valid JSON.`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 32,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to analyze symptoms");
    }
    
    const textContent = data.candidates[0].content.parts[0].text;
    
    // Extract the JSON part from the response
    const jsonMatch = textContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse JSON response from Gemini API");
    }
    
    const parsedResponse: GeminiResponse = JSON.parse(jsonMatch[0]);
    return parsedResponse;
  } catch (error) {
    console.error("Error analyzing symptoms:", error);
    toast.error("Failed to analyze symptoms. Please try again.");
    throw error;
  }
};
