import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { StatsCard } from '@/components/ui/stats-card';
import { IndianRupee, CreditCard, Wallet, TrendingUp, Search, Filter, Download, Plus, Phone, Calendar, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Payment {
  id: string;
  customer: string;
  event: string;
  amount: number;
  type: 'advance' | 'balance' | 'full';
  method: 'cash' | 'upi' | 'card' | 'bank';
  status: 'pending' | 'received' | 'overdue';
  date: string;
  dueDate?: string;
  phone: string;
}

interface CreditTransaction {
  id: string;
  customer: string;
  type: 'earned' | 'redeemed' | 'expired';
  amount: number;
  reason: string;
  date: string;
}

const mockPayments: Payment[] = [
  {
    id: '1',
    customer: 'Raj Sharma',
    event: 'Sharma Wedding',
    amount: 60000,
    type: 'balance',
    method: 'upi',
    status: 'pending',
    date: '2024-12-15',
    dueDate: '2024-12-20',
    phone: '+91-98765-43210'
  },
  {
    id: '2',
    customer: 'Priya Gupta',
    event: 'Birthday Shoot',
    amount: 10000,
    type: 'balance',
    method: 'cash',
    status: 'overdue',
    date: '2024-12-01',
    dueDate: '2024-12-05',
    phone: '+91-87654-32109'
  },
  {
    id: '3',
    customer: 'Rahul Kumar',
    event: 'Corporate Event',
    amount: 30000,
    type: 'balance',
    method: 'bank',
    status: 'pending',
    date: '2024-12-20',
    dueDate: '2024-12-25',
    phone: '+91-76543-21098'
  },
  {
    id: '4',
    customer: 'Meera Patel',
    event: 'Pre-Wedding Shoot',
    amount: 23000,
    type: 'balance',
    method: 'upi',
    status: 'received',
    date: '2024-12-10',
    phone: '+91-65432-10987'
  },
  {
    id: '5',
    customer: 'Suresh Gupta',
    event: 'Anniversary Shoot',
    amount: 5000,
    type: 'balance',
    method: 'cash',
    status: 'received',
    date: '2024-12-08',
    phone: '+91-54321-09876'
  }
];

const mockCredits: CreditTransaction[] = [
  {
    id: '1',
    customer: 'Raj Sharma',
    type: 'earned',
    amount: 1200,
    reason: 'Wedding package bonus',
    date: '2024-12-01'
  },
  {
    id: '2',
    customer: 'Priya Gupta',
    type: 'redeemed',
    amount: 500,
    reason: 'Birthday shoot discount',
    date: '2024-12-05'
  },
  {
    id: '3',
    customer: 'Meera Patel',
    type: 'earned',
    amount: 800,
    reason: 'Referral bonus',
    date: '2024-12-08'
  }
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  received: 'bg-green-100 text-green-800',
  overdue: 'bg-red-100 text-red-800'
};

const methodIcons = {
  cash: '💵',
  upi: '📱',
  card: '💳',
  bank: '🏦'
};

export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [credits] = useState<CreditTransaction[]>(mockCredits);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'payments' | 'credits'>('payments');
  const { toast } = useToast();

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.event.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPending = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalOverdue = payments
    .filter(p => p.status === 'overdue')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalReceived = payments
    .filter(p => p.status === 'received')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalCredits = credits
    .filter(c => c.type === 'earned')
    .reduce((sum, c) => sum + c.amount, 0) -
    credits
    .filter(c => c.type === 'redeemed')
    .reduce((sum, c) => sum + c.amount, 0);

  const markAsReceived = (paymentId: string) => {
    setPayments(prev => prev.map(payment => 
      payment.id === paymentId ? { ...payment, status: 'received' as const } : payment
    ));
    toast({
      title: "Payment Received",
      description: "Payment status updated successfully",
    });
  };

  const sendReminder = (payment: Payment) => {
    toast({
      title: "Reminder Sent",
      description: `Payment reminder sent to ${payment.customer}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payments & Credits</h1>
          <p className="text-muted-foreground">Manage payments and customer credit system</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Payment
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Pending Payments"
          value={`₹${totalPending.toLocaleString('en-IN')}`}
          icon={IndianRupee}
        />
        <StatsCard
          title="Overdue Payments"
          value={`₹${totalOverdue.toLocaleString('en-IN')}`}
          icon={AlertCircle}
        />
        <StatsCard
          title="Received This Month"
          value={`₹${totalReceived.toLocaleString('en-IN')}`}
          icon={TrendingUp}
        />
        <StatsCard
          title="Customer Credits"
          value={`₹${totalCredits.toLocaleString('en-IN')}`}
          icon={Wallet}
        />
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 border-b">
        <button
          onClick={() => setActiveTab('payments')}
          className={`px-4 py-2 rounded-t-lg transition-colors ${
            activeTab === 'payments'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Payments
        </button>
        <button
          onClick={() => setActiveTab('credits')}
          className={`px-4 py-2 rounded-t-lg transition-colors ${
            activeTab === 'credits'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Credits
        </button>
      </div>

      {activeTab === 'payments' && (
        <>
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search payments..."
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
                    <option value="pending">Pending</option>
                    <option value="received">Received</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payments List */}
          <div className="space-y-4">
            {filteredPayments.map((payment) => (
              <Card key={payment.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{methodIcons[payment.method]}</div>
                      <div>
                        <h3 className="font-medium">{payment.customer}</h3>
                        <p className="text-sm text-muted-foreground">{payment.event}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {payment.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Due: {payment.dueDate ? new Date(payment.dueDate).toLocaleDateString('en-IN') : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-bold text-lg flex items-center gap-1">
                          <IndianRupee className="h-4 w-4" />
                          {payment.amount.toLocaleString('en-IN')}
                        </div>
                        <Badge className={statusColors[payment.status]}>{payment.status}</Badge>
                      </div>
                      
                      <div className="flex gap-2">
                        {payment.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => markAsReceived(payment.id)}
                          >
                            Mark Received
                          </Button>
                        )}
                        {(payment.status === 'pending' || payment.status === 'overdue') && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => sendReminder(payment)}
                          >
                            Send Reminder
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {activeTab === 'credits' && (
        <div className="space-y-4">
          {/* Credit System Info */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Credit System</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">₹{totalCredits}</div>
                  <div className="text-sm text-muted-foreground">Total Active Credits</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">5%</div>
                  <div className="text-sm text-muted-foreground">Cashback Rate</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">₹500</div>
                  <div className="text-sm text-muted-foreground">Referral Bonus</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Credit Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Credit Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {credits.map((credit) => (
                  <div key={credit.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        credit.type === 'earned' ? 'bg-green-500' : 
                        credit.type === 'redeemed' ? 'bg-blue-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <div className="font-medium">{credit.customer}</div>
                        <div className="text-sm text-muted-foreground">{credit.reason}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${
                        credit.type === 'earned' ? 'text-green-600' : 
                        credit.type === 'redeemed' ? 'text-blue-600' : 'text-red-600'
                      }`}>
                        {credit.type === 'earned' ? '+' : '-'}₹{credit.amount}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(credit.date).toLocaleDateString('en-IN')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {filteredPayments.length === 0 && activeTab === 'payments' && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No payments found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Start by adding your first payment'
                }
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}