import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { ShoppingCart, Mail, AlertCircle, CheckCircle } from 'lucide-react';

interface AuthPageProps {
  setIsLoggedIn: (value: boolean) => void;
  setCurrentPage: (page: string) => void;
  setUserRole?: (role: 'student' | 'admin') => void;
}

export function AuthPage({ setIsLoggedIn, setCurrentPage, setUserRole }: AuthPageProps) {
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    university: ''
  });

  const validateEmail = (email: string) => {
    const eduPattern = /^[^\s@]+@[^\s@]+\.edu$/;
    return eduPattern.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      if (authMode === 'reset') {
        if (!validateEmail(formData.email)) {
          throw new Error('Please enter a valid .edu email address');
        }
        setMessage({ type: 'success', text: 'Password reset link sent to your email!' });
        setIsLoading(false);
        return;
      }

      if (!validateEmail(formData.email)) {
        throw new Error('Please enter a valid .edu email address');
      }

      if (!formData.password) {
        throw new Error('Password is required');
      }

      if (authMode === 'signup') {
        if (!formData.name.trim()) {
          throw new Error('Full name is required');
        }
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters long');
        }
      }

      // Mock authentication logic
      const userRole = formData.email.includes('admin') ? 'admin' : 'student';
      
      setIsLoggedIn(true);
      if (setUserRole) setUserRole(userRole);
      setCurrentPage('dashboard');
      
    } catch (error) {
      setMessage({ type: 'error', text: (error as Error).message });
    }
    
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error message when user starts typing
    if (message?.type === 'error') {
      setMessage(null);
    }
  };

  const getTitle = () => {
    switch (authMode) {
      case 'login': return 'Welcome Back';
      case 'signup': return 'Join CampusCart';
      case 'reset': return 'Reset Password';
    }
  };

  const getSubtitle = () => {
    switch (authMode) {
      case 'login': return 'Sign in to your account';
      case 'signup': return 'Create your student account';
      case 'reset': return 'Enter your email to receive a reset link';
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border border-border rounded-3xl p-8 shadow-lg">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <ShoppingCart className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">CampusCart</span>
          </div>
          <h2 className="text-2xl font-bold text-card-foreground mb-2">
            {getTitle()}
          </h2>
          <p className="text-muted-foreground">
            {getSubtitle()}
          </p>
        </div>

        {message && (
          <Alert className={`mb-6 rounded-xl ${message.type === 'error' ? 'border-destructive bg-destructive/10' : 'border-secondary bg-secondary/10'}`}>
            {message.type === 'error' ? (
              <AlertCircle className="h-4 w-4" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            <AlertDescription className={message.type === 'error' ? 'text-destructive' : 'text-secondary'}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {authMode === 'signup' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="h-12 rounded-xl bg-input-background border-0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="university">University</Label>
                <Input
                  id="university"
                  name="university"
                  type="text"
                  value={formData.university}
                  onChange={handleInputChange}
                  placeholder="University of Example"
                  className="h-12 rounded-xl bg-input-background border-0"
                  required
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Student Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@university.edu"
              className="h-12 rounded-xl bg-input-background border-0"
              required
            />
            <p className="text-xs text-muted-foreground">
              Must be a valid .edu email address
            </p>
          </div>

          {authMode !== 'reset' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {authMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setAuthMode('reset')}
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="h-12 rounded-xl bg-input-background border-0"
                required
              />
              {authMode === 'signup' && (
                <p className="text-xs text-muted-foreground">
                  Password must be at least 6 characters long
                </p>
              )}
            </div>
          )}

          {authMode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className="h-12 rounded-xl bg-input-background border-0"
                required
              />
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                <span>Please wait...</span>
              </div>
            ) : (
              <>
                {authMode === 'login' && 'Sign In'}
                {authMode === 'signup' && 'Create Account'}
                {authMode === 'reset' && (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Reset Link
                  </>
                )}
              </>
            )}
          </Button>

          {authMode !== 'reset' && (
            <>
              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                  OR
                </span>
              </div>

              <Button 
                type="button" 
                variant="outline"
                className="w-full h-12 rounded-xl border border-border"
                disabled={isLoading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign {authMode === 'login' ? 'in' : 'up'} with Google
              </Button>
            </>
          )}
        </form>

        <div className="text-center mt-6">
          {authMode === 'reset' ? (
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className="text-sm text-primary hover:underline font-medium"
            >
              Back to Sign In
            </button>
          ) : (
            <p className="text-sm text-muted-foreground">
              {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                className="ml-1 text-primary hover:underline font-medium"
              >
                {authMode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}