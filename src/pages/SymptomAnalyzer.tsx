
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { analyzeSymptoms } from '@/services/geminiService';
import { toast } from '@/components/ui/sonner';
import ApiKeyInput from '@/components/ApiKeyInput';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface AnalysisResult {
  possibleConditions: string[];
  differentialDiagnosis: string[];
  recommendations: string[];
  managementOptions: string[];
  severity: 'low' | 'medium' | 'high';
  sources: { title: string; url: string }[];
}

const formSchema = z.object({
  symptoms: z.string().min(10, {
    message: "Symptoms must be at least 10 characters long.",
  }),
  age: z.string().min(1, {
    message: "Age is required.",
  }),
  gender: z.string().min(1, {
    message: "Gender is required.",
  }),
});

const SymptomAnalyzer: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(localStorage.getItem("gemini_api_key"));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: "",
      age: "",
      gender: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!apiKey) {
      toast.error("Please set your Gemini API key first");
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      const analysisResult = await analyzeSymptoms(values.symptoms, values.age, values.gender);
      setResult(analysisResult);
      toast.success("Analysis complete!");
    } catch (error) {
      console.error("Error during analysis:", error);
      toast.error("Failed to analyze symptoms. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleApiKeyChange = (newApiKey: string) => {
    setApiKey(newApiKey);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'text-green-500 bg-green-50';
      case 'medium':
        return 'text-yellow-500 bg-yellow-50';
      case 'high':
        return 'text-red-500 bg-red-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="genz-container py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">AI Symptom Analyzer</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Describe your symptoms in detail and our AI will analyze them to provide possible conditions and recommendations.
        </p>
      </div>

      <ApiKeyInput onApiKeyChange={handleApiKeyChange} />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Enter Your Symptoms</CardTitle>
              <CardDescription>
                Be as detailed as possible about what you're experiencing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your age" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="symptoms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Symptoms*</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your symptoms here... (e.g., I've had a headache for 2 days, along with a runny nose and sore throat)"
                            className="min-h-[150px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="text-xs text-muted-foreground">
                    <p>Include details such as:</p>
                    <ul className="ml-4 list-disc">
                      <li>When symptoms started</li>
                      <li>Severity (mild, moderate, severe)</li>
                      <li>Any recent travel or exposures</li>
                      <li>Previous medical conditions</li>
                    </ul>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isAnalyzing || !apiKey}
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Symptoms'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          {!result && !isAnalyzing && (
            <div className="flex h-full flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
              <div className="text-6xl">🔍</div>
              <h3 className="mt-4 text-xl font-medium">No Analysis Yet</h3>
              <p className="mt-2 text-muted-foreground">
                Enter your symptoms and click "Analyze Symptoms" to get started.
              </p>
            </div>
          )}

          {isAnalyzing && (
            <div className="flex h-full flex-col items-center justify-center rounded-lg border p-12 text-center">
              <div className="animate-pulse text-6xl">🧠</div>
              <h3 className="mt-4 text-xl font-medium">Analyzing Your Symptoms</h3>
              <p className="mt-2 text-muted-foreground">
                Our AI is processing your description...
              </p>
            </div>
          )}

          {result && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Analysis Results</CardTitle>
                  <div className={`rounded-full px-3 py-1 text-xs font-medium ${getSeverityColor(result.severity)}`}>
                    {result.severity.charAt(0).toUpperCase() + result.severity.slice(1)} Severity
                  </div>
                </div>
                <CardDescription>
                  Based on your description, our AI has identified the following:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="conditions">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="conditions">Possible Conditions</TabsTrigger>
                    <TabsTrigger value="differential">Differential Diagnosis</TabsTrigger>
                    <TabsTrigger value="management">Management</TabsTrigger>
                    <TabsTrigger value="sources">Medical Sources</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="conditions" className="mt-4 space-y-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="mb-2 font-medium">Possible Conditions</h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        These conditions might explain your symptoms, but are not a definitive diagnosis.
                      </p>
                      <ul className="space-y-2">
                        {result.possibleConditions.map((condition, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span>{condition}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm">
                      <strong>Important:</strong> This analysis is not a medical diagnosis. Always consult with a healthcare professional for proper evaluation.
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="differential" className="mt-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="mb-2 font-medium">Differential Diagnosis</h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        Other conditions to consider that may present with similar symptoms:
                      </p>
                      <ul className="space-y-2">
                        {result.differentialDiagnosis.map((diagnosis, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span>{diagnosis}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="management" className="mt-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="mb-2 font-medium">Recommendations</h3>
                      <ul className="space-y-3">
                        {result.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs text-white">
                              {idx + 1}
                            </div>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <h3 className="mb-2 mt-6 font-medium">Management Options</h3>
                      <ul className="space-y-3">
                        {result.managementOptions.map((option, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                              {idx + 1}
                            </div>
                            <span>{option}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="sources" className="mt-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="mb-2 font-medium">Medical Sources</h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        References from medical literature that informed this analysis:
                      </p>
                      <ul className="space-y-3">
                        {result.sources.map((source, idx) => (
                          <li key={idx} className="rounded-lg border p-3">
                            <a 
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {source.title}
                            </a>
                            <div className="mt-1 text-xs text-muted-foreground">
                              {source.url}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <Separator className="my-6" />
                
                <div className="rounded-lg bg-muted p-4">
                  <h3 className="mb-2 font-medium">Next Steps</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Would you like more detailed insights from a medical professional?
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button className="flex-1 bg-genz-gradient">
                      Book Doctor Consultation
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Save This Analysis
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SymptomAnalyzer;
