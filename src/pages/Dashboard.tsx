import React from 'react';
import { 
  Calendar, 
  CreditCard, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  Users, 
  Camera, 
  AlertCircle,
  CheckCircle,
  Plus,
  Phone,
  Send
} from 'lucide-react';
import { StatsCard } from '@/components/ui/stats-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import studioHero from '@/assets/studio-hero.jpg';

interface ActivityItem {
  id: string;
  type: 'payment' | 'booking' | 'delivery' | 'message';
  title: string;
  description: string;
  time: string;
  icon: React.ComponentType<any>;
  status?: 'success' | 'warning' | 'pending';
}

interface TodayEvent {
  id: string;
  time: string;
  title: string;
  customer: string;
  type: 'shoot' | 'delivery' | 'consultation';
  status: 'confirmed' | 'pending' | 'completed';
}

interface PaymentAlert {
  id: string;
  customer: string;
  amount: number;
  dueDate: string;
  daysOverdue: number;
  phone: string;
}

interface AITask {
  id: string;
  task: string;
  progress: number;
  estimatedTime: string;
}

export default function Dashboard() {
  const recentActivities: ActivityItem[] = [
    {
      id: '1',
      type: 'payment',
      title: 'Payment Received',
      description: 'Priya Singh paid ₹15,000 for wedding photography',
      time: '2 min ago',
      icon: CreditCard,
      status: 'success'
    },
    {
      id: '2',
      type: 'booking',
      title: 'New Booking',
      description: 'Amit Kumar booked pre-wedding shoot for March 15',
      time: '15 min ago',
      icon: Calendar,
      status: 'pending'
    },
    {
      id: '3',
      type: 'delivery',
      title: 'Photos Delivered',
      description: 'Wedding album delivered to Sharma family',
      time: '1 hour ago',
      icon: CheckCircle,
      status: 'success'
    },
    {
      id: '4',
      type: 'message',
      title: 'WhatsApp Sent',
      description: 'Birthday reminder sent to 5 customers',
      time: '2 hours ago',
      icon: MessageSquare
    }
  ];

  const todayEvents: TodayEvent[] = [
    {
      id: '1',
      time: '10:00 AM',
      title: 'Wedding Photography',
      customer: 'Priya & Rohit',
      type: 'shoot',
      status: 'confirmed'
    },
    {
      id: '2',
      time: '2:30 PM',
      title: 'Album Delivery',
      customer: 'Sharma Family',
      type: 'delivery',
      status: 'completed'
    },
    {
      id: '3',
      time: '4:00 PM',
      title: 'Portfolio Consultation',
      customer: 'Sneha Patel',
      type: 'consultation',
      status: 'pending'
    }
  ];

  const paymentAlerts: PaymentAlert[] = [
    {
      id: '1',
      customer: 'Rajesh Gupta',
      amount: 25000,
      dueDate: '2024-01-15',
      daysOverdue: 5,
      phone: '+91-98765-43210'
    },
    {
      id: '2',
      customer: 'Meera Singh',
      amount: 18000,
      dueDate: '2024-01-18',
      daysOverdue: 2,
      phone: '+91-87654-32109'
    }
  ];

  const aiTasks: AITask[] = [
    {
      id: '1',
      task: 'Background Removal - Wedding Batch',
      progress: 75,
      estimatedTime: '15 min'
    },
    {
      id: '2',
      task: 'Photo Enhancement - Birthday Party',
      progress: 45,
      estimatedTime: '25 min'
    },
    {
      id: '3',
      task: 'Face Sorting - Corporate Event',
      progress: 90,
      estimatedTime: '5 min'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
      case 'confirmed':
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'warning':
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'danger':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-primary p-8 text-primary-foreground">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={studioHero} 
            alt="Photography Studio" 
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Rajesh!</h1>
          <p className="text-primary-foreground/90 text-lg">
            You have 3 events today and ₹45,000 in pending payments
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Today's Events"
          value={3}
          change="+2 from yesterday"
          changeType="positive"
          icon={Calendar}
          variant="primary"
        />
        <StatsCard
          title="Pending Payments"
          value="₹45,000"
          change="2 overdue"
          changeType="negative"
          icon={CreditCard}
          variant="warning"
        />
        <StatsCard
          title="WhatsApp Credits"
          value={892}
          change="Valid till March"
          changeType="neutral"
          icon={MessageSquare}
          variant="success"
        />
        <StatsCard
          title="This Month's Revenue"
          value="₹2,85,000"
          change="+15% from last month"
          changeType="positive"
          icon={TrendingUp}
          variant="default"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's Schedule */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <div className="text-sm font-medium text-muted-foreground min-w-[4rem]">
                  {event.time}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{event.title}</h4>
                  <p className="text-sm text-muted-foreground">{event.customer}</p>
                </div>
                <Badge className={getStatusColor(event.status)}>
                  {event.status}
                </Badge>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    activity.status === 'success' ? 'bg-success/10 text-success' :
                    activity.status === 'warning' ? 'bg-warning/10 text-warning' :
                    'bg-primary/10 text-primary'
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="text-sm font-medium text-foreground">{activity.title}</h4>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Add New Customer
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Create Event
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Send Message
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Camera className="h-4 w-4 mr-2" />
              AI Photo Tools
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Payment Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Payment Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentAlerts.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 rounded-lg bg-destructive-light border border-destructive/20">
                <div>
                  <h4 className="font-medium text-foreground">{payment.customer}</h4>
                  <p className="text-sm text-muted-foreground">₹{payment.amount.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-destructive">{payment.daysOverdue} days overdue</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Processing Queue */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-accent-gold" />
              AI Processing Queue
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiTasks.map((task) => (
              <div key={task.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-foreground">{task.task}</h4>
                  <span className="text-xs text-muted-foreground">{task.estimatedTime}</span>
                </div>
                <Progress value={task.progress} className="h-2" />
                <p className="text-xs text-muted-foreground">{task.progress}% completed</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}