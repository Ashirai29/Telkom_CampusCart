import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { CategoriesGrid } from './components/CategoriesGrid';
import { ProductCard } from './components/ProductCard';
import { AuthPage } from './components/AuthPage';
import { Dashboard } from './components/Dashboard';
import { ProfilePage } from './components/ProfilePage';
import { ChatWindow } from './components/ChatWindow';
import { SellerDashboard } from './components/SellerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { RoleGuard } from './components/RoleGuard';

// Mock product data
const mockProducts = [
  {
    id: 1,
    title: 'Calculus: Early Transcendentals - 8th Edition',
    price: 75,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop',
    seller: 'Sarah M.',
    rating: 4.8,
    category: 'Textbooks',
    condition: 'Like New'
  },
  {
    id: 2,
    title: 'MacBook Pro 13" M1 2021',
    price: 950,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    seller: 'Mike T.',
    rating: 4.9,
    category: 'Electronics',
    condition: 'Excellent'
  },
  {
    id: 3,
    title: 'Nike Air Force 1 - Size 10',
    price: 65,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    seller: 'Alex K.',
    rating: 4.7,
    category: 'Clothes',
    condition: 'Good'
  },
  {
    id: 4,
    title: 'iPad Pro 11" with Apple Pencil',
    price: 650,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
    seller: 'Emma L.',
    rating: 4.9,
    category: 'Electronics',
    condition: 'Like New'
  },
  {
    id: 5,
    title: 'Organic Chemistry Textbook',
    price: 45,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=400&fit=crop',
    seller: 'David R.',
    rating: 4.6,
    category: 'Textbooks',
    condition: 'Good'
  },
  {
    id: 6,
    title: 'Vintage Denim Jacket',
    price: 35,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
    seller: 'Lisa P.',
    rating: 4.8,
    category: 'Clothes',
    condition: 'Vintage'
  }
];

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'student' | 'admin'>('student');
  const [unreadMessages, setUnreadMessages] = useState(3);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleMessageSeller = (productId: number) => {
    if (!isLoggedIn) {
      setCurrentPage('auth');
      return;
    }
    // In a real app, this would open a chat interface
    alert(`Opening chat for product ${productId}`);
  };

  const handleProductClick = (productId: number) => {
    // In a real app, this would navigate to product detail page
    alert(`Viewing product details for product ${productId}`);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'auth':
        return (
          <AuthPage 
            setIsLoggedIn={setIsLoggedIn} 
            setCurrentPage={setCurrentPage}
            setUserRole={setUserRole}
          />
        );
      case 'dashboard':
        return <Dashboard setCurrentPage={setCurrentPage} setIsLoggedIn={setIsLoggedIn} />;
      case 'profile':
        return <ProfilePage setCurrentPage={setCurrentPage} userRole={userRole} />;
      case 'chat':
        return <ChatWindow setCurrentPage={setCurrentPage} />;
      case 'seller-dashboard':
        return <SellerDashboard setCurrentPage={setCurrentPage} />;
      case 'admin':
        return (
          <RoleGuard
            requiredRole="admin"
            userRole={userRole}
            onNavigateBack={() => setCurrentPage('dashboard')}
          >
            <AdminDashboard setCurrentPage={setCurrentPage} />
          </RoleGuard>
        );
      case 'home':
      default:
        return (
          <div className="min-h-screen bg-background">
            <HeroSection setCurrentPage={setCurrentPage} />
            <CategoriesGrid />
            
            {/* Products Section */}
            <section className="py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-foreground mb-4">Recent Listings</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Discover great deals from students in your campus community
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {mockProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onMessageSeller={handleMessageSeller}
                      onProductClick={handleProductClick}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-card border-t border-border py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-card-foreground">CampusCart</h3>
                    <p className="text-sm text-muted-foreground">
                      The student marketplace for buying, selling, and trading within your campus community.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-card-foreground">Quick Links</h4>
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground cursor-pointer hover:text-primary">About</p>
                      <p className="text-muted-foreground cursor-pointer hover:text-primary">Contact</p>
                      <p className="text-muted-foreground cursor-pointer hover:text-primary">FAQ</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-card-foreground">Categories</h4>
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground cursor-pointer hover:text-primary">Textbooks</p>
                      <p className="text-muted-foreground cursor-pointer hover:text-primary">Electronics</p>
                      <p className="text-muted-foreground cursor-pointer hover:text-primary">Clothes</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-card-foreground">Legal</h4>
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground cursor-pointer hover:text-primary">Privacy Policy</p>
                      <p className="text-muted-foreground cursor-pointer hover:text-primary">Terms of Service</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-border text-center">
                  <p className="text-sm text-muted-foreground">
                    © 2025 CampusCart. Built for students, by students.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {currentPage !== 'auth' && (
        <Navigation
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userRole={userRole}
          unreadMessages={unreadMessages}
        />
      )}
      {renderPage()}
    </div>
  );
}