import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Camera, User, Bell, Palette, Database, Shield, FileText, Globe, Save, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StudioSettings {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logo: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  reminderNotifications: boolean;
  paymentNotifications: boolean;
  birthdayReminders: boolean;
}

interface AppearanceSettings {
  theme: 'light' | 'dark' | 'auto';
  colorScheme: string;
  compactMode: boolean;
  showAnimations: boolean;
}

interface BackupSettings {
  autoBackup: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  cloudSync: boolean;
  retentionDays: number;
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'studio' | 'notifications' | 'appearance' | 'backup' | 'security'>('studio');
  const { toast } = useToast();

  const [studioSettings, setStudioSettings] = useState<StudioSettings>({
    name: 'Professional Photography Studio',
    tagline: 'Capturing Life\'s Beautiful Moments',
    address: '123, Photography Street, Mumbai, Maharashtra 400001',
    phone: '+91-98765-43210',
    email: 'info@photostudio.com',
    website: 'www.photostudio.com',
    logo: ''
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    reminderNotifications: true,
    paymentNotifications: true,
    birthdayReminders: true
  });

  const [appearanceSettings, setAppearanceSettings] = useState<AppearanceSettings>({
    theme: 'light',
    colorScheme: 'blue',
    compactMode: false,
    showAnimations: true
  });

  const [backupSettings, setBackupSettings] = useState<BackupSettings>({
    autoBackup: true,
    backupFrequency: 'daily',
    cloudSync: true,
    retentionDays: 30
  });

  const saveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully",
    });
  };

  const resetSettings = () => {
    toast({
      title: "Settings Reset",
      description: "Settings have been reset to default values",
    });
  };

  const tabs = [
    { id: 'studio', label: 'Studio Info', icon: Camera },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'backup', label: 'Backup', icon: Database },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your application preferences and configurations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetSettings}>
            Reset to Default
          </Button>
          <Button onClick={saveSettings} className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Settings Navigation */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </CardContent>
        </Card>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === 'studio' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Studio Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="studio-name">Studio Name</Label>
                    <Input
                      id="studio-name"
                      value={studioSettings.name}
                      onChange={(e) => setStudioSettings(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input
                      id="tagline"
                      value={studioSettings.tagline}
                      onChange={(e) => setStudioSettings(prev => ({ ...prev, tagline: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={studioSettings.address}
                    onChange={(e) => setStudioSettings(prev => ({ ...prev, address: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={studioSettings.phone}
                      onChange={(e) => setStudioSettings(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={studioSettings.email}
                      onChange={(e) => setStudioSettings(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={studioSettings.website}
                    onChange={(e) => setStudioSettings(prev => ({ ...prev, website: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>Studio Logo</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      {studioSettings.logo ? (
                        <img src={studioSettings.logo} alt="Logo" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <Camera className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <Button variant="outline" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Logo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => 
                        setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive SMS alerts for important events</p>
                    </div>
                    <Switch
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={(checked) => 
                        setNotificationSettings(prev => ({ ...prev, smsNotifications: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Browser push notifications</p>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => 
                        setNotificationSettings(prev => ({ ...prev, pushNotifications: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Payment Reminders</Label>
                      <p className="text-sm text-muted-foreground">Automatic payment reminder notifications</p>
                    </div>
                    <Switch
                      checked={notificationSettings.paymentNotifications}
                      onCheckedChange={(checked) => 
                        setNotificationSettings(prev => ({ ...prev, paymentNotifications: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Birthday Reminders</Label>
                      <p className="text-sm text-muted-foreground">Get notified about customer birthdays</p>
                    </div>
                    <Switch
                      checked={notificationSettings.birthdayReminders}
                      onCheckedChange={(checked) => 
                        setNotificationSettings(prev => ({ ...prev, birthdayReminders: checked }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'appearance' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Appearance Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Theme</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {['light', 'dark', 'auto'].map((theme) => (
                      <button
                        key={theme}
                        onClick={() => setAppearanceSettings(prev => ({ ...prev, theme: theme as any }))}
                        className={`p-3 border rounded-lg text-center capitalize transition-colors ${
                          appearanceSettings.theme === theme
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:bg-muted'
                        }`}
                      >
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Color Scheme</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {['blue', 'green', 'purple', 'orange'].map((color) => (
                      <button
                        key={color}
                        onClick={() => setAppearanceSettings(prev => ({ ...prev, colorScheme: color }))}
                        className={`p-3 border rounded-lg text-center capitalize transition-colors ${
                          appearanceSettings.colorScheme === color
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:bg-muted'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full mx-auto mb-1 bg-${color}-500`}></div>
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Compact Mode</Label>
                      <p className="text-sm text-muted-foreground">Reduce spacing for more content</p>
                    </div>
                    <Switch
                      checked={appearanceSettings.compactMode}
                      onCheckedChange={(checked) => 
                        setAppearanceSettings(prev => ({ ...prev, compactMode: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Animations</Label>
                      <p className="text-sm text-muted-foreground">Enable interface animations</p>
                    </div>
                    <Switch
                      checked={appearanceSettings.showAnimations}
                      onCheckedChange={(checked) => 
                        setAppearanceSettings(prev => ({ ...prev, showAnimations: checked }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'backup' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Backup Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Automatic Backup</Label>
                    <p className="text-sm text-muted-foreground">Enable scheduled automatic backups</p>
                  </div>
                  <Switch
                    checked={backupSettings.autoBackup}
                    onCheckedChange={(checked) => 
                      setBackupSettings(prev => ({ ...prev, autoBackup: checked }))
                    }
                  />
                </div>

                <div>
                  <Label>Backup Frequency</Label>
                  <select
                    value={backupSettings.backupFrequency}
                    onChange={(e) => setBackupSettings(prev => ({ ...prev, backupFrequency: e.target.value as any }))}
                    className="w-full mt-2 border rounded-md px-3 py-2 bg-background"
                    disabled={!backupSettings.autoBackup}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Cloud Sync</Label>
                    <p className="text-sm text-muted-foreground">Sync backups to cloud storage</p>
                  </div>
                  <Switch
                    checked={backupSettings.cloudSync}
                    onCheckedChange={(checked) => 
                      setBackupSettings(prev => ({ ...prev, cloudSync: checked }))
                    }
                  />
                </div>

                <div>
                  <Label>Retention Period (days)</Label>
                  <Input
                    type="number"
                    value={backupSettings.retentionDays}
                    onChange={(e) => setBackupSettings(prev => ({ ...prev, retentionDays: parseInt(e.target.value) }))}
                    className="mt-2"
                    min="1"
                    max="365"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Keep backups for this many days before automatic deletion
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950">
                  <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    Authentication Required
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                    To configure security settings like login/logout, password policies, and user management, 
                    you need to connect to Supabase for backend authentication.
                  </p>
                  <Button variant="outline" className="gap-2">
                    <Globe className="h-4 w-4" />
                    Connect Supabase
                  </Button>
                </div>

                <div className="space-y-4 opacity-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add extra security to your account</p>
                    </div>
                    <Switch disabled />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Session Timeout</Label>
                      <p className="text-sm text-muted-foreground">Automatically log out after inactivity</p>
                    </div>
                    <Switch disabled />
                  </div>

                  <div>
                    <Label>Password Policy</Label>
                    <div className="mt-2 space-y-2 text-sm text-muted-foreground">
                      <div>• Minimum 8 characters</div>
                      <div>• At least one uppercase letter</div>
                      <div>• At least one number</div>
                      <div>• At least one special character</div>
                    </div>
                  </div>

                  <Button variant="outline" disabled className="gap-2">
                    <FileText className="h-4 w-4" />
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}