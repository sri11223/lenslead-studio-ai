import React, { useState } from 'react';
import { 
  Upload, 
  Download, 
  Sparkles, 
  Camera, 
  Eye, 
  Users, 
  Zap, 
  Image, 
  Sliders, 
  Scissors,
  Play,
  Pause,
  Settings,
  Check,
  X,
  RefreshCw,
  FolderOpen
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AITask {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  timeRemaining: string;
  inputFiles: number;
  outputFiles: number;
}

interface ProcessedImage {
  id: string;
  originalName: string;
  thumbnail: string;
  status: 'processing' | 'completed' | 'failed';
  tool: string;
}

export default function AITools() {
  const [activeTab, setActiveTab] = useState('background-removal');
  const [qualitySettings, setQualitySettings] = useState([75]);
  const [enhancementLevel, setEnhancementLevel] = useState([50]);
  const [processingTasks, setProcessingTasks] = useState<AITask[]>([
    {
      id: '1',
      name: 'Wedding Photo Background Removal',
      status: 'processing',
      progress: 65,
      timeRemaining: '12 min',
      inputFiles: 45,
      outputFiles: 29
    },
    {
      id: '2',
      name: 'Birthday Party Enhancement',
      status: 'completed',
      progress: 100,
      timeRemaining: '0 min',
      inputFiles: 23,
      outputFiles: 23
    },
    {
      id: '3',
      name: 'Corporate Event Face Sorting',
      status: 'pending',
      progress: 0,
      timeRemaining: '25 min',
      inputFiles: 67,
      outputFiles: 0
    }
  ]);

  const getStatusColor = (status: AITask['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'processing':
        return 'bg-primary text-primary-foreground';
      case 'failed':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusIcon = (status: AITask['status']) => {
    switch (status) {
      case 'completed':
        return <Check className="h-4 w-4" />;
      case 'processing':
        return <RefreshCw className="h-4 w-4 animate-spin" />;
      case 'failed':
        return <X className="h-4 w-4" />;
      default:
        return <Play className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Photo Tools</h1>
          <p className="text-muted-foreground">Professional AI-powered photo editing and organization</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FolderOpen className="h-4 w-4 mr-2" />
            Browse Files
          </Button>
          <Button className="bg-gradient-primary hover:bg-primary-hover">
            <Upload className="h-4 w-4 mr-2" />
            Upload Photos
          </Button>
        </div>
      </div>

      {/* AI Processing Queue */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent-gold" />
            Processing Queue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {processingTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">{task.name}</h4>
                    <Badge className={getStatusColor(task.status)}>
                      {getStatusIcon(task.status)}
                      <span className="ml-2">{task.status}</span>
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{task.inputFiles} files</span>
                    <span>•</span>
                    <span>{task.outputFiles} processed</span>
                    <span>•</span>
                    <span>{task.timeRemaining} remaining</span>
                  </div>
                  <Progress value={task.progress} className="h-2" />
                </div>
                <div className="flex gap-2">
                  {task.status === 'processing' && (
                    <Button size="sm" variant="outline">
                      <Pause className="h-4 w-4" />
                    </Button>
                  )}
                  {task.status === 'completed' && (
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Tools */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="background-removal">Background Removal</TabsTrigger>
          <TabsTrigger value="enhancement">Photo Enhancement</TabsTrigger>
          <TabsTrigger value="face-detection">Face Detection</TabsTrigger>
          <TabsTrigger value="eye-opening">Eye Opening</TabsTrigger>
        </TabsList>

        {/* Background Removal Tool */}
        <TabsContent value="background-removal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scissors className="h-5 w-5 text-primary" />
                Background Removal Tool
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors">
                <div className="space-y-4">
                  <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Upload Photos for Background Removal</h3>
                    <p className="text-muted-foreground">Drag and drop your photos here, or click to browse</p>
                  </div>
                  <Button className="bg-gradient-primary">
                    Choose Files
                  </Button>
                </div>
              </div>

              {/* Settings */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Quality Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Processing Quality</span>
                      <span className="text-sm font-medium">{qualitySettings[0]}%</span>
                    </div>
                    <Slider
                      value={qualitySettings}
                      onValueChange={setQualitySettings}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">Higher quality takes longer but produces better results</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Output Options</h4>
                  <div className="space-y-3">
                    <Select defaultValue="png-transparent">
                      <SelectTrigger>
                        <SelectValue placeholder="Output format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="png-transparent">PNG (Transparent)</SelectItem>
                        <SelectItem value="png-white">PNG (White Background)</SelectItem>
                        <SelectItem value="jpg-white">JPG (White Background)</SelectItem>
                        <SelectItem value="jpg-color">JPG (Custom Color)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Preview Section */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Preview</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="aspect-video rounded-lg bg-secondary/50 border-2 border-dashed border-border flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Camera className="mx-auto h-12 w-12 mb-2" />
                      <p>Original Image</p>
                    </div>
                  </div>
                  <div className="aspect-video rounded-lg bg-secondary/50 border-2 border-dashed border-border flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Sparkles className="mx-auto h-12 w-12 mb-2" />
                      <p>AI Processed Result</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="flex-1 bg-gradient-primary" size="lg">
                  <Zap className="h-4 w-4 mr-2" />
                  Start Processing
                </Button>
                <Button variant="outline" size="lg">
                  <Download className="h-4 w-4 mr-2" />
                  Download Results
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Photo Enhancement Tool */}
        <TabsContent value="enhancement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sliders className="h-5 w-5 text-primary" />
                Photo Enhancement Tool
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors">
                <div className="space-y-4">
                  <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Image className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Upload Photos for Enhancement</h3>
                    <p className="text-muted-foreground">AI will enhance colors, sharpness, and overall quality</p>
                  </div>
                  <Button className="bg-gradient-primary">
                    Choose Files
                  </Button>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Enhancement Level</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Intensity</span>
                      <span className="text-sm font-medium">{enhancementLevel[0]}%</span>
                    </div>
                    <Slider
                      value={enhancementLevel}
                      onValueChange={setEnhancementLevel}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Enhancement Type</h4>
                  <Select defaultValue="auto">
                    <SelectTrigger>
                      <SelectValue placeholder="Enhancement type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto Enhancement</SelectItem>
                      <SelectItem value="portrait">Portrait Enhancement</SelectItem>
                      <SelectItem value="landscape">Landscape Enhancement</SelectItem>
                      <SelectItem value="low-light">Low Light Enhancement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Resolution</h4>
                  <Select defaultValue="2x">
                    <SelectTrigger>
                      <SelectValue placeholder="Upscale resolution" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1x">Original (1x)</SelectItem>
                      <SelectItem value="2x">Super Resolution (2x)</SelectItem>
                      <SelectItem value="4x">Ultra Resolution (4x)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="w-full bg-gradient-primary" size="lg">
                <Sparkles className="h-4 w-4 mr-2" />
                Enhance Photos
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Face Detection & Sorting */}
        <TabsContent value="face-detection" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Face Detection & Sorting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors">
                <div className="space-y-4">
                  <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Upload Photo Album</h3>
                    <p className="text-muted-foreground">AI will detect and group photos by people</p>
                  </div>
                  <Button className="bg-gradient-primary">
                    Upload Album
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Detected Persons</h4>
                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {['Bride', 'Groom', 'Father', 'Mother', 'Brother', 'Sister'].map((person, index) => (
                    <Card key={person}>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="aspect-square rounded-lg bg-secondary/50 border-2 border-dashed border-border flex items-center justify-center">
                            <Users className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <div className="text-center">
                            <p className="font-medium text-foreground">{person}</p>
                            <p className="text-sm text-muted-foreground">{Math.floor(Math.random() * 30) + 5} photos</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-gradient-primary" size="lg">
                <FolderOpen className="h-4 w-4 mr-2" />
                Create Organized Albums
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Eye Opening Tool */}
        <TabsContent value="eye-opening" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Eye Opening Tool
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors">
                <div className="space-y-4">
                  <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Eye className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Upload Photos with Closed Eyes</h3>
                    <p className="text-muted-foreground">AI will detect and open closed eyes naturally</p>
                  </div>
                  <Button className="bg-gradient-primary">
                    Choose Photos
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Detection Results</h4>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Card key={item}>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="aspect-video rounded-lg bg-secondary/50 border-2 border-dashed border-border flex items-center justify-center">
                            <Eye className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-foreground">IMG_{item.toString().padStart(3, '0')}.jpg</p>
                              <p className="text-xs text-muted-foreground">2 closed eyes detected</p>
                            </div>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline">
                                <Check className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-gradient-primary" size="lg">
                <Zap className="h-4 w-4 mr-2" />
                Process All Eyes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}