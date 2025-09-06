import { Search, ShoppingCart, Moon, Sun, User, MessageCircle, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface NavigationProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  userRole?: 'student' | 'admin';
  unreadMessages?: number;
}

export function Navigation({ 
  darkMode, 
  toggleDarkMode, 
  currentPage, 
  setCurrentPage, 
  isLoggedIn, 
  setIsLoggedIn,
  userRole = 'student',
  unreadMessages = 0
}: NavigationProps) {
  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <ShoppingCart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">CampusCart</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search for books, electronics, clothes..."
                className="pl-10 bg-input-background border-0 rounded-full h-10"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setCurrentPage('chat')}
                  className="relative"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Messages
                  {unreadMessages > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-1 text-xs min-w-5 h-5 flex items-center justify-center p-0"
                    >
                      {unreadMessages}
                    </Badge>
                  )}
                </Button>
                
                {userRole === 'admin' && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setCurrentPage('admin')}
                    className="text-primary hover:text-primary"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                )}
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setCurrentPage('dashboard')}
                >
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setIsLoggedIn(false);
                    setCurrentPage('home');
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentPage('auth')}
              >
                Login / Signup
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="p-2"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}