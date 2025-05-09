
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { AlertCircle, Key } from "lucide-react";

interface ApiKeyInputProps {
  onApiKeyChange: (apiKey: string) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeyChange }) => {
  const [apiKey, setApiKey] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [keyStatus, setKeyStatus] = useState<"valid" | "invalid" | "unchecked">("unchecked");

  useEffect(() => {
    // Try to load API key from localStorage
    const savedApiKey = localStorage.getItem("gemini_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setKeyStatus("valid");
      onApiKeyChange(savedApiKey);
    }
  }, [onApiKeyChange]);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      // Validate API key format (basic validation)
      if (apiKey.length < 20) {
        toast.error("API key appears to be invalid. Please check your key.");
        setKeyStatus("invalid");
        return;
      }

      localStorage.setItem("gemini_api_key", apiKey);
      onApiKeyChange(apiKey);
      setKeyStatus("valid");
      toast.success("Custom API key saved successfully!");
      setIsVisible(false);
    } else {
      toast.error("Please enter a valid API key");
      setKeyStatus("invalid");
    }
  };

  return (
    <div className="relative">
      <Button
        size="sm"
        variant={keyStatus === "valid" ? "outline" : "default"}
        onClick={() => setIsVisible(!isVisible)}
        className="absolute right-4 top-4 z-10 flex items-center gap-1"
      >
        <Key className="h-4 w-4" />
        {keyStatus === "valid" ? "API Key Set" : "Set Custom API Key"}
      </Button>
      
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-medium">Custom Gemini API Key</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              A default API key is configured, but you can use your own for better reliability.
              Your key is stored locally in your browser.
            </p>
            
            {keyStatus === "invalid" && (
              <div className="mb-4 flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span>API key appears invalid. Please check and try again.</span>
              </div>
            )}
            
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Enter your Gemini API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsVisible(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveApiKey}>Save Key</Button>
              </div>
              <div className="text-xs text-muted-foreground">
                <p>You can get a Gemini API key from the <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google AI Studio</a>.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiKeyInput;
