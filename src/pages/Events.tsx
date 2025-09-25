import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Camera, Users, IndianRupee, Phone, Plus, Filter, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Event {
  id: string;
  title: string;
  customer: string;
  phone: string;
  date: string;
  time: string;
  venue: string;
  type: 'wedding' | 'birthday' | 'corporate' | 'pre-wedding';
  status: 'booked' | 'confirmed' | 'shot' | 'editing' | 'ready' | 'delivered';
  amount: number;
  advance: number;
  photographer: string;
  description: string;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Sharma Wedding',
    customer: 'Raj Sharma',
    phone: '+91-98765-43210',
    date: '2024-12-15',
    time: '11:00 AM',
    venue: 'Grand Palace, Mumbai',
    type: 'wedding',
    status: 'confirmed',
    amount: 85000,
    advance: 25000,
    photographer: 'Arjun Photography',
    description: 'Traditional Indian wedding with 300 guests'
  },
  {
    id: '2',
    title: 'Priya Birthday Shoot',
    customer: 'Priya Gupta',
    phone: '+91-87654-32109',
    date: '2024-12-10',
    time: '4:00 PM',
    venue: 'Beach Resort, Goa',
    type: 'birthday',
    status: 'shot',
    amount: 15000,
    advance: 5000,
    photographer: 'Vikram Lens',
    description: '21st birthday celebration photoshoot'
  },
  {
    id: '3',
    title: 'Tech Corp Annual Meet',
    customer: 'Rahul Kumar',
    phone: '+91-76543-21098',
    date: '2024-12-20',
    time: '9:00 AM',
    venue: 'Convention Center, Delhi',
    type: 'corporate',
    status: 'booked',
    amount: 45000,
    advance: 15000,
    photographer: 'Studio Pro',
    description: 'Corporate event photography and videography'
  },
  {
    id: '4',
    title: 'Meera Pre-Wedding',
    customer: 'Meera Patel',
    phone: '+91-65432-10987',
    date: '2024-12-12',
    time: '6:00 AM',
    venue: 'Udaipur Palace',
    type: 'pre-wedding',
    status: 'editing',
    amount: 35000,
    advance: 12000,
    photographer: 'Royal Captures',
    description: 'Pre-wedding shoot at heritage location'
  },
  {
    id: '5',
    title: 'Gupta Anniversary',
    customer: 'Suresh Gupta',
    phone: '+91-54321-09876',
    date: '2024-12-08',
    time: '7:00 PM',
    venue: 'Home Studio',
    type: 'birthday',
    status: 'ready',
    amount: 8000,
    advance: 3000,
    photographer: 'Arjun Photography',
    description: '25th wedding anniversary photoshoot'
  },
  {
    id: '6',
    title: 'Singh Wedding',
    customer: 'Manpreet Singh',
    phone: '+91-43210-98765',
    date: '2024-11-30',
    time: '10:00 AM',
    venue: 'Golden Temple Hall',
    type: 'wedding',
    status: 'delivered',
    amount: 95000,
    advance: 30000,
    photographer: 'Studio Pro',
    description: 'Sikh wedding ceremony with traditional rituals'
  }
];

const statusColors = {
  booked: 'bg-blue-100 text-blue-800',
  confirmed: 'bg-yellow-100 text-yellow-800',
  shot: 'bg-purple-100 text-purple-800',
  editing: 'bg-orange-100 text-orange-800',
  ready: 'bg-green-100 text-green-800',
  delivered: 'bg-gray-100 text-gray-800'
};

const typeColors = {
  wedding: 'bg-red-100 text-red-800',
  birthday: 'bg-blue-100 text-blue-800',
  corporate: 'bg-gray-100 text-gray-800',
  'pre-wedding': 'bg-pink-100 text-pink-800'
};

export default function Events() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { toast } = useToast();

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (eventId: string, newStatus: Event['status']) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId ? { ...event, status: newStatus } : event
    ));
    toast({
      title: "Status Updated",
      description: `Event status changed to ${newStatus}`,
    });
  };

  const getStatusOrder = (status: Event['status']) => {
    const order = ['booked', 'confirmed', 'shot', 'editing', 'ready', 'delivered'];
    return order.indexOf(status);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Events & Bookings</h1>
          <p className="text-muted-foreground">Manage your photography events and bookings</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Event
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search events or customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded-md px-3 py-2 bg-background"
              >
                <option value="all">All Status</option>
                <option value="booked">Booked</option>
                <option value="confirmed">Confirmed</option>
                <option value="shot">Shot</option>
                <option value="editing">Editing</option>
                <option value="ready">Ready</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{event.customer}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge className={statusColors[event.status]}>{event.status}</Badge>
                  <Badge variant="outline" className={typeColors[event.type]}>{event.type}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(event.date).toLocaleDateString('en-IN')}</span>
                  <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{event.venue}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{event.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Camera className="h-4 w-4 text-muted-foreground" />
                  <span>{event.photographer}</span>
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium flex items-center gap-1">
                    <IndianRupee className="h-3 w-3" />
                    {event.amount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Advance:</span>
                  <span className="font-medium flex items-center gap-1">
                    <IndianRupee className="h-3 w-3" />
                    {event.advance.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm font-medium">
                  <span>Balance:</span>
                  <span className="text-red-600 flex items-center gap-1">
                    <IndianRupee className="h-3 w-3" />
                    {(event.amount - event.advance).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => setSelectedEvent(event)}
                >
                  View Details
                </Button>
                <div className="flex gap-1">
                  {getStatusOrder(event.status) < 5 && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        const statuses: Event['status'][] = ['booked', 'confirmed', 'shot', 'editing', 'ready', 'delivered'];
                        const currentIndex = statuses.indexOf(event.status);
                        if (currentIndex < statuses.length - 1) {
                          handleStatusChange(event.id, statuses[currentIndex + 1]);
                        }
                      }}
                    >
                      →
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No events found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Start by creating your first event'
                }
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Event
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}