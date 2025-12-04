'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, UploadCloud, FileImage, AlertTriangle, Sparkles } from 'lucide-react';
import { checkImageCopyright } from '@/app/actions';
import type { CheckCopyrightOutput } from '@/ai/flows/photo-rights-ai-copyright-check';

export function PhotoRightsAIDemo() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<CheckCopyrightOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload an image smaller than 4MB.",
        });
        return;
      }
      setFile(selectedFile);
      setResult(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please select an image to check.",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('image', file);
      const aiResult = await checkImageCopyright(formData);
      
      if (aiResult && 'error' in aiResult) {
        throw new Error(aiResult.error);
      }

      if (aiResult) {
        setResult(aiResult);
      } else {
        throw new Error("AI analysis failed to return a result.");
      }
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: error.message || "Could not analyze the image. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const triggerFileSelect = () => fileInputRef.current?.click();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const event = { target: { files: e.dataTransfer.files } } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileChange(event);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <section id="demo" className="py-12 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-headline font-bold md:text-4xl">
            Try PhotoRights AI
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Upload an image to get an instant AI-powered copyright analysis.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardContent className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div 
                  className="w-full p-4 border-2 border-dashed border-border rounded-lg text-center cursor-pointer hover:border-primary transition-colors bg-background"
                  onClick={triggerFileSelect}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <Input 
                    id="image-upload" 
                    type="file" 
                    ref={fileInputRef}
                    className="hidden" 
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg, image/webp"
                  />
                  {preview ? (
                    <div className="relative aspect-video w-full rounded-md overflow-hidden">
                       <Image src={preview} alt="Image preview" fill className="object-contain"/>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-2 py-10">
                      <UploadCloud className="w-12 h-12 text-muted-foreground" />
                      <p className="font-semibold">Click or drag & drop to upload</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, WEBP up to 4MB</p>
                    </div>
                  )}
                </div>
                {preview && file && <p className="text-sm text-muted-foreground flex items-center gap-2 truncate"><FileImage className="w-4 h-4 flex-shrink-0"/> <span className="truncate">{file.name}</span></p>}
                <Button type="submit" className="w-full" disabled={isLoading || !file}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Check Copyright'
                  )}
                </Button>
              </form>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Analysis Result</h3>
                {isLoading ? (
                   <div className="space-y-4 rounded-lg border p-6 bg-background">
                      <div className="flex items-center space-x-2 animate-pulse">
                        <div className="h-6 w-6 bg-muted rounded-full"></div>
                        <div className="h-4 w-1/3 bg-muted rounded"></div>
                      </div>
                      <div className="h-4 w-full bg-muted rounded"></div>
                      <div className="h-4 w-5/6 bg-muted rounded"></div>

                      <div className="flex items-center space-x-2 animate-pulse pt-4">
                        <div className="h-6 w-6 bg-muted rounded-full"></div>
                        <div className="h-4 w-1/4 bg-muted rounded"></div>
                      </div>
                      <div className="h-4 w-full bg-muted rounded"></div>
                      <div className="h-4 w-full bg-muted rounded"></div>
                      <div className="h-4 w-4/5 bg-muted rounded"></div>
                   </div>
                ) : result ? (
                  <div className="space-y-6 rounded-lg border bg-background p-6">
                    <div>
                      <div className="flex items-center font-semibold mb-2">
                        <AlertTriangle className="w-5 h-5 mr-2 text-primary" />
                        Copyright Status
                      </div>
                      <p className="text-muted-foreground">{result.copyrightStatus}</p>
                    </div>
                    <div>
                      <div className="flex items-center font-semibold mb-2">
                        <Sparkles className="w-5 h-5 mr-2 text-primary" />
                        Usage Suggestions
                      </div>
                      <p className="text-muted-foreground whitespace-pre-wrap">{result.suggestions}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-10 border rounded-lg h-full bg-background">
                    <p className="text-muted-foreground">Your image analysis will appear here.</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
