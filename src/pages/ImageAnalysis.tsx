
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { analyzeImage } from '@/services/geminiService';
import { LoaderCircle } from 'lucide-react';

interface AnalysisResult {
  findings: string[];
  interpretation: string;
  confidence: number;
  recommendations: string[];
  sources: { title: string; url: string }[];
}

const ImageAnalysis: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageType, setImageType] = useState<string>('');
  const [bodyPart, setBodyPart] = useState<string>('');
  const [additionalInfo, setAdditionalInfo] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile || !imageType || !bodyPart) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      // Call the Gemini API to analyze the image
      const analysisResult = await analyzeImage(
        imageFile,
        imageType,
        bodyPart,
        additionalInfo
      );
      
      setResult(analysisResult);
      toast.success("Image analysis complete");
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast.error("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-500';
    if (confidence >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="genz-container py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">Medical Image Analysis</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Upload your medical images for AI-powered analysis. Our system can interpret X-rays, CT scans, MRIs, and ultrasounds.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Upload Medical Image</CardTitle>
              <CardDescription>
                Provide your medical image and details for analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="imageUpload">Upload Image</Label>
                  <div className="flex items-center justify-center">
                    <label 
                      htmlFor="imageUpload" 
                      className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                    >
                      {imagePreview ? (
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="h-full w-full rounded-lg object-contain p-2" 
                        />
                      ) : (
                        <>
                          <div className="flex flex-col items-center justify-center p-5">
                            <span className="mb-2 text-4xl">🩻</span>
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              PNG, JPG or DICOM (MAX. 20MB)
                            </p>
                          </div>
                        </>
                      )}
                      <Input 
                        id="imageUpload" 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageType">Image Type</Label>
                  <Select 
                    value={imageType} 
                    onValueChange={setImageType}
                  >
                    <SelectTrigger id="imageType">
                      <SelectValue placeholder="Select type of image" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xray">X-Ray</SelectItem>
                      <SelectItem value="ct">CT Scan</SelectItem>
                      <SelectItem value="mri">MRI</SelectItem>
                      <SelectItem value="ultrasound">Ultrasound</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bodyPart">Body Part</Label>
                  <Select 
                    value={bodyPart} 
                    onValueChange={setBodyPart}
                  >
                    <SelectTrigger id="bodyPart">
                      <SelectValue placeholder="Select body part" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="head">Head/Brain</SelectItem>
                      <SelectItem value="chest">Chest/Lungs</SelectItem>
                      <SelectItem value="abdomen">Abdomen</SelectItem>
                      <SelectItem value="spine">Spine</SelectItem>
                      <SelectItem value="pelvis">Pelvis</SelectItem>
                      <SelectItem value="arm">Arm/Hand</SelectItem>
                      <SelectItem value="leg">Leg/Foot</SelectItem>
                      <SelectItem value="joint">Joint (Knee, Shoulder, etc.)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                  <Input 
                    id="additionalInfo" 
                    placeholder="e.g., Previous injury, current symptoms" 
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isAnalyzing || !imageFile || !imageType || !bodyPart}
                >
                  {isAnalyzing ? (
                    <>
                      <LoaderCircle className="animate-spin mr-2" />
                      Analyzing...
                    </>
                  ) : 'Analyze Image'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          {!result && !isAnalyzing && (
            <div className="flex h-full flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
              <div className="text-6xl">🔍</div>
              <h3 className="mt-4 text-xl font-medium">No Analysis Yet</h3>
              <p className="mt-2 text-muted-foreground">
                Upload a medical image and fill in the required details to get started.
              </p>
            </div>
          )}

          {isAnalyzing && (
            <div className="flex h-full flex-col items-center justify-center rounded-lg border p-12 text-center">
              <div className="mb-4">
                <LoaderCircle className="animate-spin h-12 w-12 text-primary mx-auto" />
              </div>
              <h3 className="mt-4 text-xl font-medium">Analyzing Your Medical Image</h3>
              <p className="mt-2 text-muted-foreground">
                Our AI is processing the image... This may take a few moments.
              </p>
              
              <div className="w-full max-w-md mt-6">
                <div className="space-y-4">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            </div>
          )}

          {result && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Image Analysis Results</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Confidence:</span>
                    <span className={`font-medium ${getConfidenceColor(result.confidence)}`}>
                      {result.confidence}%
                    </span>
                  </div>
                </div>
                <CardDescription>
                  Based on the uploaded image, our AI has generated the following analysis:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="findings">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="findings">Findings</TabsTrigger>
                    <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                    <TabsTrigger value="sources">Medical Sources</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="findings" className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        {imagePreview && (
                          <div className="overflow-hidden rounded-lg border">
                            <img 
                              src={imagePreview} 
                              alt="Uploaded medical image" 
                              className="h-auto w-full object-contain" 
                            />
                          </div>
                        )}
                      </div>
                      <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                          <h3 className="mb-2 font-medium">Key Findings</h3>
                          <ul className="space-y-2">
                            {result.findings.map((finding, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <span>{finding}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="rounded-lg border p-4">
                          <h3 className="mb-2 font-medium">Interpretation</h3>
                          <p className="text-sm text-muted-foreground">
                            {result.interpretation}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm">
                      <strong>Important:</strong> This analysis is not a medical diagnosis. Always consult with a healthcare professional for proper evaluation.
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="recommendations" className="mt-4">
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

export default ImageAnalysis;
