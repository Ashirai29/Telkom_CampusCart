import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Shield, 
  Users, 
  Package, 
  AlertTriangle, 
  TrendingUp,
  Search,
  MoreVertical,
  Ban,
  CheckCircle,
  XCircle,
  Flag,
  MessageCircle,
  ArrowLeft,
  Eye,
  Clock,
  DollarSign,
  BarChart3
} from 'lucide-react';

interface AdminDashboardProps {
  setCurrentPage: (page: string) => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  university: string;
  joinDate: Date;
  status: 'active' | 'suspended' | 'banned';
  totalListings: number;
  totalSales: number;
  rating: number;
  reportCount: number;
}

interface Listing {
  id: string;
  title: string;
  seller: string;
  price: number;
  image: string;
  status: 'active' | 'flagged' | 'removed';
  reportCount: number;
  datePosted: Date;
  category: string;
}

interface Report {
  id: string;
  reporterName: string;
  reportedUser: string;
  reportedItem: string;
  reason: string;
  description: string;
  date: Date;
  status: 'pending' | 'resolved' | 'dismissed';
  severity: 'low' | 'medium' | 'high';
}

interface AdminStats {
  totalUsers: number;
  activeListings: number;
  pendingReports: number;
  totalTransactions: number;
  weeklyGrowth: number;
  monthlyRevenue: number;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@university.edu',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    university: 'University of Example',
    joinDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    status: 'active',
    totalListings: 12,
    totalSales: 8,
    rating: 4.8,
    reportCount: 0
  },
  {
    id: '2',
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@college.edu',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=100&h=100&fit=crop&crop=face',
    university: 'College of Technology',
    joinDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    status: 'active',
    totalListings: 6,
    totalSales: 4,
    rating: 4.9,
    reportCount: 1
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@state.edu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    university: 'State University',
    joinDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    status: 'suspended',
    totalListings: 3,
    totalSales: 1,
    rating: 3.2,
    reportCount: 3
  }
];

const mockListings: Listing[] = [
  {
    id: '1',
    title: 'MacBook Pro 13" M1 2021',
    seller: 'John Smith',
    price: 950,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
    status: 'active',
    reportCount: 0,
    datePosted: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    category: 'Electronics'
  },
  {
    id: '2',
    title: 'Suspicious Electronics Bundle',
    seller: 'Mike Johnson',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=300&h=300&fit=crop',
    status: 'flagged',
    reportCount: 2,
    datePosted: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    category: 'Electronics'
  }
];

const mockReports: Report[] = [
  {
    id: '1',
    reporterName: 'Sarah Mitchell',
    reportedUser: 'Mike Johnson',
    reportedItem: 'Suspicious Electronics Bundle',
    reason: 'Counterfeit goods',
    description: 'The seller is claiming these are genuine Apple products but the photos look suspicious.',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: 'pending',
    severity: 'high'
  },
  {
    id: '2',
    reporterName: 'Emma Davis',
    reportedUser: 'Mike Johnson',
    reportedItem: 'Textbook Package Deal',
    reason: 'Misleading description',
    description: 'Books were described as "like new" but arrived in poor condition.',
    date: new Date(Date.now() - 6 * 60 * 60 * 1000),
    status: 'pending',
    severity: 'medium'
  }
];

const mockStats: AdminStats = {
  totalUsers: 1247,
  activeListings: 486,
  pendingReports: 12,
  totalTransactions: 892,
  weeklyGrowth: 8.5,
  monthlyRevenue: 12450
};

export function AdminDashboard({ setCurrentPage }: AdminDashboardProps) {
  const [stats] = useState<AdminStats>(mockStats);
  const [users] = useState<User[]>(mockUsers);
  const [listings] = useState<Listing[]>(mockListings);
  const [reports] = useState<Report[]>(mockReports);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionMessage, setActionMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const handleUserAction = (userId: string, action: 'suspend' | 'ban' | 'activate') => {
    setActionMessage({ 
      type: 'success', 
      text: `User ${action}ed successfully. Action logged for audit.`
    });
    setTimeout(() => setActionMessage(null), 3000);
  };

  const handleReportAction = (reportId: string, action: 'resolve' | 'dismiss') => {
    setActionMessage({ 
      type: 'success', 
      text: `Report ${action}ed successfully.`
    });
    setTimeout(() => setActionMessage(null), 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-secondary text-secondary-foreground';
      case 'suspended': return 'bg-yellow-500 text-white';
      case 'banned': return 'bg-destructive text-destructive-foreground';
      case 'flagged': return 'bg-red-500 text-white';
      case 'removed': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            </div>
            <p className="text-muted-foreground">Manage users, monitor activities, and moderate content</p>
          </div>
          <Button
            variant="outline"
            onClick={() => setCurrentPage('dashboard')}
            className="rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {actionMessage && (
          <Alert className={`rounded-xl ${actionMessage.type === 'error' ? 'border-destructive bg-destructive/10' : 'border-secondary bg-secondary/10'}`}>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription className={actionMessage.type === 'error' ? 'text-destructive' : 'text-secondary'}>
              {actionMessage.text}
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold text-card-foreground">{stats.totalUsers}</p>
                <p className="text-xs text-secondary flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +{stats.weeklyGrowth}% this week
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Listings</p>
                <p className="text-2xl font-bold text-card-foreground">{stats.activeListings}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Across all categories
                </p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </Card>

          <Card className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Reports</p>
                <p className="text-2xl font-bold text-card-foreground">{stats.pendingReports}</p>
                <p className="text-xs text-red-500 flex items-center mt-1">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Requires attention
                </p>
              </div>
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                <Flag className="w-6 h-6 text-red-500" />
              </div>
            </div>
          </Card>

          <Card className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Transactions</p>
                <p className="text-2xl font-bold text-card-foreground">{stats.totalTransactions}</p>
                <p className="text-xs text-secondary flex items-center mt-1">
                  <DollarSign className="w-3 h-3 mr-1" />
                  ${stats.monthlyRevenue} this month
                </p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="reports" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex rounded-xl">
            <TabsTrigger value="reports" className="rounded-lg">
              Reports
              {reports.filter(r => r.status === 'pending').length > 0 && (
                <Badge variant="destructive" className="ml-2 text-xs">
                  {reports.filter(r => r.status === 'pending').length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="users" className="rounded-lg">Users</TabsTrigger>
            <TabsTrigger value="listings" className="rounded-lg">Listings</TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-lg">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-xl bg-input-background border-0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {reports.map((report) => (
                <Card key={report.id} className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-3">
                        <Badge className={getSeverityColor(report.severity)}>
                          {report.severity} priority
                        </Badge>
                        <Badge variant="outline">
                          {report.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(report.date)}
                        </span>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-card-foreground mb-1">
                          Report against {report.reportedUser}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Item: {report.reportedItem} • Reported by: {report.reporterName}
                        </p>
                      </div>

                      <div>
                        <p className="font-medium text-sm mb-1">Reason: {report.reason}</p>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                      </div>
                    </div>

                    {report.status === 'pending' && (
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReportAction(report.id, 'dismiss')}
                          className="rounded-xl"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Dismiss
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleReportAction(report.id, 'resolve')}
                          className="rounded-xl bg-red-500 hover:bg-red-600 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Take Action
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-xl bg-input-background border-0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {users.map((user) => (
                <Card key={user.id} className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-card-foreground">{user.name}</h3>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                          {user.reportCount > 0 && (
                            <Badge variant="destructive">
                              {user.reportCount} reports
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-sm text-muted-foreground">{user.university}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <span>Joined {formatDate(user.joinDate)}</span>
                          <span>{user.totalListings} listings</span>
                          <span>{user.totalSales} sales</span>
                          <span>★ {user.rating} rating</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="rounded-xl">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-xl">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      {user.status === 'active' && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUserAction(user.id, 'suspend')}
                            className="rounded-xl text-yellow-600 border-yellow-600 hover:bg-yellow-600 hover:text-white"
                          >
                            Suspend
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUserAction(user.id, 'ban')}
                            className="rounded-xl text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                          >
                            <Ban className="w-4 h-4 mr-1" />
                            Ban
                          </Button>
                        </>
                      )}
                      {user.status !== 'active' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUserAction(user.id, 'activate')}
                          className="rounded-xl text-secondary border-secondary hover:bg-secondary hover:text-white"
                        >
                          Activate
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="listings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <Card key={listing.id} className="bg-card border border-border rounded-2xl overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className={`absolute top-3 left-3 ${getStatusColor(listing.status)}`}>
                      {listing.status}
                    </Badge>
                    {listing.reportCount > 0 && (
                      <Badge variant="destructive" className="absolute top-3 right-3">
                        {listing.reportCount} reports
                      </Badge>
                    )}
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-card-foreground line-clamp-2">
                        {listing.title}
                      </h3>
                      <p className="text-lg font-bold text-primary">${listing.price}</p>
                      <p className="text-sm text-muted-foreground">by {listing.seller}</p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{formatDate(listing.datePosted)}</span>
                      <span>{listing.category}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      {listing.status === 'flagged' && (
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="flex-1 rounded-xl"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-semibold text-card-foreground mb-4">Platform Growth</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-accent rounded-xl">
                    <span className="font-medium">New Users This Week</span>
                    <span className="text-xl font-bold text-secondary">+47</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-accent rounded-xl">
                    <span className="font-medium">New Listings This Week</span>
                    <span className="text-xl font-bold text-primary">+156</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-accent rounded-xl">
                    <span className="font-medium">Transactions This Week</span>
                    <span className="text-xl font-bold text-accent-foreground">+89</span>
                  </div>
                </div>
              </Card>

              <Card className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-semibold text-card-foreground mb-4">Moderation Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-accent rounded-xl">
                    <span className="font-medium">Reports Resolved</span>
                    <span className="text-xl font-bold text-secondary">24</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-accent rounded-xl">
                    <span className="font-medium">Users Suspended</span>
                    <span className="text-xl font-bold text-yellow-600">3</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-accent rounded-xl">
                    <span className="font-medium">Listings Removed</span>
                    <span className="text-xl font-bold text-red-600">8</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}