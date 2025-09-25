import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { StatsCard } from '@/components/ui/stats-card';
import { MessageCircle, Send, Clock, CheckCircle, X, Search, Plus, Calendar, Gift, CreditCard, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  customer: string;
  phone: string;
  message: string;
  type: 'manual' | 'birthday' | 'anniversary' | 'reminder' | 'festival';
  status: 'sent' | 'delivered' | 'read' | 'failed';
  timestamp: string;
  cost: number;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  birthday?: string;
  anniversary?: string;
}

const mockMessages: Message[] = [
  {
    id: '1',
    customer: 'Raj Sharma',
    phone: '+91-98765-43210',
    message: 'Dear Raj, Thank you for choosing our photography services! Your wedding album is ready for delivery. Please visit our studio at your convenience.',
    type: 'manual',
    status: 'delivered',
    timestamp: '2024-12-08T14:30:00',
    cost: 0.50
  },
  {
    id: '2',
    customer: 'Priya Gupta',
    phone: '+91-87654-32109',
    message: 'Happy Birthday Priya! 🎉 Wishing you a wonderful year ahead. Book your birthday photoshoot with 20% off!',
    type: 'birthday',
    status: 'read',
    timestamp: '2024-12-07T09:00:00',
    cost: 0.50
  },
  {
    id: '3',
    customer: 'Meera Patel',
    phone: '+91-65432-10987',
    message: 'Reminder: Your balance payment of ₹23,000 for the pre-wedding shoot is due tomorrow. Please make the payment to avoid any delays.',
    type: 'reminder',
    status: 'delivered',
    timestamp: '2024-12-06T16:45:00',
    cost: 0.50
  },
  {
    id: '4',
    customer: 'Suresh Gupta',
    phone: '+91-54321-09876',
    message: 'Happy 25th Anniversary! 💕 Celebrate this milestone with our exclusive couple photoshoot package. Book now!',
    type: 'anniversary',
    status: 'sent',
    timestamp: '2024-12-05T08:00:00',
    cost: 0.50
  }
];

const mockCustomers: Customer[] = [
  { id: '1', name: 'Raj Sharma', phone: '+91-98765-43210', birthday: '1990-12-15', anniversary: '2020-02-14' },
  { id: '2', name: 'Priya Gupta', phone: '+91-87654-32109', birthday: '1995-12-10' },
  { id: '3', name: 'Rahul Kumar', phone: '+91-76543-21098', birthday: '1988-01-22' },
  { id: '4', name: 'Meera Patel', phone: '+91-65432-10987', anniversary: '2019-11-30' },
  { id: '5', name: 'Suresh Gupta', phone: '+91-54321-09876', anniversary: '1999-12-05' }
];

const messageTemplates = {
  birthday: "Happy Birthday {name}! 🎉 Wishing you a wonderful year ahead. Book your birthday photoshoot with 20% off!",
  anniversary: "Happy Anniversary {name}! 💕 Celebrate this milestone with our exclusive couple photoshoot package. Book now!",
  reminder: "Reminder: Your payment is due. Please complete your payment to avoid any delays in service.",
  festival: "Wishing you and your family a very Happy {festival}! 🎊 Special festive photoshoot packages available.",
  delivery: "Great news! Your photos are ready for delivery. Please visit our studio at your convenience."
};

const statusColors = {
  sent: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
  read: 'bg-purple-100 text-purple-800',
  failed: 'bg-red-100 text-red-800'
};

const statusIcons = {
  sent: <Clock className="h-3 w-3" />,
  delivered: <CheckCircle className="h-3 w-3" />,
  read: <CheckCircle className="h-3 w-3" />,
  failed: <X className="h-3 w-3" />
};

export default function Messaging() {
  const [messages] = useState<Message[]>(mockMessages);
  const [customers] = useState<Customer[]>(mockCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  const [messageText, setMessageText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'send' | 'history' | 'campaigns'>('send');
  const [credits] = useState(2500);
  const { toast } = useToast();

  const filteredMessages = messages.filter(message =>
    message.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSent = messages.length;
  const totalDelivered = messages.filter(m => m.status === 'delivered' || m.status === 'read').length;
  const totalCost = messages.reduce((sum, m) => sum + m.cost, 0);
  const deliveryRate = totalSent > 0 ? (totalDelivered / totalSent) * 100 : 0;

  const sendMessage = () => {
    if (!selectedCustomer || !messageText.trim()) {
      toast({
        title: "Error",
        description: "Please select a customer and enter a message",
        variant: "destructive"
      });
      return;
    }

    const customer = customers.find(c => c.id === selectedCustomer);
    if (!customer) return;

    toast({
      title: "Message Sent",
      description: `Message sent to ${customer.name} successfully`,
    });

    setMessageText('');
    setSelectedCustomer('');
    setSelectedTemplate('');
  };

  const applyTemplate = (template: string) => {
    const customer = customers.find(c => c.id === selectedCustomer);
    if (!customer) {
      toast({
        title: "Select Customer",
        description: "Please select a customer first",
        variant: "destructive"
      });
      return;
    }

    let message = messageTemplates[template as keyof typeof messageTemplates];
    message = message.replace('{name}', customer.name);
    setMessageText(message);
    setSelectedTemplate(template);
  };

  const getUpcomingBirthdays = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return customers.filter(customer => {
      if (!customer.birthday) return false;
      const birthday = new Date(customer.birthday);
      birthday.setFullYear(today.getFullYear());
      return birthday >= today && birthday <= nextWeek;
    });
  };

  const getUpcomingAnniversaries = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return customers.filter(customer => {
      if (!customer.anniversary) return false;
      const anniversary = new Date(customer.anniversary);
      anniversary.setFullYear(today.getFullYear());
      return anniversary >= today && anniversary <= nextWeek;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">WhatsApp Messaging</h1>
          <p className="text-muted-foreground">Send messages and manage customer communications</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">{credits}</div>
            <div className="text-sm text-muted-foreground">Credits Remaining</div>
          </div>
          <Button className="gap-2">
            <CreditCard className="h-4 w-4" />
            Top Up Credits
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Messages Sent"
          value={totalSent.toString()}
          icon={MessageCircle}
        />
        <StatsCard
          title="Delivery Rate"
          value={`${deliveryRate.toFixed(1)}%`}
          icon={CheckCircle}
        />
        <StatsCard
          title="Credits Used"
          value={totalCost.toFixed(2)}
          icon={Zap}
        />
        <StatsCard
          title="Credits Balance"
          value={credits.toString()}
          icon={CreditCard}
        />
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 border-b">
        {['send', 'history', 'campaigns'].map((tab) => (
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

      {activeTab === 'send' && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Send Message Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Send New Message
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Select Customer</label>
                <select
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 bg-background"
                >
                  <option value="">Choose a customer...</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name} - {customer.phone}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Message Templates</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(messageTemplates).map((template) => (
                    <Button
                      key={template}
                      variant={selectedTemplate === template ? "default" : "outline"}
                      size="sm"
                      onClick={() => applyTemplate(template)}
                      className="capitalize"
                    >
                      {template}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <Textarea
                  placeholder="Type your message here..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  rows={4}
                />
                <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                  <span>{messageText.length} characters</span>
                  <span>Cost: ₹0.50</span>
                </div>
              </div>

              <Button onClick={sendMessage} className="w-full gap-2">
                <Send className="h-4 w-4" />
                Send Message
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Birthdays
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getUpcomingBirthdays().map((customer) => (
                    <div key={customer.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {customer.birthday && new Date(customer.birthday).toLocaleDateString('en-IN')}
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Send Wishes
                      </Button>
                    </div>
                  ))}
                  {getUpcomingBirthdays().length === 0 && (
                    <p className="text-muted-foreground text-center py-4">
                      No upcoming birthdays this week
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Upcoming Anniversaries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getUpcomingAnniversaries().map((customer) => (
                    <div key={customer.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {customer.anniversary && new Date(customer.anniversary).toLocaleDateString('en-IN')}
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Send Wishes
                      </Button>
                    </div>
                  ))}
                  {getUpcomingAnniversaries().length === 0 && (
                    <p className="text-muted-foreground text-center py-4">
                      No upcoming anniversaries this week
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <>
          {/* Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Message History */}
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <Card key={message.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{message.customer}</h3>
                        <Badge variant="outline">{message.type}</Badge>
                        <Badge className={statusColors[message.status]}>
                          <div className="flex items-center gap-1">
                            {statusIcons[message.status]}
                            {message.status}
                          </div>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{message.phone}</p>
                      <p className="text-sm bg-muted p-3 rounded-lg">{message.message}</p>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div>{new Date(message.timestamp).toLocaleDateString('en-IN')}</div>
                      <div>{new Date(message.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div>
                      <div className="font-medium mt-1">₹{message.cost}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {activeTab === 'campaigns' && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Automated Campaigns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Birthday Messages</div>
                  <div className="text-sm text-muted-foreground">Send automatic birthday wishes</div>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Anniversary Messages</div>
                  <div className="text-sm text-muted-foreground">Send automatic anniversary wishes</div>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Payment Reminders</div>
                  <div className="text-sm text-muted-foreground">Remind customers about due payments</div>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Paused</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Festival Campaigns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Diwali Campaign</div>
                  <div className="text-sm text-muted-foreground">Special festive offers</div>
                </div>
                <Button size="sm" variant="outline">
                  Schedule
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Christmas Campaign</div>
                  <div className="text-sm text-muted-foreground">Holiday photography packages</div>
                </div>
                <Button size="sm" variant="outline">
                  Schedule
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">New Year Campaign</div>
                  <div className="text-sm text-muted-foreground">New year special shoots</div>
                </div>
                <Button size="sm" variant="outline">
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}