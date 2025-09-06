import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  DollarSign, 
  Package, 
  TrendingUp, 
  MessageCircle, 
  Eye, 
  Star,
  Plus,
  ArrowLeft,
  Calendar,
  BarChart3,
  Users,
  Clock
} from 'lucide-react';

interface SellerDashboardProps {
  setCurrentPage: (page: string) => void;
}

interface Listing {
  id: string;
  title: string;
  price: number;
  image: string;
  status: 'active' | 'sold' | 'pending';
  views: number;
  messages: number;
  datePosted: Date;
  category: string;
}

interface Sale {
  id: string;
  buyerName: string;
  buyerAvatar: string;
  itemTitle: string;
  salePrice: number;
  saleDate: Date;
  rating: number;
  review: string;
}

interface Analytics {
  totalEarnings: number;
  totalSales: number;
  activeListings: number;
  totalViews: number;
  averageRating: number;
  responseRate: number;
  weeklyEarnings: number[];
  monthlyStats: {
    sales: number;
    earnings: number;
    newListings: number;
  };
}

const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Calculus: Early Transcendentals - 8th Edition',
    price: 85,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop',
    status: 'active',
    views: 156,
    messages: 12,
    datePosted: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    category: 'Textbooks'
  },
  {
    id: '2',
    title: 'Nike Running Shoes - Size 10',
    price: 65,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    status: 'active',
    views: 89,
    messages: 7,
    datePosted: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    category: 'Clothes'
  },
  {
    id: '3',
    title: 'MacBook Pro 13" M1 2021',
    price: 950,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
    status: 'sold',
    views: 234,
    messages: 18,
    datePosted: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    category: 'Electronics'
  }
];

const mockSales: Sale[] = [
  {
    id: '1',
    buyerName: 'Sarah Mitchell',
    buyerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=100&h=100&fit=crop&crop=face',
    itemTitle: 'MacBook Pro 13" M1 2021',
    salePrice: 950,
    saleDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    rating: 5,
    review: 'Great seller! Item was exactly as described and delivery was quick.'
  },
  {
    id: '2',
    buyerName: 'Mike Johnson',
    buyerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    itemTitle: 'Organic Chemistry Textbook',
    salePrice: 75,
    saleDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    rating: 4,
    review: 'Good condition book, exactly what I needed for class.'
  }
];

const mockAnalytics: Analytics = {
  totalEarnings: 1425,
  totalSales: 8,
  activeListings: 3,
  totalViews: 1247,
  averageRating: 4.8,
  responseRate: 95,
  weeklyEarnings: [120, 85, 200, 150, 95, 180, 125],
  monthlyStats: {
    sales: 8,
    earnings: 1425,
    newListings: 12
  }
};

export function SellerDashboard({ setCurrentPage }: SellerDashboardProps) {
  const [analytics] = useState<Analytics>(mockAnalytics);
  const [listings] = useState<Listing[]>(mockListings);
  const [sales] = useState<Sale[]>(mockSales);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-secondary text-secondary-foreground';
      case 'sold': return 'bg-primary text-primary-foreground';
      case 'pending': return 'bg-yellow-500 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Seller Dashboard</h1>
            <p className="text-muted-foreground">Manage your listings and track your sales performance</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => setCurrentPage('dashboard')}
              className="rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button className="rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              New Listing
            </Button>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-2xl font-bold text-card-foreground">${analytics.totalEarnings}</p>
                <p className="text-xs text-secondary flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Sales</p>
                <p className="text-2xl font-bold text-card-foreground">{analytics.totalSales}</p>
                <p className="text-xs text-secondary flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  2 this week
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
                <p className="text-sm text-muted-foreground">Active Listings</p>
                <p className="text-2xl font-bold text-card-foreground">{analytics.activeListings}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {analytics.totalViews} total views
                </p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-accent" />
              </div>
            </div>
          </Card>

          <Card className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Rating</p>
                <p className="text-2xl font-bold text-card-foreground">{analytics.averageRating}</p>
                <p className="text-xs text-secondary flex items-center mt-1">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  {analytics.responseRate}% response rate
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex rounded-xl">
            <TabsTrigger value="listings" className="rounded-lg">My Listings</TabsTrigger>
            <TabsTrigger value="sales" className="rounded-lg">Sales History</TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-lg">Analytics</TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-lg">Reviews</TabsTrigger>
          </TabsList>

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
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-card-foreground line-clamp-2">
                        {listing.title}
                      </h3>
                      <p className="text-xl font-bold text-primary">${listing.price}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{listing.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{listing.messages}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(listing.datePosted)}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                        View
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {sales.map((sale) => (
                <Card key={sale.id} className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={sale.buyerAvatar} />
                        <AvatarFallback>
                          {sale.buyerName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-card-foreground">{sale.itemTitle}</h3>
                        <p className="text-sm text-muted-foreground">
                          Sold to {sale.buyerName} • {formatDate(sale.saleDate)}
                        </p>
                        <div className="flex items-center space-x-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < sale.rating 
                                  ? 'text-yellow-500 fill-current' 
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">
                            ({sale.rating}/5)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">${sale.salePrice}</p>
                      <Badge variant="outline" className="mt-1">
                        Completed
                      </Badge>
                    </div>
                  </div>
                  {sale.review && (
                    <div className="mt-4 p-3 bg-accent rounded-xl">
                      <p className="text-sm text-accent-foreground italic">"{sale.review}"</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-card-foreground">Weekly Earnings</h3>
                  <BarChart3 className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="space-y-3">
                  {analytics.weeklyEarnings.map((earning, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Day {index + 1}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(earning / Math.max(...analytics.weeklyEarnings)) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">${earning}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-semibold text-card-foreground mb-4">Monthly Performance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-accent rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Total Earnings</p>
                        <p className="text-sm text-muted-foreground">This month</p>
                      </div>
                    </div>
                    <span className="text-xl font-bold">${analytics.monthlyStats.earnings}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-accent rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium">Total Sales</p>
                        <p className="text-sm text-muted-foreground">This month</p>
                      </div>
                    </div>
                    <span className="text-xl font-bold">{analytics.monthlyStats.sales}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-accent rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-accent/30 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-accent-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">New Listings</p>
                        <p className="text-sm text-muted-foreground">This month</p>
                      </div>
                    </div>
                    <span className="text-xl font-bold">{analytics.monthlyStats.newListings}</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {sales.map((sale) => (
                <Card key={sale.id} className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={sale.buyerAvatar} />
                      <AvatarFallback>
                        {sale.buyerName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-card-foreground">{sale.buyerName}</h4>
                          <p className="text-sm text-muted-foreground">{sale.itemTitle}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {formatDate(sale.saleDate)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < sale.rating 
                                ? 'text-yellow-500 fill-current' 
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-2">
                          {sale.rating}/5 stars
                        </span>
                      </div>
                      <p className="text-sm text-card-foreground">"{sale.review}"</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}