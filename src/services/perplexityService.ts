
import { toast } from "@/components/ui/sonner";

interface PerplexityResponse {
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



export const analyzeSymptomsUsingPerplexity = async (symptoms: string, age: string, gender: string): Promise<PerplexityResponse> => {

  try {
    // Get data from api
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/perplexity/query-perplexity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          "symptoms": symptoms,
          "age": age,
          "gender": gender
      }),
    });
       
    const data = await response.json();
    console.log("Perplexity API response status:", response.status);
    console.log("Data from api:", data);
    console.log("Perplexity API response:", data.data);
   

    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to analyze symptoms");
    }
    
    console.log("Received text content:", data.data.choices[0].message.content);
    const textContent = data.data.choices[0].message.content;

      // Get data from a json file within the project
    // const pexData = await import('./pex.json');
    // console.log("PEX data:", pexData);

      
    // console.log("Received text content:", pexData.data.choices[0].message.content);
    // const textContent = pexData.data.choices[0].message.content;

    
    
    // Extract the JSON part from the response
    const jsonMatch = textContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse JSON response from Perplexity API");
    }
    
    const parsedResponse: PerplexityResponse = JSON.parse(jsonMatch[0]);
    return parsedResponse;
  } catch (error) {
    console.error("Error analyzing symptoms:", error);
    toast.error(`Failed to analyze symptoms. ${error.message}`);
  }
};

export const analyzeImage = async (
  imageFile: File, 
  imageType: string, 
  bodyPart: string, 
  additionalInfo?: string
): Promise<ImageAnalysisResponse> => {

  try {
    // Convert image to base64
    const base64Image = await fileToBase64(imageFile);
    
    // Add debug output for troubleshooting
    console.log("Image analysis request details:", {
      imageType,
      bodyPart,
      additionalInfoProvided: !!additionalInfo,
      imageSize: base64Image.length,
      fileType: imageFile.type,
    });
    
    // const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-vision:generateContent?key=${apiKey}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     contents: [
    //       {
    //         parts: [
    //           {
    //             text: `As a medical expert, analyze this ${imageType} image of the ${bodyPart}. ${additionalInfo ? `Additional information: ${additionalInfo}` : ''} 
    //             Provide a detailed medical analysis in a structured JSON format:
    //             {
    //               "findings": ["list 4-6 specific findings visible in the image"],
    //               "interpretation": "provide a comprehensive interpretation of the image, connecting the findings to a possible diagnosis",
    //               "confidence": a number between 60-95 representing your confidence level,
    //               "recommendations": ["list 4-5 specific recommendations or next steps"],
    //               "sources": [{"title": "Article title", "url": "URL to relevant medical literature"}]
    //             }
    //             Ensure the analysis is medically accurate, professional, and only contains information that can be supported by the image. Include relevant anatomical markers and be specific about what you can and cannot determine. Only return valid JSON.`
    //           },
    //           {
    //             inline_data: {
    //               mime_type: imageFile.type,
    //               data: base64Image.split(',')[1] // Remove the data:image/jpeg;base64, prefix
    //             }
    //           }
    //         ]
    //       }
    //     ],
    //     generationConfig: {
    //       temperature: 0.2,
    //       topK: 32,
    //       topP: 0.95,
    //       maxOutputTokens: 1024,
    //     }
    //   }),
    // });

    const response = await fetch(`https://hack-server-71y3.onrender.com/api/analyze-image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          "imageType": imageType,
          "bodyPart": bodyPart,
          "additionalInfo": additionalInfo,
          "imageData": base64Image,
          "mimeType": imageFile.type
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
