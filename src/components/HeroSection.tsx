import { Button } from './ui/button';
import { ShoppingBag, Users } from 'lucide-react';

interface HeroSectionProps {
  setCurrentPage: (page: string) => void;
}

export function HeroSection({ setCurrentPage }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Buy, sell, and trade with students on your campus
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Connect with fellow students to find textbooks, electronics, clothes, and services at student-friendly prices.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8"
                onClick={() => setCurrentPage('dashboard')}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Start Selling
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="rounded-full px-8"
              >
                Browse Listings
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span>1,200+ active students</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-secondary" />
                <span>500+ listings this week</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-card rounded-3xl p-8 shadow-lg border border-border">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/10 rounded-2xl p-6 flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xl">📚</span>
                  </div>
                  <span className="text-sm font-medium">Textbooks</span>
                </div>
                <div className="bg-secondary/10 rounded-2xl p-6 flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <span className="text-xl">💻</span>
                  </div>
                  <span className="text-sm font-medium">Electronics</span>
                </div>
                <div className="bg-accent/10 rounded-2xl p-6 flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-xl">👕</span>
                  </div>
                  <span className="text-sm font-medium">Clothes</span>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900/30 rounded-2xl p-6 flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-xl">👨‍🏫</span>
                  </div>
                  <span className="text-sm font-medium">Services</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}