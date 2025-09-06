import { useState } from 'react';
import { Plus, Home, Package, MessageCircle, Settings, LogOut, Edit, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface DashboardProps {
  setCurrentPage: (page: string) => void;
  setIsLoggedIn: (value: boolean) => void;
}

const mockUserListings = [
  {
    id: 1,
    title: 'Calculus Textbook - 12th Edition',
    price: 85,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop',
    status: 'active',
    views: 24,
    messages: 3
  },
  {
    id: 2,
    title: 'MacBook Pro 13" 2020',
    price: 850,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
    status: 'sold',
    views: 156,
    messages: 12
  },
  {
    id: 3,
    title: 'Nike Running Shoes',
    price: 45,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    status: 'active',
    views: 67,
    messages: 5
  }
];

const mockNotifications = [
  { id: 1, type: 'message', text: 'New message about Calculus Textbook', time: '5m ago' },
  { id: 2, type: 'offer', text: 'Someone is interested in your MacBook', time: '1h ago' },
  { id: 3, type: 'view', text: 'Your Nike Shoes listing got 10 new views', time: '2h ago' }
];

export function Dashboard({ setCurrentPage, setIsLoggedIn }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('listings');

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-card border-r border-border min-h-screen p-6">
          <div className="space-y-6">
            {/* Profile Section */}
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-card-foreground">John Smith</h3>
                <p className="text-sm text-muted-foreground">john.smith@university.edu</p>
              </div>
            </div>

            <Separator />

            {/* Navigation */}
            <nav className="space-y-2">
              <Button
                variant={activeTab === 'listings' ? 'default' : 'ghost'}
                className="w-full justify-start rounded-xl"
                onClick={() => setActiveTab('listings')}
              >
                <Package className="w-4 h-4 mr-3" />
                My Listings
              </Button>
              <Button
                variant={activeTab === 'messages' ? 'default' : 'ghost'}
                className="w-full justify-start rounded-xl"
                onClick={() => setCurrentPage('chat')}
              >
                <MessageCircle className="w-4 h-4 mr-3" />
                Messages
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start rounded-xl"
                onClick={() => setCurrentPage('home')}
              >
                <Home className="w-4 h-4 mr-3" />
                Browse Items
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start rounded-xl"
                onClick={() => setCurrentPage('profile')}
              >
                <Settings className="w-4 h-4 mr-3" />
                Profile Settings
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start rounded-xl"
                onClick={() => setCurrentPage('seller-dashboard')}
              >
                <Package className="w-4 h-4 mr-3" />
                Seller Dashboard
              </Button>
            </nav>

            <Separator />

            <Button
              variant="ghost"
              className="w-full justify-start rounded-xl text-destructive hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground">My Listings</h1>
                <p className="text-muted-foreground">
                  Manage your posted items and track their performance
                </p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Post New Item
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Listings */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockUserListings.map((listing) => (
                    <Card key={listing.id} className="bg-card border border-border rounded-2xl overflow-hidden">
                      <div className="aspect-square relative">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="w-full h-full object-cover"
                        />
                        <Badge 
                          variant={listing.status === 'active' ? 'default' : 'secondary'}
                          className="absolute top-3 left-3"
                        >
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
                          <span>{listing.views} views</span>
                          <span>{listing.messages} messages</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Notifications Panel */}
              <div className="space-y-6">
                <Card className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-semibold text-card-foreground mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {mockNotifications.map((notification) => (
                      <div key={notification.id} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm text-card-foreground">{notification.text}</p>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-semibold text-card-foreground mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Active Listings</span>
                      <span className="font-semibold text-card-foreground">2</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Views</span>
                      <span className="font-semibold text-card-foreground">247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Messages</span>
                      <span className="font-semibold text-card-foreground">20</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}