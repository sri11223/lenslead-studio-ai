import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  Upload, 
  Phone, 
  MessageSquare, 
  Eye, 
  Calendar,
  CreditCard,
  MapPin,
  Mail,
  Star,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  lastEvent: string;
  lastEventType: 'wedding' | 'birthday' | 'corporate' | 'pre-wedding';
  creditBalance: number;
  totalSpent: number;
  loyaltyStatus: 'bronze' | 'silver' | 'gold' | 'platinum';
  joinDate: string;
  avatar?: string;
  eventsCount: number;
  lastInteraction: string;
  birthday?: string;
  anniversary?: string;
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    phone: '+91-98765-43210',
    email: 'priya.sharma@email.com',
    address: 'Bandra West',
    city: 'Mumbai',
    lastEvent: 'Wedding Photography',
    lastEventType: 'wedding',
    creditBalance: 5000,
    totalSpent: 85000,
    loyaltyStatus: 'gold',
    joinDate: '2023-06-15',
    eventsCount: 3,
    lastInteraction: '2 days ago',
    birthday: '1995-08-20',
    anniversary: '2023-12-15'
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    phone: '+91-87654-32109',
    email: 'rajesh.kumar@email.com',
    address: 'Connaught Place',
    city: 'Delhi',
    lastEvent: 'Corporate Event',
    lastEventType: 'corporate',
    creditBalance: 2500,
    totalSpent: 45000,
    loyaltyStatus: 'silver',
    joinDate: '2023-09-10',
    eventsCount: 2,
    lastInteraction: '1 week ago',
    birthday: '1988-03-12'
  },
  {
    id: '3',
    name: 'Sneha Patel',
    phone: '+91-76543-21098',
    email: 'sneha.patel@email.com',
    address: 'Koramangala',
    city: 'Bangalore',
    lastEvent: 'Pre-Wedding Shoot',
    lastEventType: 'pre-wedding',
    creditBalance: 8000,
    totalSpent: 125000,
    loyaltyStatus: 'platinum',
    joinDate: '2022-11-20',
    eventsCount: 5,
    lastInteraction: '3 days ago',
    birthday: '1992-11-08',
    anniversary: '2024-02-14'
  },
  {
    id: '4',
    name: 'Amit Singh',
    phone: '+91-65432-10987',
    email: 'amit.singh@email.com',
    address: 'Sector 62',
    city: 'Noida',
    lastEvent: 'Birthday Party',
    lastEventType: 'birthday',
    creditBalance: 1000,
    totalSpent: 25000,
    loyaltyStatus: 'bronze',
    joinDate: '2024-01-05',
    eventsCount: 1,
    lastInteraction: '5 days ago',
    birthday: '1990-07-25'
  },
  {
    id: '5',
    name: 'Meera Reddy',
    phone: '+91-54321-09876',
    email: 'meera.reddy@email.com',
    address: 'Jubilee Hills',
    city: 'Hyderabad',
    lastEvent: 'Wedding Photography',
    lastEventType: 'wedding',
    creditBalance: 3500,
    totalSpent: 95000,
    loyaltyStatus: 'gold',
    joinDate: '2023-04-18',
    eventsCount: 4,
    lastInteraction: '1 day ago',
    birthday: '1993-05-14',
    anniversary: '2023-11-28'
  }
];

export default function Customers() {
  const [customers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const getLoyaltyColor = (status: Customer['loyaltyStatus']) => {
    switch (status) {
      case 'platinum':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'gold':
        return 'bg-gradient-gold text-accent-gold-foreground';
      case 'silver':
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
      default:
        return 'bg-gradient-to-r from-amber-600 to-amber-700 text-white';
    }
  };

  const getEventTypeColor = (type: Customer['lastEventType']) => {
    switch (type) {
      case 'wedding':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'birthday':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'corporate':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'pre-wedding':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-secondary text-secondary-foreground border-border';
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || customer.loyaltyStatus === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customer Management</h1>
          <p className="text-muted-foreground">Manage your photography clients and their information</p>
        </div>
        <Button className="bg-gradient-primary hover:bg-primary-hover">
          <Plus className="h-4 w-4 mr-2" />
          Add New Customer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold">{customers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent-gold/10 flex items-center justify-center">
                <Star className="h-5 w-5 text-accent-gold" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">VIP Customers</p>
                <p className="text-2xl font-bold">
                  {customers.filter(c => c.loyaltyStatus === 'platinum' || c.loyaltyStatus === 'gold').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Credits</p>
                <p className="text-2xl font-bold">
                  ₹{customers.reduce((sum, c) => sum + c.creditBalance, 0).toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">New customers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div className="flex flex-1 gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name, phone, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="platinum">Platinum</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="silver">Silver</SelectItem>
                  <SelectItem value="bronze">Bronze</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Customer Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedCustomers.map((customer) => (
              <Card key={customer.id} className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {/* Customer Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={customer.avatar} />
                          <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                            {getInitials(customer.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground truncate">{customer.name}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {customer.city}
                          </p>
                        </div>
                      </div>
                      <Badge className={`text-xs ${getLoyaltyColor(customer.loyaltyStatus)}`}>
                        {customer.loyaltyStatus.toUpperCase()}
                      </Badge>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span className="truncate">{customer.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{customer.email}</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Last Event:</span>
                        <Badge variant="outline" className={getEventTypeColor(customer.lastEventType)}>
                          {customer.lastEvent}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Credit Balance:</span>
                        <span className="font-medium text-success">₹{customer.creditBalance.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Spent:</span>
                        <span className="font-medium">₹{customer.totalSpent.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Events:</span>
                        <span className="font-medium">{customer.eventsCount}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2 border-t border-border">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-6 border-t border-border">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length} customers
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}