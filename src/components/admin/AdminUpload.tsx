
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Upload, Image, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const AdminUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});
  const [uploadStatus, setUploadStatus] = useState<{[key: string]: 'pending' | 'success' | 'error'}>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles: File[]) => {
    // Only accept images
    const imageFiles = newFiles.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length !== newFiles.length) {
      toast({
        title: "Invalid file type",
        description: "Only image files are allowed.",
        variant: "destructive",
      });
    }
    
    const updatedFiles = [...files, ...imageFiles];
    setFiles(updatedFiles);
    
    // Initialize progress for new files
    const initialProgress = { ...uploadProgress };
    const initialStatus = { ...uploadStatus };
    
    imageFiles.forEach(file => {
      initialProgress[file.name] = 0;
      initialStatus[file.name] = 'pending';
    });
    
    setUploadProgress(initialProgress);
    setUploadStatus(initialStatus);
  };

  const removeFile = (fileName: string) => {
    setFiles(files.filter(file => file.name !== fileName));
    
    // Clean up progress and status
    const newProgress = { ...uploadProgress };
    const newStatus = { ...uploadStatus };
    
    delete newProgress[fileName];
    delete newStatus[fileName];
    
    setUploadProgress(newProgress);
    setUploadStatus(newStatus);
  };

  const uploadFiles = () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one image file to upload.",
        variant: "destructive",
      });
      return;
    }

    // Simulate file upload with progress for each file
    files.forEach(file => {
      let progress = 0;
      const intervalId = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 5;
        
        if (progress >= 100) {
          progress = 100;
          clearInterval(intervalId);
          
          // Simulate success/error (90% success rate)
          const success = Math.random() > 0.1;
          
          setUploadStatus(prev => ({
            ...prev,
            [file.name]: success ? 'success' : 'error'
          }));
          
          // Show toast for each completed upload
          toast({
            title: success ? "Upload complete" : "Upload failed",
            description: success 
              ? `${file.name} was uploaded successfully.`
              : `Failed to upload ${file.name}. Please try again.`,
            variant: success ? "default" : "destructive",
          });
        }
        
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: progress
        }));
      }, 200);
    });
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
      return <Image className="w-5 h-5" />;
    }
    return <FileText className="w-5 h-5" />;
  };

  const getStatusIcon = (status: 'pending' | 'success' | 'error') => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-noor-brown mb-6">Upload Images</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Image Upload</CardTitle>
          <CardDescription>
            Upload images to use in your content. Supported formats: JPG, PNG, GIF, SVG.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragging ? 'border-noor-olive bg-noor-yellow-light/30' : 'border-border'
            } transition-colors duration-200`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center">
              <Upload className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Drag and drop your images here</h3>
              <p className="text-muted-foreground mb-4">or click the button below to browse</p>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
                className="bg-noor-olive hover:bg-noor-olive-light text-white"
              >
                Choose Files
              </Button>
            </div>
          </div>
          
          {files.length > 0 && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Selected Files ({files.length})</h3>
                <Button 
                  onClick={uploadFiles}
                  className="bg-noor-olive hover:bg-noor-olive-light text-white"
                >
                  Upload All
                </Button>
              </div>
              
              <div className="space-y-3">
                {files.map((file, index) => (
                  <div key={`${file.name}-${index}`} className="bg-muted/50 rounded-md p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        {getFileIcon(file.name)}
                        <span className="ml-2 text-sm font-medium truncate max-w-[200px]">
                          {file.name}
                        </span>
                        <span className="ml-2 text-xs text-muted-foreground">
                          ({(file.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      <div className="flex items-center">
                        {getStatusIcon(uploadStatus[file.name] || 'pending')}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeFile(file.name)}
                          className="h-8 w-8 p-0 ml-2 text-red-500 hover:text-red-700"
                        >
                          <span className="sr-only">Remove</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          uploadStatus[file.name] === 'error' 
                            ? 'bg-red-500' 
                            : 'bg-noor-olive'
                        }`}
                        style={{ width: `${uploadProgress[file.name] || 0}%` }}
                      ></div>
                    </div>
                    
                    <div className="text-xs text-right mt-1">
                      {uploadProgress[file.name] || 0}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUpload;
