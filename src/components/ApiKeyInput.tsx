
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { AlertCircle, Key } from "lucide-react";

interface ApiKeyInputProps {
  onApiKeyChange: (apiKey: string) => void;
}

// Hardcoded API key that will be used by default
const HARDCODED_API_KEY = "AIzaSyBWQchLXmB2Mo_Qwn2DaEoneEJoix9_xQ8";

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeyChange }) => {
  const [apiKey, setApiKey] = useState<string>(HARDCODED_API_KEY);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [keyStatus, setKeyStatus] = useState<"valid" | "invalid" | "unchecked">("valid"); // Default to valid since we're using hardcoded key

  useEffect(() => {
    // Always use the hardcoded key by default
    localStorage.setItem("gemini_api_key", HARDCODED_API_KEY);
    onApiKeyChange(HARDCODED_API_KEY);
  }, [onApiKeyChange]);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      // Validate API key format (basic validation)
      if (apiKey.length < 20) {
        toast.error("API key appears to be invalid. Using default key instead.");
        setApiKey(HARDCODED_API_KEY);
        localStorage.setItem("gemini_api_key", HARDCODED_API_KEY);
        onApiKeyChange(HARDCODED_API_KEY);
        setKeyStatus("valid");
        setIsVisible(false);
        return;
      }

      localStorage.setItem("gemini_api_key", apiKey);
      onApiKeyChange(apiKey);
      setKeyStatus("valid");
      toast.success("Custom API key saved successfully!");
      setIsVisible(false);
    } else {
      // If empty, revert to hardcoded key
      setApiKey(HARDCODED_API_KEY);
      localStorage.setItem("gemini_api_key", HARDCODED_API_KEY);
      onApiKeyChange(HARDCODED_API_KEY);
      toast.info("Using default API key");
      setKeyStatus("valid");
    }
  };

  return (
    <div className="relative">
      <Button
        size="sm"
        variant="outline"
        onClick={() => setIsVisible(!isVisible)}
        className="absolute right-4 top-4 z-10 flex items-center gap-1"
      >
        <Key className="h-4 w-4" />
        API Key Settings
      </Button>
      
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-medium">Gemini API Key Settings</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              A default API key is already configured for all users. You typically won't need to change this.
            </p>
            
            <div className="mb-4 flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">
              <AlertCircle className="h-4 w-4 text-blue-500" />
              <span>Using pre-configured API key. The system will work without any changes.</span>
            </div>
            
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Enter custom API key (optional)"
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
                <p>Custom keys are only needed for advanced usage. The default key works for most scenarios.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiKeyInput;
