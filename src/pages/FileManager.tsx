import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { StatsCard } from '@/components/ui/stats-card';
import { Folder, File, Image, Video, Download, Upload, Copy, Move, Trash2, Search, Grid, List, HardDrive, CloudUpload, Shield, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'image' | 'video' | 'document';
  size: number;
  modified: string;
  thumbnail?: string;
  path: string;
}

const mockFiles: FileItem[] = [
  {
    id: '1',
    name: 'Sharma Wedding 2024',
    type: 'folder',
    size: 0,
    modified: '2024-12-08',
    path: '/events/weddings'
  },
  {
    id: '2',
    name: 'Priya Birthday Shoot',
    type: 'folder',
    size: 0,
    modified: '2024-12-07',
    path: '/events/birthdays'
  },
  {
    id: '3',
    name: 'IMG_001.jpg',
    type: 'image',
    size: 2.4 * 1024 * 1024,
    modified: '2024-12-08',
    path: '/events/weddings/sharma',
    thumbnail: '/placeholder.svg'
  },
  {
    id: '4',
    name: 'wedding_video.mp4',
    type: 'video',
    size: 125 * 1024 * 1024,
    modified: '2024-12-08',
    path: '/events/weddings/sharma'
  },
  {
    id: '5',
    name: 'Pre-Wedding Shoots',
    type: 'folder',
    size: 0,
    modified: '2024-12-06',
    path: '/events'
  },
  {
    id: '6',
    name: 'Corporate Events',
    type: 'folder',
    size: 0,
    modified: '2024-12-05',
    path: '/events'
  },
  {
    id: '7',
    name: 'edited_001.jpg',
    type: 'image',
    size: 3.2 * 1024 * 1024,
    modified: '2024-12-07',
    path: '/events/birthdays/priya',
    thumbnail: '/placeholder.svg'
  },
  {
    id: '8',
    name: 'client_agreement.pdf',
    type: 'document',
    size: 0.5 * 1024 * 1024,
    modified: '2024-12-06',
    path: '/documents'
  }
];

interface BackupJob {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'failed' | 'scheduled';
  progress: number;
  files: number;
  size: string;
  startTime: string;
}

const mockBackups: BackupJob[] = [
  {
    id: '1',
    name: 'Wedding Photos Backup',
    status: 'running',
    progress: 45,
    files: 1250,
    size: '15.2 GB',
    startTime: '2024-12-08T14:30:00'
  },
  {
    id: '2',
    name: 'Client Documents Backup',
    status: 'completed',
    progress: 100,
    files: 45,
    size: '250 MB',
    startTime: '2024-12-08T10:00:00'
  },
  {
    id: '3',
    name: 'Video Archive Backup',
    status: 'scheduled',
    progress: 0,
    files: 85,
    size: '8.5 GB',
    startTime: '2024-12-08T20:00:00'
  }
];

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getFileIcon = (type: string) => {
  switch (type) {
    case 'folder':
      return <Folder className="h-8 w-8 text-blue-500" />;
    case 'image':
      return <Image className="h-8 w-8 text-green-500" />;
    case 'video':
      return <Video className="h-8 w-8 text-purple-500" />;
    case 'document':
      return <File className="h-8 w-8 text-orange-500" />;
    default:
      return <File className="h-8 w-8 text-gray-500" />;
  }
};

const statusColors = {
  running: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  scheduled: 'bg-yellow-100 text-yellow-800'
};

export default function FileManager() {
  const [files] = useState<FileItem[]>(mockFiles);
  const [backups] = useState<BackupJob[]>(mockBackups);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'files' | 'backup' | 'tools'>('files');
  const { toast } = useToast();

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalFiles = files.filter(f => f.type !== 'folder').length;
  const totalFolders = files.filter(f => f.type === 'folder').length;
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  const storageUsed = 85; // percentage

  const handleFileSelect = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleBulkAction = (action: string) => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select files to perform this action",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Action Completed",
      description: `${action} completed for ${selectedFiles.length} files`,
    });
    setSelectedFiles([]);
  };

  const startBackup = () => {
    toast({
      title: "Backup Started",
      description: "Manual backup has been initiated",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">File Manager</h1>
          <p className="text-muted-foreground">Organize and manage your photography files</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Upload
          </Button>
          <Button className="gap-2">
            <CloudUpload className="h-4 w-4" />
            Cloud Sync
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Files"
          value={totalFiles.toString()}
          icon={File}
        />
        <StatsCard
          title="Folders"
          value={totalFolders.toString()}
          icon={Folder}
        />
        <StatsCard
          title="Storage Used"
          value={formatFileSize(totalSize)}
          icon={HardDrive}
        />
        <StatsCard
          title="Cloud Storage"
          value={`${storageUsed}%`}
          icon={CloudUpload}
        />
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 border-b">
        {['files', 'backup', 'tools'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded-t-lg transition-colors capitalize ${
              activeTab === tab
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'files' && (
        <>
          {/* File Actions */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search files..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {selectedFiles.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {selectedFiles.length} selected
                    </span>
                    <Button size="sm" variant="outline" onClick={() => handleBulkAction('Copy')}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleBulkAction('Move')}>
                      <Move className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleBulkAction('Download')}>
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleBulkAction('Delete')}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* File Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {filteredFiles.map((file) => (
                <Card
                  key={file.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedFiles.includes(file.id) ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleFileSelect(file.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center space-y-2">
                      {file.type === 'image' && file.thumbnail ? (
                        <img
                          src={file.thumbnail}
                          alt={file.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        getFileIcon(file.type)
                      )}
                      <div className="text-center">
                        <div className="text-sm font-medium truncate w-full" title={file.name}>
                          {file.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {file.type !== 'folder' && formatFileSize(file.size)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(file.modified).toLocaleDateString('en-IN')}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/50 ${
                        selectedFiles.includes(file.id) ? 'bg-primary/10' : ''
                      }`}
                      onClick={() => handleFileSelect(file.id)}
                    >
                      <div className="flex-shrink-0">
                        {file.type === 'image' && file.thumbnail ? (
                          <img
                            src={file.thumbnail}
                            alt={file.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                        ) : (
                          <div className="w-10 h-10 flex items-center justify-center">
                            {getFileIcon(file.type)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{file.name}</div>
                        <div className="text-sm text-muted-foreground">{file.path}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {file.type !== 'folder' ? formatFileSize(file.size) : '-'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(file.modified).toLocaleDateString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {activeTab === 'backup' && (
        <div className="space-y-6">
          {/* Backup Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Backup & Sync
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">1.2 TB</div>
                  <div className="text-sm text-muted-foreground">Backed Up</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">Daily</div>
                  <div className="text-sm text-muted-foreground">Auto Backup</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">3 Days</div>
                  <div className="text-sm text-muted-foreground">Last Backup</div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={startBackup} className="gap-2">
                  <Upload className="h-4 w-4" />
                  Start Manual Backup
                </Button>
                <Button variant="outline" className="gap-2">
                  <CloudUpload className="h-4 w-4" />
                  Configure Auto Backup
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Backup Jobs */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Backup Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {backups.map((backup) => (
                  <div key={backup.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-medium">{backup.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {backup.files} files • {backup.size}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`px-2 py-1 rounded text-xs font-medium ${statusColors[backup.status]}`}>
                          {backup.status}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(backup.startTime).toLocaleTimeString('en-IN', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </div>
                    {backup.status === 'running' && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{backup.progress}%</span>
                        </div>
                        <Progress value={backup.progress} className="h-2" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'tools' && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Operations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Bulk Rename</div>
                    <div className="text-sm text-muted-foreground">Rename multiple files with patterns</div>
                  </div>
                  <Button size="sm" variant="outline">
                    Open Tool
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Batch Resize</div>
                    <div className="text-sm text-muted-foreground">Resize images in bulk</div>
                  </div>
                  <Button size="sm" variant="outline">
                    Open Tool
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Format Converter</div>
                    <div className="text-sm text-muted-foreground">Convert file formats</div>
                  </div>
                  <Button size="sm" variant="outline">
                    Open Tool
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Storage Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Storage Usage</span>
                    <span>{storageUsed}%</span>
                  </div>
                  <Progress value={storageUsed} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Images</span>
                    <span>45%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Videos</span>
                    <span>35%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Documents</span>
                    <span>5%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}