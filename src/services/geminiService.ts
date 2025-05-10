
import { toast } from "@/components/ui/sonner";

interface GeminiResponse {
  possibleConditions: string[];
  differentialDiagnosis: string[];
  recommendations: string[];
  managementOptions: string[];
  severity: 'low' | 'medium' | 'high';
  sources: { title: string; url: string }[];
}

interface ImageAnalysisResponse {
  findings: string[];
  interpretation: string;
  confidence: number;
  recommendations: string[];
  sources: { title: string; url: string }[];
}

// The hardcoded API key that will always be available
const HARDCODED_API_KEY = "AIzaSyBWQchLXmB2Mo_Qwn2DaEoneEJoix9_xQ8";

export const analyzeSymptoms = async (symptoms: string, age: string, gender: string): Promise<GeminiResponse> => {
  // Always use the hardcoded API key, but let localStorage override if available
  const apiKey = localStorage.getItem("gemini_api_key") || HARDCODED_API_KEY;
  
  try {
    console.log("Starting symptom analysis with API key");
    console.log("Symptoms:", symptoms.substring(0, 20) + "...");
    console.log("Patient info:", `Age: ${age}, Gender: ${gender}`);
    
    // Use the correct Gemini API endpoint
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

    console.log("Gemini API response status:", response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      throw new Error(errorData.error?.message || "Failed to analyze symptoms");
    }
    
    const data = await response.json();
    console.log("Gemini API response received:", data && JSON.stringify(data).substring(0, 100) + "...");
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts) {
      console.error("Unexpected response structure:", data);
      throw new Error("Invalid response structure from Gemini API");
    }
    
    const textContent = data.candidates[0].content.parts[0].text;
    console.log("Received text content:", textContent && textContent.substring(0, 100) + "...");
    
    // Extract the JSON part from the response
    const jsonMatch = textContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Failed to extract JSON from response:", textContent);
      throw new Error("Could not parse JSON response from Gemini API");
    }
    
    try {
      const parsedResponse: GeminiResponse = JSON.parse(jsonMatch[0]);
      console.log("Successfully parsed response:", parsedResponse);
      return parsedResponse;
    } catch (jsonError) {
      console.error("JSON parsing error:", jsonError, "Raw match:", jsonMatch[0]);
      throw new Error("Failed to parse JSON data from Gemini API response");
    }
  } catch (error) {
    console.error("Error analyzing symptoms:", error);
    
    // Add more context to the error for better debugging
    if (error instanceof Error) {
      console.error("Error details:", error.message, error.stack);
    }
    
    // If there's an error with the provided key, retry with the hardcoded key
    if (apiKey !== HARDCODED_API_KEY) {
      console.log("Retrying with hardcoded API key");
      localStorage.setItem("gemini_api_key", HARDCODED_API_KEY);
      return analyzeSymptoms(symptoms, age, gender);
    }
    
    // Show a more detailed error message to the user
    toast.error(`Failed to analyze symptoms: ${error instanceof Error ? error.message : "Unknown error"}`);
    throw error;
  }
};

export const analyzeImage = async (
  imageFile: File, 
  imageType: string, 
  bodyPart: string, 
  additionalInfo?: string
): Promise<ImageAnalysisResponse> => {
  // Always use the hardcoded API key, but let localStorage override if available
  const apiKey = localStorage.getItem("gemini_api_key") || HARDCODED_API_KEY;
  
  try {
    // Convert image to base64
    const base64Image = await fileToBase64(imageFile);
    
    // Add debug output for troubleshooting
    console.log("Image analysis request details:", {
      imageType,
      bodyPart,
      additionalInfoProvided: !!additionalInfo,
      imageSize: base64Image.length,
      fileType: imageFile.type
    });
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-vision:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `As a medical expert, analyze this ${imageType} image of the ${bodyPart}. ${additionalInfo ? `Additional information: ${additionalInfo}` : ''} 
                Provide a detailed medical analysis in a structured JSON format:
                {
                  "findings": ["list 4-6 specific findings visible in the image"],
                  "interpretation": "provide a comprehensive interpretation of the image, connecting the findings to a possible diagnosis",
                  "confidence": a number between 60-95 representing your confidence level,
                  "recommendations": ["list 4-5 specific recommendations or next steps"],
                  "sources": [{"title": "Article title", "url": "URL to relevant medical literature"}]
                }
                Ensure the analysis is medically accurate, professional, and only contains information that can be supported by the image. Include relevant anatomical markers and be specific about what you can and cannot determine. Only return valid JSON.`
              },
              {
                inline_data: {
                  mime_type: imageFile.type,
                  data: base64Image.split(',')[1] // Remove the data:image/jpeg;base64, prefix
                }
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

    // Log the response status for debugging
    console.log("Gemini API response status:", response.status);
    
    const data = await response.json();
    
    // Log the response structure for debugging
    console.log("Gemini API response structure:", Object.keys(data));
    
    if (!response.ok) {
      const errorMessage = data.error?.message || "Failed to analyze image";
      console.error("Gemini API error:", data.error);
      throw new Error(errorMessage);
    }
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts) {
      console.error("Unexpected response structure:", data);
      throw new Error("Invalid response structure from Gemini API");
    }
    
    const textContent = data.candidates[0].content.parts[0].text;
    console.log("Received text content:", textContent && textContent.substring(0, 100) + "...");
    
    // Extract the JSON part from the response
    const jsonMatch = textContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Failed to extract JSON from response:", textContent);
      throw new Error("Could not parse JSON response from Gemini API");
    }
    
    try {
      const parsedResponse: ImageAnalysisResponse = JSON.parse(jsonMatch[0]);
      console.log("Successfully parsed response:", parsedResponse);
      return parsedResponse;
    } catch (jsonError) {
      console.error("JSON parsing error:", jsonError, "Raw match:", jsonMatch[0]);
      throw new Error("Failed to parse JSON data from Gemini API response");
    }
  } catch (error) {
    console.error("Error analyzing image:", error);
    
    // If there's an error with the provided key, retry with the hardcoded key
    if (apiKey !== HARDCODED_API_KEY) {
      console.log("Retrying with hardcoded API key");
      localStorage.setItem("gemini_api_key", HARDCODED_API_KEY);
      return analyzeImage(imageFile, imageType, bodyPart, additionalInfo);
    }
    
    toast.error("Failed to analyze image. Please try again.");
    
    // Add more context to the error for better debugging
    if (error instanceof Error) {
      console.error("Error details:", error.message, error.stack);
    }
    
    throw error;
  }
};

// Helper function to convert File to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
