import { ReactNode } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Shield, AlertTriangle, ArrowLeft } from 'lucide-react';

interface RoleGuardProps {
  children: ReactNode;
  requiredRole: 'student' | 'admin';
  userRole: 'student' | 'admin';
  fallbackComponent?: ReactNode;
  onNavigateBack?: () => void;
}

export function RoleGuard({ 
  children, 
  requiredRole, 
  userRole, 
  fallbackComponent,
  onNavigateBack 
}: RoleGuardProps) {
  // Check if user has the required role
  const hasAccess = userRole === requiredRole || userRole === 'admin';

  if (hasAccess) {
    return <>{children}</>;
  }

  // If a custom fallback component is provided, use it
  if (fallbackComponent) {
    return <>{fallbackComponent}</>;
  }

  // Default access denied component
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border border-border rounded-3xl p-8 shadow-lg text-center">
        <div className="space-y-6">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-destructive" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-card-foreground">Access Denied</h2>
            <p className="text-muted-foreground">
              You don't have permission to access this area. 
              {requiredRole === 'admin' && ' Admin privileges are required.'}
            </p>
          </div>

          <div className="flex items-center justify-center space-x-2 p-3 bg-destructive/10 rounded-xl">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-sm text-destructive font-medium">
              Required Role: {requiredRole.charAt(0).toUpperCase() + requiredRole.slice(1)}
            </span>
          </div>

          <div className="space-y-3">
            {onNavigateBack && (
              <Button
                onClick={onNavigateBack}
                className="w-full rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            )}
            
            <div className="text-xs text-muted-foreground">
              If you believe this is an error, please contact support.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Higher-order component version for easier use
export function withRoleGuard<T extends {}>(
  Component: React.ComponentType<T>,
  requiredRole: 'student' | 'admin'
) {
  return function ProtectedComponent(props: T & { userRole: 'student' | 'admin'; onNavigateBack?: () => void }) {
    const { userRole, onNavigateBack, ...componentProps } = props;
    
    return (
      <RoleGuard 
        requiredRole={requiredRole} 
        userRole={userRole}
        onNavigateBack={onNavigateBack}
      >
        <Component {...(componentProps as T)} />
      </RoleGuard>
    );
  };
}

// Custom hooks for role checking
export function useRoleCheck(userRole: 'student' | 'admin') {
  const isAdmin = userRole === 'admin';
  const isStudent = userRole === 'student';
  
  const canAccess = (requiredRole: 'student' | 'admin') => {
    return userRole === requiredRole || userRole === 'admin';
  };

  return {
    isAdmin,
    isStudent,
    canAccess
  };
}